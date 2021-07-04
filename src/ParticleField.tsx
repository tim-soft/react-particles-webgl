/* eslint-disable no-shadow */
import React, { useRef, useMemo, useEffect } from 'react';
import { AdditiveBlending, BufferGeometry, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import animate from './lib/animate';
import computeLines from './lib/computeLines';
import computeParticles from './lib/computeParticles';
import type * as ConfigTypes from './types/config';
import { OrbitControls } from '@react-three/drei';

// Default Cube dimensions
const r = 400;

type Props = Omit<Required<ConfigTypes.Config>, 'antialias'>;

type Animation = {
    boundaryType: ConfigTypes.BoundaryType;
    bounds: {
        xBounds: number;
        yBounds: number;
        zBounds: number;
    };
    limitConnections: ConfigTypes.Lines['limitConnections'];
    lineColors: Float32Array;
    lineMeshGeometry: BufferGeometry;
    linePositions: Float32Array;
    maxConnections: ConfigTypes.Lines['maxConnections'];
    minDistance: ConfigTypes.Lines['minDistance'];
    particleCount: ConfigTypes.Particles['count'];
    particlePositions: Float32Array;
    particlesData: {
        numConnections: number;
        velocity: Vector3;
    }[];
    pointCloudGeometry: any;
    showLines: ConfigTypes.Lines['visible'];
};

/**
 * Creates a particle cloud with various config options
 */
const ParticleField = ({
    boundaryType,
    cameraControls,
    dimension,
    direction,
    lines,
    particles,
    showCube,
    velocity,
}: Props) => {
    const animation = useRef<Animation>();

    const { camera, gl, size } = useThree();
    // Scale rendering automatically to window DPI
    // Pass this value to fragment shaders: gl_PointSize needs to scale against this value
    // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio
    const devicePixelRatio = Number(window.devicePixelRatio.toFixed(1));
    gl.setPixelRatio(devicePixelRatio);

    // Default distance from camera to particle field
    const distToParticles = 1750;

    // Setup camera
    useEffect(() => {
        const aspectRatio = size.width / size.height;
        // Calculates the proper FOV for 2D particle field to
        // perfectly fill canvas
        const cameraFOV =
            2 *
            Math.atan(size.width / aspectRatio / (2 * distToParticles)) *
            (180 / Math.PI);

        // @ts-expect-error
        camera.fov = cameraFOV;
        // @ts-expect-error
        camera.aspect = aspectRatio;
        camera.near = 1;
        // Allow field to stay in view while zooming really far out
        camera.far = 10000;

        camera.position.set(0, 0, distToParticles);
        camera.updateProjectionMatrix();
    }, [camera, size.height, size.width]);

    // When the resetCameraFlag option is toggled to 'true', reset camera positio
    useEffect(() => {
        if (cameraControls.resetCameraFlag === true) {
            camera.position.set(0, 0, 1750);
        }
    }, [camera, cameraControls.resetCameraFlag]);

    // Compute lines between points
    const [lineMeshGeometry, lineMeshMaterial, linePositions, lineColors] =
        useMemo(() => computeLines({ lines, particles }), [lines, particles]);

    // Compute point cloud
    const [
        pointCloudGeometry,
        pointMaterial,
        particlesData,
        particlePositions,
        bounds,
    ] = useMemo(
        () =>
            computeParticles({
                devicePixelRatio,
                dimension,
                direction,
                particles,
                r,
                size,
                velocity,
            }),
        [particles, dimension, direction, devicePixelRatio, size, velocity]
    );

    // Assign state to animation ref
    // This object is passed to Animation.js in render loop
    animation.current = {
        boundaryType,
        bounds,
        limitConnections: lines.limitConnections,
        lineColors,
        lineMeshGeometry,
        linePositions,
        maxConnections: lines.maxConnections,
        minDistance: lines.minDistance,
        particleCount: particles.count,
        particlePositions,
        particlesData,
        pointCloudGeometry,
        showLines: lines.visible,
    };

    // Direct access to render loop, executes on each frame
    // State changes must be passed into hook via refs
    // useRender() contents are called in a requestAnimationFrame()
    useFrame(() => {
        if (animation.current) {
            // Animate current state of particles + lines
            animate(animation.current);
        }
    });

    return (
        <scene>
            <group>
                <OrbitControls {...cameraControls} />

                {/* Bounding box that particles exist inside of */}
                {showCube && (
                    <boxHelper>
                        <mesh name="object">
                            <meshBasicMaterial
                                attach="material"
                                blending={AdditiveBlending}
                                color="white"
                                transparent
                                wireframe
                            />
                            <boxBufferGeometry
                                args={[r, r, r]}
                                attach="geometry"
                            />
                        </mesh>
                    </boxHelper>
                )}

                {/* Lines connecting particles */}
                {lines && lines.visible && (
                    <lineSegments
                        geometry={lineMeshGeometry}
                        material={lineMeshMaterial}
                    />
                )}

                {/* Particles */}
                {particles && particles.visible && (
                    <points
                        geometry={pointCloudGeometry}
                        material={pointMaterial}
                    />
                )}
            </group>
        </scene>
    );
};

export default ParticleField;
