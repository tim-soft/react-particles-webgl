export type ColorMode = 'rainbow' | 'solid';

export type Dimension = '2D' | '3D';

export type ParticleShape = 'circle' | 'square';

export type BoundaryType = 'bounce' | 'passthru';

export type Particles = {
    boundingBox: 'canvas' | 'cube';
    color: string;
    colorMode: ColorMode;
    count: number;
    maxSize: number;
    minSize: number;
    shape: ParticleShape;
    transparency: number;
    visible: boolean;
};

export type Direction = {
    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;
    zMax: number;
    zMin: number;
};

export type Lines = {
    color: string;
    colorMode: ColorMode;
    limitConnections: boolean;
    maxConnections: number;
    minDistance: number;
    transparency: number;
    visible: boolean;
};

export type CameraControls = {
    autoRotate: boolean;
    autoRotateSpeed: number;
    dampingFactor: number;
    enableDamping: boolean;
    enableZoom: boolean;
    enabled: boolean;
    resetCameraFlag: boolean;
};

export type Config = {
    antialias?: boolean;
    boundaryType: BoundaryType;
    cameraControls?: CameraControls;
    dimension: Dimension;
    direction?: Direction;
    lines?: Lines;
    particles?: Particles;
    showCube: boolean;
    velocity: number;
};
