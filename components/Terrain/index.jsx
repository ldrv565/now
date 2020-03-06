import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import AppContext from 'context/app';

import initPhysics from './initPhysics';

const Terrain = () => {
  const { add, Ammo } = useContext(AppContext);

  useEffect(() => {
    const [geometry, body] = initPhysics(
      {
        terrainWidthExtents: 100,
        terrainDepthExtents: 100,
        terrainWidth: 256,
        terrainDepth: 256,
        terrainMaxHeight: 1,
        terrainMinHeight: 0
      },
      Ammo
    );

    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xc7c7c7 });

    const terrainMesh = new THREE.Mesh(geometry, groundMaterial);
    terrainMesh.receiveShadow = true;
    terrainMesh.castShadow = true;

    add(terrainMesh, body);
  }, []);

  return React.Fragment;
};

Terrain.propTypes = {
  setTransformAux: PropTypes.func
};

export default Terrain;
