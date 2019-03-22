import React from 'react';
import { Canvas } from 'react-three-fiber';
import ParticleField from './ParticleField';
import config from './config';

/**
 * Wraps a particle field in a Canvas
 */
export default props => (
  <Canvas>
    <ParticleField {...Object.assign({}, config, props)} />
  </Canvas>
);

export const defaultConfig = { ...config };
