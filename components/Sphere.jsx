import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import CANNON from 'cannon';

import AppContext from 'context/app';

const objectSize = 5;

const Sphere = ({ wireframe, color, position }) => {
  const { add } = useContext(AppContext);

  useEffect(() => {
    const mesh = new THREE.Mesh(
      new THREE.SphereBufferGeometry(objectSize, 16, 16),
      new THREE.MeshLambertMaterial({
        color,
        wireframe
      })
    );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    const body = new CANNON.Body({ mass: objectSize * 10 }).addShape(
      new CANNON.Sphere(objectSize)
    );
    body.position.set(position.x, position.y, position.z);
    body.linearDamping = 0.1;
    body.angularDamping = 0.5;

    add(mesh, body);
  }, []);

  return React.Fragment;
};

Sphere.defaultProps = {
  position: {
    x: 0,
    y: 0,
    z: 0
  }
};

Sphere.propTypes = {
  wireframe: PropTypes.bool,
  color: PropTypes.string,
  position: PropTypes.object
};

export default Sphere;
