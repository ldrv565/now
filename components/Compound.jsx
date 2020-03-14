import React, { useEffect, useContext } from 'react';

// import * as THREE from 'three';
import CANNON from 'cannon';

import AppContext from 'context/app';

import { meshFromShape } from 'utils';

const Compound = () => {
  const { add } = useContext(AppContext);

  useEffect(() => {
    const mass = 10;
    const compoundBody = new CANNON.Body({ mass });

    // Compound shape
    const sphereShape = new CANNON.Sphere(10);
    compoundBody.addShape(sphereShape, new CANNON.Vec3(10, 10, -10));
    compoundBody.addShape(sphereShape, new CANNON.Vec3(10, -10, -10));
    compoundBody.addShape(sphereShape, new CANNON.Vec3(-10, 10, -10));
    compoundBody.addShape(sphereShape, new CANNON.Vec3(-10, -10, -10));

    compoundBody.position.set(0, 0, 6);
    compoundBody.quaternion.set(0, 1, 0, 0.1);

    const mesh = meshFromShape(compoundBody);

    add(mesh, compoundBody);
  }, []);

  return React.Fragment;
};

export default Compound;
