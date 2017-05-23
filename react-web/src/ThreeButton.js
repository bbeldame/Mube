import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x = this.props.acc.y || 0,
          this.state.cubeRotation.y = -this.props.acc.x || 0,
          this.state.cubeRotation.z = this.props.acc.z || 0,
          0
        ),
      });
    };
  }

  render() {
    // or you can use:
    // width = window.innerWidth
    // height = window.innerHeight

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera below
      width={window.innerWidth}
      height={window.innerHeight}

      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={400}
          aspect={window.innerWidth / window.innerHeight}
          near={0.5}
          far={20}

          position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}

export default Simple;