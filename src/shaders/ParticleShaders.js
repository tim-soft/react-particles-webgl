import hexRgb from 'hex-rgb';
import isHex from 'is-hexcolor';

/**
 * Converts a hex color to gl_FragColor format
 *
 * @param {string} color A hex color
 */
const genColorFromHex = ({ color }) => {
  if (!isHex(color)) return `1, 1, 1`;

  const { red, green, blue } = hexRgb(color);
  return `${(red / 255).toFixed(2)}, ${(green / 255).toFixed(2)}, ${(
    blue / 255
  ).toFixed(2)}`;
};

/**
 * Vertex shader color for solid colors option
 *
 * @param {string} color A hex color
 */
const solidVertexColors = ({ color }) => `
  vColor = vec3(${genColorFromHex({ color })});
`;

/**
 * Vertex shader color for rainbow colors option
 */
const rainbowVertextColors = `
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vColor = vec3( normalize( abs( worldPosition.xyz ) ));
`;

/**
 * Generates a vertex shader for a particle system
 *
 * This shader uses the position of particles to determine their color
 * and change them as they move
 */
export const getParticleVertexShader = ({
  colorMode,
  color,
  devicePixelRatio
}) => `
// Size attribute for particle geometry
attribute float size;

// Calculate color based on particle position
varying vec3 vColor;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize = size * ( 300.0 / -mvPosition.z ) * ${devicePixelRatio};
  gl_Position = projectionMatrix * mvPosition;

  ${colorMode === 'rainbow' ? rainbowVertextColors : ''}
  ${colorMode === 'solid' ? solidVertexColors({ color }) : ''}
}
`;

// "Cuts" a circle out of the default square shape
// by setting the "leftovers" as transparent
const circleParticleShape = `
float r = 0.0, delta = 0.0, alpha = 1.0;
vec2 cxy = 2.0 * gl_PointCoord - 1.0;
r = dot(cxy, cxy);
if (r > 1.0) {
    discard;
}
`;

/**
 * Applies a shape to each particle
 *
 * @param {String} particleShape Either 'circle' or 'square'
 * @param {Number} transparency The alpha channel rgba value for particles
 */
export const getParticleFragmentShader = ({ particleShape, transparency }) => `
// Color from uniforms arg
uniform vec3 color;

// Color calculated from vertex shader, based on particle position
varying vec3 vColor;

void main() {
  ${particleShape === 'circle' ? circleParticleShape : ''}
  gl_FragColor = vec4(vColor, ${transparency});
}
`;
