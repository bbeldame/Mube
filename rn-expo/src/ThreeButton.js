import Expo from 'expo';
import React from 'react';

import * as THREE from 'three';
const THREEView = Expo.createTHREEViewClass(THREE);

export default class ThreeCube extends React.Component {
  componentWillMount() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);
    this.camera.position.z = 1000;

    this.geometry = new THREE.BoxGeometry(200, 200, 200);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00FF00,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    console.log('this.props', this.props);
    this.scene.add(this.mesh);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  tick = (dt) => {
    console.log('dt is', dt);
    console.log('this.props', this.props);
    this.mesh.rotation.x = this.props.acc.y || 0;
    this.mesh.rotation.y = -this.props.acc.x || 0;
    this.mesh.rotation.z = this.props.acc.z || 0;
  }

  render() {
    return (
      <THREEView
        style={{ flex: 1 }}
        scene={this.scene}
        camera={this.camera}
        tick={this.tick}
      />
    );
  }
}

Expo.registerRootComponent(ThreeCube);
