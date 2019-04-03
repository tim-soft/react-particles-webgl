import React from 'react';
import PropTypes from 'prop-types';
import { Canvas } from 'react-three-fiber';
import ParticleField from './ParticleField';
import initialConfig from './config';

/**
 * Wraps a particle field in a Canvas
 */
const ParticleCanvas = ({ config }) => (
  <Canvas
    gl={{
      antialias: config.antialias ? config.antialias : initialConfig.antialias
    }}
  >
    <ParticleField {...Object.assign({}, initialConfig, config)} />
  </Canvas>
);

ParticleCanvas.propTypes = {
  config: PropTypes.object
};

ParticleCanvas.defaultProps = {
  config: {}
};

export default ParticleCanvas;

export const defaultConfig = { ...initialConfig };
