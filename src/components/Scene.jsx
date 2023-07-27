import * as pc from 'playcanvas';
import { useEffect, useRef, memo } from 'react';

let app = null;

function startApplication(canvas) {
    console.log('startApplication');
    if (app) {
        console.log('destroying app')
        app.destroy();
        app = null;
    }
    app = new pc.Application(canvas, {});
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    const box = new pc.Entity('cube');
    box.addComponent('model', {
        type: 'box'
    });
    app.root.addChild(box);
    const camera = new pc.Entity('camera');
    camera.addComponent('camera', {
        clearColor: new pc.Color(0.1, 0.1, 0.1)
    });
    app.root.addChild(camera);
    camera.setPosition(0, 0, 3);
    const light = new pc.Entity('light');
    light.addComponent('light');
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 0);
    app.on('update', dt => box.rotate(10 * dt, 20 * dt, 30 * dt));
    app.start();
}

const Scene = memo(() => {
    const appCanvas = useRef(null);

    useEffect(() => {
        startApplication(appCanvas.current);
    },[]);

    return (
        <div className="scene">
            <canvas ref={appCanvas} id='application-canvas'></canvas>
        </div>
    )
})

export default Scene;