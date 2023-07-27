import * as pc from 'playcanvas';
import { useEffect, useState, useRef, memo } from 'react';

/**
 * @todo Separate into own file.
 */
export class PlayCanvasState {
    /** @type {pc.Application|null} */
    app = null;
    /**
     * @param {HTMLCanvasElement} canvas - The canvas.
     */
    init(canvas) {
        const app = new pc.Application(canvas, {});
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
        this.app = app;
        this.box = box;
        this.light = light;
    }
    destroy() {
        this.app?.destroy();
        this.app = null;
    }
}

function PlayCanvas() {
    const [color, setColor] = useState("");
    /** @type {React.MutableRefObject<HTMLCanvasElement|null>} */
    const appCanvas = useRef(null);
    //const [cubes, setCubes] = useState([]);
    /** @type {React.MutableRefObject<PlayCanvasState>} */
    const pcStateRef = useRef(new PlayCanvasState());
    useEffect(() => {
        const canvas = appCanvas.current;
        if (!canvas) {
            console.warn("PlayCanvas#useEffect> missing canvas");
            return;
        }
        const pcState = pcStateRef.current;
        pcState.init(canvas);
        return () => {
            console.log("Clean up pcState", pcStateRef);
            pcState.destroy();
        }
    }, []);
    /**
     * @param {string} newColor - Formatted like #a62b8c
     */
    const updateColor = (newColor) => {
        const r = parseInt(newColor.slice(1, 3), 16) / 255;
        const g = parseInt(newColor.slice(3, 5), 16) / 255;
        const b = parseInt(newColor.slice(5, 7), 16) / 255;
        const pcState = pcStateRef.current;
        const { box } = pcState;
        if (box) {
            box.model?.material.diffuse.set(r, g, b);
            box.model?.material.update();
        }
        window.box = pcState.box;
        setColor(newColor);
      };
    return <>
        Cube Color: <input 
            type="color" 
            value={color} 
            onChange={(event) => updateColor(event.target.value)} 
        />
        <div className="scene">
            <canvas ref={appCanvas} id='application-canvas'></canvas>
        </div>
        </>;
}

const Scene = memo(() => {
    const [scenes, setScenes] = useState([<PlayCanvas></PlayCanvas>])
    function addScene() {
        setScenes([...scenes, <PlayCanvas></PlayCanvas>]);
    }
    function removeLastScene() {
        setScenes(scenes.slice(0, -1));
    }
    function removeAllScenes() {
        setScenes([]);
    }
    return <>
        <div>
            <button type="button" onClick={addScene}>
                Add test scene
            </button>
        </div>
        <div>
            <button type="button" onClick={removeLastScene}>
                Remove last scene
            </button>
        </div>
        <div>
            <button type="button" onClick={removeAllScenes}>
                Remove all scenes
            </button>
        </div>
        {scenes}
    </>
})

export default Scene;
