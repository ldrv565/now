import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import CANNON from 'cannon';

import AppContext from 'context/app';

const objectSize = 1000;

const Terrain = () => {
  const { add, groundMaterial } = useContext(AppContext);

  useEffect(() => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(objectSize, objectSize),
      new THREE.MeshLambertMaterial({ color: 0xdddddd })
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // const body = new CANNON.Body({ mass: 0 }).addShape(new CANNON.Plane());
    // body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    // body.position.set(0, 0, 0);

    // ground plane
    const groundShape = new CANNON.Plane();
    const body = new CANNON.Body({ mass: 0, material: groundMaterial });
    body.addShape(groundShape);

    add(mesh, body);
  }, []);

  return React.Fragment;
};

Terrain.propTypes = {
  setTransformAux: PropTypes.func
};

export default Terrain;
