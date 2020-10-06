import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  ShaderMaterial
} from 'three';
import {
  getLineVertexShader,
  getLineFragmentShader
} from '../shaders/LineShaders';

export default ({ particles, lines }) => {
  const { count } = particles;
  const { color, colorMode, transparency, visible } = lines;

  // Line material
  const lineMeshMaterial = new ShaderMaterial({
    vertexShader: getLineVertexShader({ colorMode, color }),
    fragmentShader: getLineFragmentShader({ transparency }),
    transparent: true,
    blending: AdditiveBlending,
    visible
  });

  // Line mesh geometry
  const lineMeshGeometry = new BufferGeometry();
  const segments = count * count;
  const positions = new Float32Array(segments * 3);
  const colors = new Float32Array(segments * 3);

  lineMeshGeometry.setAttribute(
    'position',
    new BufferAttribute(positions, 3).setUsage(DynamicDrawUsage)
  );
  lineMeshGeometry.setAttribute(
    'color',
    new BufferAttribute(colors, 3).setUsage(DynamicDrawUsage)
  );
  lineMeshGeometry.computeBoundingSphere();
  lineMeshGeometry.setDrawRange(0, 0);

  return [lineMeshGeometry, lineMeshMaterial, positions, colors];
};
