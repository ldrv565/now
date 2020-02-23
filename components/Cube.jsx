import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import AddContext from 'context/add';

const Cube = ({ wireframe, color, position }) => {
  const add = useContext(AddContext);

  const [cube, setCube] = useState({});
  const [revert, setRevert] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setRevert(current => !current);
    }, 400);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe
    });

    const currentCube = new THREE.Mesh(geometry, material);

    currentCube.position.x = position.x;
    currentCube.position.y = position.y;

    add(currentCube);

    setCube(currentCube);
  }, []);

  cube.animate = () => {
    cube.rotation.z += 0.01;
    cube.rotation.x += 0.03;
    cube.rotation.y += (1 - revert * 2) * 0.05;
  };

  return React.Fragment;
};

Cube.propTypes = {
  wireframe: PropTypes.bool,
  color: PropTypes.string,
  position: PropTypes.object
};

export default Cube;
