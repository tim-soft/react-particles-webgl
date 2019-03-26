/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */

/**
 * Animates an array of particles and lines over a three dimensional space
 *
 * This function is meant to be called from the useRender render loop -- ran on each frame
 */
const animate = ({
  minDistance,
  limitConnections,
  maxConnections,
  particleCount,
  lineMeshGeometry,
  pointCloudGeometry,
  particlesData,
  particlePositions,
  linePositions,
  lineColors,
  bounds
}) => {
  // Get the boundary points of the canvas
  // Useful for knowing when a particle is at the edge of the canvas
  const { xBounds, yBounds, zBounds } = bounds;

  let vertexpos = 0;
  let colorpos = 0;
  let numConnected = 0;

  // Start by assuming no line connections between particles
  for (let i = 0; i < particleCount; i += 1)
    particlesData[i].numConnections = 0;

  // Update the [x, y, z] position of each particle
  for (let i = 0; i < particleCount; i += 1) {
    // The current particle
    const particleData = particlesData[i];
    particlePositions[i * 3] += particleData.velocity.x;
    particlePositions[i * 3 + 1] += particleData.velocity.y;
    particlePositions[i * 3 + 2] += particleData.velocity.z;

    // Make the current particle "bounce" off of the "bounds" of the canvas
    if (
      particlePositions[i * 3 + 1] < -yBounds / 2 ||
      particlePositions[i * 3 + 1] > yBounds / 2
    )
      particleData.velocity.y = -particleData.velocity.y;
    if (
      particlePositions[i * 3] < -xBounds / 2 ||
      particlePositions[i * 3] > xBounds / 2
    )
      particleData.velocity.x = -particleData.velocity.x;
    if (
      particlePositions[i * 3 + 2] < -zBounds / 2 ||
      particlePositions[i * 3 + 2] > zBounds / 2
    )
      particleData.velocity.z = -particleData.velocity.z;

    // Skip to next particle if we are intentionally no drawing lines
    if (limitConnections && particleData.numConnections >= maxConnections)
      continue;

    // Calculate the distance between particles to find nearest-neighbors
    // If particles fall within the threshold, draw a line connecting them
    for (let j = i + 1; j < particleCount; j += 1) {
      // The "other" particle to compare to "this" one
      const particleDataB = particlesData[j];

      // Skip to next particle(don't draw more lines) if some limiting factor has been met
      if (limitConnections && particleDataB.numConnections >= maxConnections)
        continue;

      // Calculate the distance between "this" particle and the "other" particle
      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // If "this" particle is close enough to the "other" particle, draw a line connecting the two
      if (dist < minDistance) {
        // Increment the number of connections by one on both particles
        particleData.numConnections += 1;
        particleDataB.numConnections += 1;

        // The lines become more transparent the further apart the particles become
        // The line fragment shader applies this alpha attribute when coloring the lines
        const alpha = 1.0 - dist / minDistance;

        // Set the line position's [x, y, z] position at "this" point and the "other" point
        linePositions[vertexpos++] = particlePositions[i * 3];
        linePositions[vertexpos++] = particlePositions[i * 3 + 1];
        linePositions[vertexpos++] = particlePositions[i * 3 + 2];
        linePositions[vertexpos++] = particlePositions[j * 3];
        linePositions[vertexpos++] = particlePositions[j * 3 + 1];
        linePositions[vertexpos++] = particlePositions[j * 3 + 2];
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        lineColors[colorpos++] = alpha;
        numConnected += 1;
      }
    }
  }

  // Signal to Three.js that the line and point geometry have changed
  lineMeshGeometry.setDrawRange(0, numConnected * 2);
  lineMeshGeometry.attributes.position.needsUpdate = true;
  lineMeshGeometry.attributes.color.needsUpdate = true;
  pointCloudGeometry.attributes.position.needsUpdate = true;
};

export default animate;
