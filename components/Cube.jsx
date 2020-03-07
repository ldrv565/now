import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import CANNON from 'cannon';

import AppContext from 'context/app';

const objectSize = 3;
const shape = [objectSize, objectSize, objectSize];

const Cube = ({ wireframe, color, position }) => {
  const { add } = useContext(AppContext);

  useEffect(() => {
    const mesh = new THREE.Mesh(
      new THREE.CubeGeometry(...shape),
      new THREE.MeshLambertMaterial({
        color,
        wireframe
      })
    );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    const body = new CANNON.Body({ mass: objectSize * 5 }).addShape(
      new CANNON.Box(new CANNON.Vec3(...shape))
    );
    body.position.set(position.x, position.y, position.z);
    body.angularVelocity.set(0, 100, 0);
    body.angularDamping = 0.5;

    add(mesh, body);
  }, []);

  return React.Fragment;
};

Cube.defaultProps = {
  position: {
    x: 0,
    y: 0,
    z: 0
  }
};

Cube.propTypes = {
  wireframe: PropTypes.bool,
  color: PropTypes.string,
  position: PropTypes.object
};

export default Cube;
