import React, { useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import * as THREE from 'three';

import AppContext from 'context/app';

const Light = () => {
  const { add } = useContext(AppContext);

  useEffect(() => {
    const light = new THREE.DirectionalLight(0xffffff, 0.3);
    const amberLight = new THREE.AmbientLight(0xffffff, 0.3);
    light.position.set(100, 100, 50);
    light.castShadow = true;
    const dLight = 200;
    const sLight = dLight * 0.25;
    light.shadow.camera.left = -sLight;
    light.shadow.camera.right = sLight;
    light.shadow.camera.top = sLight;
    light.shadow.camera.bottom = -sLight;

    light.shadow.camera.near = dLight / 30;
    light.shadow.camera.far = dLight;

    light.shadow.mapSize.x = 1024 * 2;
    light.shadow.mapSize.y = 1024 * 2;

    add(light);
    add(amberLight);
  }, []);

  return React.Fragment;
};

Light.propTypes = {};

export default Light;
