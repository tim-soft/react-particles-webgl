import {
    AdditiveBlending,
    BufferAttribute,
    BufferGeometry,
    DynamicDrawUsage,
    ShaderMaterial,
    Vector3,
} from 'three';
import {
    getParticleVertexShader,
    getParticleFragmentShader,
} from '../shaders/ParticleShaders';
import type { Dimension, Direction, Particles } from '../types/config';

type ComputeParticlesParams = {
    devicePixelRatio: number;
    dimension: Dimension;
    direction: Direction;
    particles: Particles;
    r: number;
    size: {
        height: number;
        width: number;
    };
    velocity: number;
};

type ComputeParticles = [
    pointCloudGeometry: BufferGeometry,
    pointMaterial: ShaderMaterial,
    particlesData: {
        numConnections: number;
        velocity: Vector3;
    }[],
    particlePositions: Float32Array,
    bounds: {
        xBounds: number;
        yBounds: number;
        zBounds: number;
    }
];

const computeParticles = ({
    devicePixelRatio,
    dimension,
    direction,
    particles,
    r,
    size,
    velocity,
}: ComputeParticlesParams): ComputeParticles => {
    const {
        boundingBox,
        color,
        colorMode,
        count,
        maxSize,
        minSize,
        shape,
        transparency,
        visible,
    } = particles;
    // Add particles to geometry
    // Maintain two arrays
    // particlePositions contains random x,y,z coords for each particle
    // particlesData contains a random x,y,z velocity vector for each particle
    const pointCloudGeometry = new BufferGeometry();
    const particlePositions = new Float32Array(count * 3);
    const particleSizes = new Float32Array(count);
    const particlesData = [];

    let xBounds = 0;
    let yBounds = 0;
    let zBounds = 0;
    if (boundingBox === 'canvas') {
        // Adjust size of particle field contstraints based on
        // whether field is 2D or 3D
        xBounds = dimension === '2D' ? size.width : size.width;
        yBounds = dimension === '2D' ? size.height : size.height * 1.5;
        zBounds = dimension === '2D' ? 0 : size.width;
    }
    if (boundingBox === 'cube') {
        xBounds = r;
        yBounds = r;
        zBounds = dimension === '2D' ? 0 : r;
    }

    for (let i = 0; i < count; i += 1) {
        // Calculate possible (x, y, z) location of particle
        // within the size of the canvas or cube size
        const x = Math.random() * xBounds - xBounds / 2;
        const y = Math.random() * yBounds - yBounds / 2;
        const z = Math.random() * zBounds - zBounds / 2;
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        // Choose size of each particle
        particleSizes[i] = Math.random() * (maxSize - minSize) + minSize;

        // Calculates a random number between given range
        const getVelocityMultiplier = (min: number, max: number) =>
            Math.random() * (max - min) + min;

        const { xMax, xMin, yMax, yMin, zMax, zMin } = direction;

        particlesData.push({
            numConnections: 0,
            velocity: new Vector3(
                getVelocityMultiplier(xMin, xMax) * velocity,
                getVelocityMultiplier(yMin, yMax) * velocity,
                getVelocityMultiplier(zMin, zMax) * velocity
            ),
        });
    }

    pointCloudGeometry.setDrawRange(0, count);
    pointCloudGeometry.setAttribute(
        'position',
        new BufferAttribute(particlePositions, 3).setUsage(DynamicDrawUsage)
    );
    pointCloudGeometry.setAttribute(
        'size',
        new BufferAttribute(particleSizes, 1).setUsage(DynamicDrawUsage)
    );

    // Material for particle, use shaders to morph shape and color
    const pointMaterial = new ShaderMaterial({
        blending: AdditiveBlending,
        fragmentShader: getParticleFragmentShader({
            particleShape: shape,
            transparency,
        }),
        transparent: transparency < 1,
        vertexShader: getParticleVertexShader({
            color,
            colorMode,
            devicePixelRatio,
        }),
        visible,
    });

    // The x,y,z bounds of possible particle positions
    // needed for Animate function
    const bounds = {
        xBounds,
        yBounds,
        zBounds,
    };

    return [
        pointCloudGeometry,
        pointMaterial,
        particlesData,
        particlePositions,
        bounds,
    ];
};

export default computeParticles;
