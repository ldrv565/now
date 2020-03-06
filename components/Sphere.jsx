/* eslint-disable new-cap */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import AppContext from 'context/app';

const objectSize = 3;

const Sphere = ({ wireframe, color, position }) => {
  const { add, Ammo } = useContext(AppContext);

  useEffect(() => {
    const radius = objectSize;

    const geometry = new THREE.SphereBufferGeometry(radius, 20, 20);
    const material = new THREE.MeshLambertMaterial({
      color,
      wireframe
    });

    const currentCube = new THREE.Mesh(geometry, material);

    const shape = new Ammo.btSphereShape(radius);

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

Sphere.propTypes = {
  wireframe: PropTypes.bool,
  color: PropTypes.string,
  position: PropTypes.object
};

export default Sphere;
