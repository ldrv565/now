/* eslint-disable new-cap */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as THREE from 'three';

import AppContext from 'context/app';

import { OrbitControls } from 'utils/jsm/controls/OrbitControls';

import initPhysicsWorld from './initPhysicsWorld';

const timeStep = 1 / 60;

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.mount = createRef();

    [
      this.physicsWorld,
      this.groundMaterial,
      this.material
    ] = initPhysicsWorld();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.add = this.add.bind(this);
  }

  componentDidMount() {
    // add background color
    this.scene.background = new THREE.Color(0xbfd1e5);

    // init renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // init camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.2,
      2000
    );
    this.camera.position.x = 200;
    this.camera.position.y = 100;
    this.camera.position.z = 100;

    this.camera.rotateOnWorldAxis(new THREE.Vector3(50, 50, 50), Math.PI);
    // add window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // add controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls = controls;

    this.mount.current.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.mount.current.removeChild(this.renderer.domElement);
    this.stop();
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  updatePhysics = () => {
    this.physicsWorld.step(timeStep);

    for (
      let meshIndex = 3; // skip two lights and terrain
      meshIndex < this.scene.children.length;
      meshIndex += 1
    ) {
      const mesh = this.scene.children[meshIndex];

      const { body } = mesh.userData;

      if (body) {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
      }
    }
  };

  renderScene = () => {
    this.updatePhysics();
    this.renderer.render(this.scene, this.camera);
  };

  add = (mesh, body) => {
    if (body) {
      // eslint-disable-next-line no-param-reassign
      mesh.userData.body = body;
      this.physicsWorld.addBody(body);
    }

    this.scene.add(mesh);
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
    const { children } = this.props;

    const { add, groundMaterial, material } = this;

    return (
      <AppContext.Provider value={{ add, groundMaterial, material }}>
        <Container ref={this.mount}>{children}</Container>
      </AppContext.Provider>
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
