import type { Config } from './types/config';

/**
 * The default configuation for the ParticleField component
 *
 * Any option passed in via props will overwrite the default config
 */
const defaultConfig: Config = {
    antialias: false,
    boundaryType: 'bounce',
    cameraControls: {
        autoRotate: true,
        autoRotateSpeed: 0.3,
        dampingFactor: 0.2,
        enabled: true,
        enableDamping: true,
        enableZoom: true,
        resetCameraFlag: false,
    },
    dimension: '3D',
    direction: {
        xMax: 1,
        xMin: -1,
        yMax: 1,
        yMin: -1,
        zMax: 1,
        zMin: -1,
    },
    lines: {
        color: '#351CCB',
        colorMode: 'rainbow',
        limitConnections: true,
        maxConnections: 20,
        minDistance: 150,
        transparency: 0.9,
        visible: true,
    },
    particles: {
        boundingBox: 'canvas',
        color: '#3FB568',
        colorMode: 'rainbow',
        count: 500,
        maxSize: 75,
        minSize: 10,
        shape: 'square',
        transparency: 0.9,
        visible: true,
    },
    showCube: true,
    velocity: 2,
};

export default defaultConfig;
