import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import AppContext from 'context/app';

import CANNON from 'cannon';

import { GLTFLoader } from 'utils/GLTFLoader';
import { shapeFromMesh } from 'utils';

const objectSize = 5;

const GLTFModel = ({ path, position }) => {
  const { add, material } = useContext(AppContext);

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(path, gltf => {
      gltf.scene.traverse(mesh => {
        if (mesh.type === 'Mesh') {
          const shape = shapeFromMesh(mesh);

          const body = new CANNON.Body({
            mass: objectSize * 5,
            material
          }).addShape(shape);

          body.position.set(position.x, position.y, position.z);
          body.angularDamping = 0.5;

          add(mesh, body);
        }
      });
    });
  }, []);

  return React.Fragment;
};

GLTFModel.propTypes = {
  path: PropTypes.string,
  position: PropTypes.object
};

export default GLTFModel;
