import './App.css';
import * as pc from 'playcanvas';
import React from 'react';

class App extends React.Component {
  
  componentDidMount() {
    this.initPlayCanvas();
  }

  initPlayCanvas() {
    const app = new pc.Application(document.getElementById('application-canvas'));

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

  render() {
    return (
      <div style={{height: '100vh', width: '100vw'}}>
        <canvas id="application-canvas" style={{height: '100%', width: '100%'}}></canvas>
      </div>
    );
  }
}

export default App;
