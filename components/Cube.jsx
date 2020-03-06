/* eslint-disable new-cap */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import AppContext from 'context/app';

const objectSize = 3;

const Cube = ({ wireframe, color, position }) => {
  const { add, Ammo } = useContext(AppContext);

  useEffect(() => {
    const geometry = new THREE.BoxGeometry(objectSize, objectSize, objectSize);
    const material = new THREE.MeshLambertMaterial({
      color,
      wireframe
    });

    const currentCube = new THREE.Mesh(geometry, material);

    const shape = new Ammo.btBoxShape(
      new Ammo.btVector3(objectSize / 2, objectSize / 2, objectSize / 2)
    );

    currentCube.position.set(position.x || 0, position.y || 0, position.z || 0);

    const mass = objectSize * 5;

    const localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localInertia);

    const transform = new Ammo.btTransform();
    transform.setIdentity();

    const pos = currentCube.position;
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));

    const motionState = new Ammo.btDefaultMotionState(transform);

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      shape,
      localInertia
    );

    const body = new Ammo.btRigidBody(rbInfo);

    currentCube.userData.physicsBody = body;
    currentCube.receiveShadow = true;
    currentCube.castShadow = true;

    add(currentCube, body);
  }, []);

  return React.Fragment;
};

Cube.propTypes = {
  wireframe: PropTypes.bool,
  color: PropTypes.string,
  position: PropTypes.object
};

export default Cube;
