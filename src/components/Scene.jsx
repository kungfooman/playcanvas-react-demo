import * as pc from 'playcanvas';
import { useEffect, useRef } from 'react';

function startApplication(canvaCurrent) {
    let canvas = document.getElementById('application-canvas');
    console.log('Canvas ', canvas)
    window.pc = pc;
    const app = new window.pc.Application(canvas, {});
    app.setCanvasResolution(window.pc.RESOLUTION_AUTO);
    const box = new window.pc.Entity('cube');
    box.addComponent('model', {
    type: 'box'
    });
    app.root.addChild(box);
    const camera = new window.pc.Entity('camera');
    camera.addComponent('camera', {
    clearColor: new window.pc.Color(0.1, 0.1, 0.1)
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

const Scene = () => {

    const appCanvas = useRef(null);

    useEffect(() => {
        startApplication(appCanvas.current)
    }, [])

    return (
        <div className="scene">
            <canvas ref={appCanvas} id='application-canvas'></canvas>
        </div>
    )
}

export default Scene;