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
 * Line shader color for solid colors option
 *
 * @param {string} color A hex color
 */
const solidLineColors = ({ color }) => `
  vColor = vec3(${genColorFromHex({ color })});
`;

/**
 * Line shader color for rainbow colors option
 */
const rainbowLineColors = `
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vColor = normalize( abs( worldPosition.xyz ) );
`;

/**
 * Generates a vertex shader for a connecting line in a particle system
 *
 * This shader uses the position of particles to determine their color
 * and change them as they move
 */
export const getLineVertexShader = ({ colorMode, color }) => `
// Amount of transparency for line, calculated in Animate
attribute float color;

// Calculate color based on line position
varying vec3 vColor;
varying float alpha;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

  ${colorMode === 'rainbow' ? rainbowLineColors : ''}
  ${colorMode === 'solid' ? solidLineColors({ color }) : ''}
  alpha = color;
}
`;

/**
 * Applies a color to a connecting line in a particle system
 */
export const getLineFragmentShader = ({ transparency }) => `
// Color calculated from vertex shader, based on line position
varying vec3 vColor;
// Amount of transparency from vertex shader, based on distance between particles
varying float alpha;

void main() {
  gl_FragColor = vec4( vColor, alpha * ${transparency});
}
`;
