import Expo from 'expo';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';
import SocketIOClient from 'socket.io-client';


import config from './config.json';
import ThreeButton from './src/ThreeButton';

console.ignoredYellowBox = ['THREE.WebGLRenderer'];

let pattern = [];
let timer = null;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient(`http://${config.ip}:${config.port}`);
    this.socket.on('message', this.onReceivedMessage);
    this.socket.on('friendAccelerometer', this.onReceivedAcc);
    Accelerometer.addListener((result) => {
      this.socket.emit('accelerometer', result);
    });
    Accelerometer.setUpdateInterval(32);
    this.state = {
      accelerometerData: {},
    };
  }

  onReceivedAcc = (data) => {
      console.log('data', data);
    this.setState({
      accelerometerData: data,
    });
  }

  sendPattern = (pattern) => {
    console.log('gonna send pattern');
    this.socket.emit('pattern', { pattern }, (data) => {
      console.log(data);
      console.log('hello');
    });
  }

  _onPress = () => {
    pattern.push(0);
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.sendPattern(pattern);
      pattern = [];
    }, 1000);
    console.log('pressin');
  }

  _onLongPress = () => {
    pattern.push(1);
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.sendPattern(pattern);
      pattern = [];
    }, 1000);
    console.log('longpress');
    console.log(pattern);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={this._onPress}
          delayLongPress={150}
          onLongPress={this._onLongPress}
          onPress={this._onPress}>
          <ThreeButton acc={this.state.accelerometerData}/>
        </TouchableOpacity>
      </View>
    );
  }
}

Expo.registerRootComponent(App);
