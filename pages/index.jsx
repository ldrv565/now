import React from 'react';

import { App, Cube } from 'components';

export default () => {
  return (
    <App>
      <Cube color="#F31384" position={{ x: 0, y: 0 }} />
      <Cube color="#31384F" position={{ x: -2, y: 0 }} />
      <Cube wireframe color="#3F8143" position={{ x: 0, y: 2 }} />
      <Cube color="#81433F" position={{ x: 2, y: 0 }} />
      <Cube wireframe color="#3F4381" position={{ x: 0, y: -2 }} />
    </App>
  );
};
