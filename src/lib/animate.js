/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */

/**
 * Calculate new velocity/position of current particle if it hits x, y, or z boundary
 *
 * Controlled by boundaryType, either 'bounce' or 'passthru'
 */
const handleBoundary = ({
  /* The boundaries of the particle field */
  bounds,
  /* Either 'bounce' or 'passthru' */
  boundaryType,
  /* The x, y, z positions of current particle */
  particlePositions,
  /* The x, y, z velocities of current particle */
  particleData,
  i
}) => {
  // Get the boundary points of the canvas
  // Useful for knowing when a particle is at the edge of the canvas
  const { xBounds, yBounds, zBounds } = bounds;

  // Make the current particle "transport" from one side of boundary to the other
  // The particles feel like they 'disappear' and new ones are 'appearing'
  if (boundaryType === 'passthru') {
    // If a particle crosses the x-axis edge, send particle to the opposite x-axis edge
    if (particlePositions[i * 3] < -xBounds / 2) {
      particlePositions[i * 3] = xBounds / 2;
      particleData.velocity.x = particleData.velocity.x;
    } else if (particlePositions[i * 3] > xBounds / 2) {
      particlePositions[i * 3] = -xBounds / 2;
      particleData.velocity.x = particleData.velocity.x;
    }

    // If a particle crosses the y-axis edge, send particle to the opposite y-axis edge
    if (particlePositions[i * 3 + 1] < -yBounds / 2) {
      particlePositions[i * 3 + 1] = yBounds / 2;
      particleData.velocity.y = particleData.velocity.y;
    } else if (particlePositions[i * 3 + 1] > yBounds / 2) {
      particlePositions[i * 3 + 1] = -yBounds / 2;
      particleData.velocity.y = particleData.velocity.y;
    }

    // If a particle crosses the y-axis edge, send particle to the opposite y-axis edge
    if (particlePositions[i * 3 + 2] < -zBounds / 2) {
      particlePositions[i * 3 + 2] = zBounds / 2;
      particleData.velocity.z = particleData.velocity.z;
    } else if (particlePositions[i * 3 + 2] > zBounds / 2) {
      particlePositions[i * 3 + 2] = -zBounds / 2;
      particleData.velocity.z = particleData.velocity.z;
    }
  } else if (boundaryType === 'bounce') {
    // Make the current particle "bounce" off of the "bounds" of the canvas
    // The particles behave like balls thrown at a wall
    if (
      particlePositions[i * 3] < -xBounds / 2 ||
      particlePositions[i * 3] > xBounds / 2
    )
      particleData.velocity.x = -particleData.velocity.x;
    if (
      particlePositions[i * 3 + 1] < -yBounds / 2 ||
      particlePositions[i * 3 + 1] > yBounds / 2
    )
      particleData.velocity.y = -particleData.velocity.y;
    if (
      particlePositions[i * 3 + 2] < -zBounds / 2 ||
      particlePositions[i * 3 + 2] > zBounds / 2
    )
      particleData.velocity.z = -particleData.velocity.z;
  }
};

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
  bounds,
  showLines,
  boundaryType
}) => {
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

    // Calculate new velocity/position of current particle if it hits x, y, or z boundary
    // Controlled by boundaryType, either 'bounce' or 'passthru'
    handleBoundary({
      bounds,
      boundaryType,
      particlePositions,
      particleData,
      i
    });

    // Skip to next particle if we are intentionally not drawing lines
    if (
      !showLines ||
      (limitConnections && particleData.numConnections >= maxConnections)
    )
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
