/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */

import * as THREE from 'three';

function generateHeight(width, depth, minHeight, maxHeight) {
  const size = width * depth;
  const data = new Float32Array(size);

  const hRange = maxHeight - minHeight;
  const w2 = width / 2;
  const d2 = depth / 2;
  const phaseMult = 12;

  let p = 0;
  for (let j = 0; j < depth; j += 1) {
    for (let i = 0; i < width; i += 1) {
      const radius = Math.sqrt(((i - w2) / w2) ** 2 + ((j - d2) / d2) ** 2);

      const height =
        (Math.sin(radius * phaseMult) + 1) * 0.5 * hRange + minHeight;

      data[p] = height;

      p += 1;
    }
  }

  return data;
}

function createTerrainShape(
  terrainWidthExtents,
  terrainDepthExtents,
  terrainWidth,
  terrainDepth,
  terrainMaxHeight,
  terrainMinHeight,
  heightData,
  Ammo
) {
  // This parameter is not really used, since we are using PHY_FLOAT height data type and hence it is ignored
  const heightScale = 1;

  // Up axis = 0 for X, 1 for Y, 2 for Z. Normally 1 = Y is used.
  const upAxis = 1;

  // hdt, height data type. "PHY_FLOAT" is used. Possible values are "PHY_FLOAT", "PHY_UCHAR", "PHY_SHORT"
  const hdt = 'PHY_FLOAT';

  // Set this to your needs (inverts the triangles)
  const flipQuadEdges = false;

  // Creates height data buffer in Ammo heap
  const ammoHeightData = Ammo._malloc(4 * terrainWidth * terrainDepth);

  // Copy the javascript height data array to the Ammo one.
  let p = 0;
  let p2 = 0;
  for (let j = 0; j < terrainDepth; j += 1) {
    for (let i = 0; i < terrainWidth; i += 1) {
      // write 32-bit float data to memory
      // eslint-disable-next-line no-param-reassign, no-bitwise
      Ammo.HEAPF32[(ammoHeightData + p2) >> 2] = heightData[p];

      p += 1;

      // 4 bytes/float
      p2 += 4;
    }
  }

  // Creates the heightfield physics shape
  const heightFieldShape = new Ammo.btHeightfieldTerrainShape(
    terrainWidth,
    terrainDepth,
    ammoHeightData,
    heightScale,
    terrainMinHeight,
    terrainMaxHeight,
    upAxis,
    hdt,
    flipQuadEdges
  );

  // Set horizontal scale
  const scaleX = terrainWidthExtents / (terrainWidth - 1);
  const scaleZ = terrainDepthExtents / (terrainDepth - 1);
  heightFieldShape.setLocalScaling(new Ammo.btVector3(scaleX, 1, scaleZ));

  heightFieldShape.setMargin(0.05);

  return heightFieldShape;
}

const initPhysics = (
  {
    terrainWidthExtents,
    terrainDepthExtents,
    terrainWidth,
    terrainDepth,
    terrainMaxHeight,
    terrainMinHeight
  },
  Ammo
) => {
  const heightData = generateHeight(
    terrainWidth,
    terrainDepth,
    terrainMinHeight,
    terrainMaxHeight
  );

  const geometry = new THREE.PlaneBufferGeometry(
    terrainWidthExtents,
    terrainDepthExtents,
    terrainWidth - 1,
    terrainDepth - 1
  );

  geometry.rotateX(-Math.PI / 2);

  const vertices = geometry.attributes.position.array;

  for (let i = 0, j = 0, l = vertices.length; i < l; i += 1, j += 3) {
    vertices[j + 1] = heightData[i]; // j + 1 because it is the y component that we modify
  }

  geometry.computeVertexNormals();

  // Create the terrain body

  const groundShape = createTerrainShape(
    terrainWidthExtents,
    terrainDepthExtents,
    terrainWidth,
    terrainDepth,
    terrainMaxHeight,
    terrainMinHeight,
    heightData,
    Ammo
  );

  const groundTransform = new Ammo.btTransform();
  groundTransform.setIdentity();
  // Shifts the terrain, since bullet re-centers it on its bounding box.
  groundTransform.setOrigin(
    new Ammo.btVector3(0, (terrainMaxHeight + terrainMinHeight) / 2, 0)
  );
  const groundMass = 0;
  const groundLocalInertia = new Ammo.btVector3(0, 0, 0);
  const groundMotionState = new Ammo.btDefaultMotionState(groundTransform);
  const groundBody = new Ammo.btRigidBody(
    new Ammo.btRigidBodyConstructionInfo(
      groundMass,
      groundMotionState,
      groundShape,
      groundLocalInertia
    )
  );

  return [geometry, groundBody];
};

export default initPhysics;
