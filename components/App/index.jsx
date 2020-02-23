import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as THREE from 'three';

import AddContext from 'context/add';

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.mount = createRef();
    this.state = {
      scene: new THREE.Scene()
    };
  }

  componentDidMount() {
    // ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 4;
    // ADD RENDERER
    // ADD CUBE

    this.start();
    this.mount.current.appendChild(this.renderer.domElement);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.current.removeChild(this.renderer.domElement);
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  renderScene = () => {
    const { scene } = this.state;
    scene.rotation.z += 0.01;
    scene.rotation.y += 0.01;
    scene.rotation.x += 0.02;
    scene.children.forEach(({ animate: elementAnimate }) => elementAnimate());
    this.renderer.render(scene, this.camera);
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  render() {
    const { scene } = this.state;
    const { children } = this.props;

    return (
      <AddContext.Provider value={mesh => scene.add(mesh)}>
        <Container ref={this.mount}>{children}</Container>
      </AddContext.Provider>
    );
  }
}

ThreeScene.propTypes = {
  children: PropTypes.any
};

export default ThreeScene;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
