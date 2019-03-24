# react-particles-webgl

> A 2D/3D particle library built on React, Three.js and WebGL

[![NPM](https://img.shields.io/npm/v/react-particles-webgl)](https://www.npmjs.com/package/react-particles-webgl) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-particles-webgl three
```

## Usage
```jsx
import React from 'react';
import ParticleField from 'react-particles-webgl';

/**
 * The default configuation for the ParticleField component
 *
 * Any option passed in via props will overwrite the default config
 */
const config = {
  // Display reference cube, useful for orienting the field 
  showCube: true,
  // '2D' or '3D' particle field 
  dimension: '3D',
  // Maximum velocity of particles
  velocity: 2,
  lines: {
    // 'rainbow' or 'solid' color of lines
    colorMode: 'rainbow',
    // Color of lines if colorMode: 'solid', must be hex color
    color: '#351CCB',
    // Transparency of lines
    transparency: 0.9,
    // true/false limit the maximum number of line connections per particle
    limitConnections: true,
    maxConnections: 20,
    // Minimum distance needed to draw line between to particles
    minDistance: 150,
    // true/false render lines
    visible: true
  },
  particles: {
    // 'rainbow' or 'solid' color of particles
    colorMode: 'rainbow',
    // Color of lines if colorMode: 'solid', must be hex color
    color: '#3FB568',
    // Transparency of particles
    transparency: 0.9,
    // 'square' or 'circle' shape of particles
    shape: 'square',
    // The exact number of particles to render
    count: 500,
    // The minimum particle size
    minSize: 10,
    // The maximum particle size
    maxSize: 75,
    // true/false render particles
    visible: true
  },
  /*
   * The camera rig is comprised of OrbitControls
   * Pass any valid OrbitControls properties, consult docs for more info
   * https://threejs.org/docs/#examples/controls/OrbitControls
   */
  cameraControls: {
    // Enable or disable all camera interaction (click, drag, touch etc)
    enabled: true,
    // Enable or disable smooth dampening of camera movement
    enableDamping: true,
    dampingFactor: 0.2,
    // Enable or disable zooming in/out of camera
    enableZoom: true,
    // Enable or disable constant rotation of camera around scene
    autoRotate: true,
    // Rotation speed -- higher is faster
    autoRotateSpeed: 0.3,
    // If true, camera position will be reset whenever any option changes (including this one)
    // Useful when turning off autoRotate, the camera will return to FOV where scene fits to canvas 
    resetCameraFlag: false
  }
};

export default () => <ParticleField config={config} />;
```

## Local Development

Clone the repo

```bash
git clone https://github.com/tim-soft/react-particles-webgl.git react-particles-webgl
cd react-particles-webgl
```

Setup symlinks

```bash
yarn link
cd example
yarn link react-particles-webgl
```

Run the library in development mode

```bash
yarn start
```

Run the example app in development mode

```bash
cd example
yarn start
```

Changes to the library code should hot reload in the demo app

## License

MIT © [tim-soft](https://github.com/tim-soft)
