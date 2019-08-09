# React Particles WebGL

> A 2D/3D particle library built with React, Three.js and WebGL

**react-particles-webgl** was inspired by the popular [particles.js](https://github.com/VincentGarreau/particles.js/) library and built with [react-three-fiber](https://github.com/drcmda/react-three-fiber) to offer _smooth_ **60FPS** high-count particle fields in both two and three dimensions.

**Demo and config generator** [https://timellenberger.com/particles](https://timellenberger.com/particles)

**Code Sandbox Demos**

- 2D Green Particles [https://codesandbox.io/s/4x4lmpqz1w](https://codesandbox.io/s/4x4lmpqz1w)
- 3D Snowfall [https://codesandbox.io/s/308zj3k7l1](https://codesandbox.io/s/308zj3k7l1)

[![npm](https://img.shields.io/npm/v/react-particles-webgl.svg?color=brightgreen&style=popout-square)](https://www.npmjs.com/package/react-particles-webgl)
[![NPM](https://img.shields.io/npm/l/react-particles-webgl.svg?color=brightgreen&style=popout-square)](https://github.com/tim-soft/react-particles-webgl/blob/master/LICENSE)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=popout-square)
[![Travis (.org)](https://img.shields.io/travis/tim-soft/react-particles-webgl?style=flat-square)](https://travis-ci.org/tim-soft/react-particles-webgl)

[![2D "Particles.js" Canvas](https://i.imgur.com/kpIUdV9.jpg)](https://timellenberger.com/particles)
[![3D Particle Field](https://i.imgur.com/M34XUy6.jpg)](https://timellenberger.com/particles)

## ✨ Features

- Simple drop-in usage, plays nice with SSR (the demo is running Next.js)
- Smooth 60FPS particles and lines via WebGL
- Full Three.js OrbitControls for extreme (optional) scene interactivity
- Highly customizable particles and lines

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
  // 'bounce' or 'passthru'
  // 'bounce' will make particles behave like balls thrown at a wall when hitting canvas boundaries
  // 'passthru' particles will disappear after hitting canvas boundaries and be added back into the scene elsewhere
  boundaryType: 'bounce',
  // Maximum velocity of particles
  velocity: 2,
  // Toggles antialiasing -- must be set during construction, cannot be changed after initial render
  // Slight performance optimization to set false, although lines will appear more jagged
  antialias: false,
  // Min/Max multipliers which constraint how particles move in each direction
  // The default values here allow for particles to move in completely random x, y, z directions
  // See the "Snowfall" preset for an example of how to use these values
  direction: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1
  },
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
   * The camera rig is comprised of Three.js OrbitControls
   * Pass any valid OrbitControls properties, consult docs for more info
   *
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

MIT © [Tim Ellenberger](https://github.com/tim-soft)
