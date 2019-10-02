/* eslint-disable no-shadow */
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AdditiveBlending } from 'three';
import { useRender, useThree } from 'react-three-fiber';
import OrbitControls from 'three-orbitcontrols';
import animate from './lib/animate';
import computeLines from './lib/computeLines';
import computeParticles from './lib/computeParticles';

// Default Cube dimensions
const r = 400;

/**
 * Creates a particle cloud with various config options
 */
const ParticleField = ({
  particles,
  lines,
  direction,
  showCube,
  cameraControls,
  dimension,
  velocity,
  boundaryType
}) => {
  const controlsRef = useRef(0);
  const animation = useRef(0);
  const group = useRef();

  const { gl, canvas, camera, size } = useThree();
  // Scale rendering automatically to window DPI
  // Pass this value to fragment shaders: gl_PointSize needs to scale against this value
  // https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setPixelRatio
  const devicePixelRatio = window.devicePixelRatio.toFixed(1);
  gl.setPixelRatio(devicePixelRatio);

  // Default distance from camera to particle field
  const distToParticles = 1750;

  // Setup camera
  controlsRef.current = useMemo(() => {
    const aspectRatio = size.width / size.height;
    // Calculates the proper FOV for 2D particle field to
    // perfectly fill canvas
    const cameraFOV =
      2 *
      Math.atan(size.width / aspectRatio / (2 * distToParticles)) *
      (180 / Math.PI);

    camera.fov = cameraFOV;
    camera.aspect = aspectRatio;
    camera.near = 1;
    // Allow field to stay in view while zooming really far out
    camera.far = 10000;

    // Remove event listeners from previous controls if they exist
    // Set initial camera position if controls haven't taken over yet
    if (controlsRef.current) controlsRef.current.dispose();
    else camera.position.set(0, 0, distToParticles);

    // Setup movement controls for mouse/touch to manipulate camera position
    // https://threejs.org/docs/#examples/controls/OrbitControls
    const controls = new OrbitControls(camera, canvas);

    // Apply given settings to camera controls
    Object.entries(cameraControls).forEach(([key, value]) => {
      controls[key] = value;
    });

    return controls;
  }, [camera, cameraControls, canvas, size.height, size.width]);

  // When the resetCameraFlag option is toggled to 'true', reset camera position
  if (cameraControls.resetCameraFlag === true) {
    camera.position.set(0, 0, 1750);
  }

  // Compute lines between points
  const [
    lineMeshGeometry,
    lineMeshMaterial,
    linePositions,
    lineColors
  ] = useMemo(() => computeLines({ particles, lines }), [particles, lines]);

  // Compute point cloud
  const [
    pointCloudGeometry,
    pointMaterial,
    particlesData,
    particlePositions,
    bounds
  ] = useMemo(
    () =>
      computeParticles({
        particles,
        dimension,
        devicePixelRatio,
        direction,
        size,
        r,
        velocity
      }),
    [particles, dimension, direction, devicePixelRatio, size, velocity]
  );

  // Assign state to animation ref
  // This object is passed to Animation.js in render loop
  animation.current = {
    minDistance: lines.minDistance,
    limitConnections: lines.limitConnections,
    maxConnections: lines.maxConnections,
    particleCount: particles.count,
    bounds,
    lineMeshGeometry,
    pointCloudGeometry,
    particlesData,
    particlePositions,
    linePositions,
    lineColors,
    showLines: lines.visible,
    boundaryType
  };

  // Direct access to render loop, executes on each frame
  // State changes must be passed into hook via refs
  // useRender() contents are called in a requestAnimationFrame()
  useRender(() => {
    // Enables damping of OrbitControls
    controlsRef.current.update();
    // Animate current state of particles + lines
    animate(animation.current);
  });

  return (
    <scene>
      <group ref={group}>
        {/* Bounding box that particles exist inside of */}
        {showCube && (
          <boxHelper>
            <mesh name="object">
              <meshBasicMaterial
                attach="material"
                color="white"
                blending={AdditiveBlending}
                wireframe
                transparent
              />
              <boxBufferGeometry attach="geometry" args={[r, r, r]} />
            </mesh>
          </boxHelper>
        )}
        {/* Lines connecting particles */}
        {lines.visible && (
          <lineSegments
            geometry={lineMeshGeometry}
            material={lineMeshMaterial}
          />
        )}

        {/* Particles */}
        {particles.visible && (
          <points geometry={pointCloudGeometry} material={pointMaterial} />
        )}
      </group>
    </scene>
  );
};

ParticleField.propTypes = {
  showCube: PropTypes.bool.isRequired,
  dimension: PropTypes.oneOf(['2D', '3D']).isRequired,
  boundaryType: PropTypes.oneOf(['bounce', 'passthru']).isRequired,
  velocity: PropTypes.number.isRequired,
  direction: PropTypes.shape({
    xMin: PropTypes.number,
    xMax: PropTypes.number,
    yMin: PropTypes.number,
    yMax: PropTypes.number,
    zMin: PropTypes.number,
    zMax: PropTypes.number
  }).isRequired,
  lines: PropTypes.shape({
    colorMode: PropTypes.oneOf(['rainbow', 'solid']),
    color: PropTypes.string,
    transparency: PropTypes.number,
    maxConnections: PropTypes.number,
    limitConnections: PropTypes.bool,
    minDistance: PropTypes.number,
    visible: PropTypes.bool
  }).isRequired,
  particles: PropTypes.shape({
    count: PropTypes.number,
    minSize: PropTypes.number,
    maxSize: PropTypes.number,
    boundingBox: PropTypes.oneOf(['canvas', 'cube']),
    shape: PropTypes.oneOf(['circle', 'square']),
    colorMode: PropTypes.oneOf(['rainbow', 'solid']),
    color: PropTypes.string,
    transparency: PropTypes.number,
    visible: PropTypes.bool
  }).isRequired,
  cameraControls: PropTypes.shape({
    enabled: PropTypes.bool,
    enableDamping: PropTypes.bool,
    dampingFactor: PropTypes.number,
    enableZoom: PropTypes.bool,
    autoRotate: PropTypes.bool,
    autoRotateSpeed: PropTypes.number,
    resetCameraFlag: PropTypes.bool
  }).isRequired
};

export default ParticleField;
