import React from 'react';

import { App, Cube, Terrain, Light, Sphere } from 'components';

export default () => {
  return (
    <App terrain={Terrain} light={Light}>
      <Sphere color="#3579aa" position={{ x: 30, y: 400, z: 0 }} />
      <Sphere color="#3579aa" position={{ x: 30, y: 200, z: 0 }} />
      <Sphere color="#3579aa" position={{ x: 30, y: 150, z: 0 }} />
      <Sphere color="#3579aa" position={{ x: 30, y: 100, z: 0 }} />
      <Sphere color="#3579aa" position={{ x: 30, y: 10, z: 0 }} />
      <Cube color="#F31384" position={{ x: 0, y: 20, z: -20 }} />
      <Cube color="#31384F" position={{ x: -10, y: 20, z: 20 }} />
      <Cube color="#3F8143" position={{ x: 0, y: 30, z: 10 }} />
      <Cube color="#81433F" position={{ x: 10, y: 20, z: -10 }} />
      <Cube color="#3F4381" position={{ x: 30, y: 10, z: -10 }} />
    </App>
  );
};
