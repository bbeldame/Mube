import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketIOClient from 'socket.io-client';
import ThreeButton from './ThreeButton';

let pattern = [];
let timer = null;

export default class App extends Component {
  constructor(props) {
    super(props);
  
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient('http://10.0.9.66:3000');
    this.socket.on('friendAccelerometer', this.onReceivedAcc);
    this.state = {
      accelerometerData: {},
    };

    window.addEventListener("deviceorientation", this.sendRotation, true);
  }

  sendPattern = (pattern) => {
    console.log('gonna send pattern');
    this.socket.emit('pattern', { pattern }, (data) => {
      console.log(data);
      console.log('hello');
    });
  }

  onReceivedAcc = (data) => {
    console.log('receveid', data);
    this.setState({
      accelerometerData: data,
    });
  }

  _onClick = () => {
    pattern.push(0);
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.sendPattern(pattern);
      pattern = []
    }, 1000); // 1000 ms avant envoi du pattern

    console.log("pressed");
    console.log(pattern)
  }

  map = (n) => {
    let start1 = -200;
    let stop1 = 200;
    let start2 = -1;
    let stop2 = 1;

    return (((n-start1)/(stop1-start1))*(stop2-start2)+start2).toFixed(2);
  }

  sendRotation = (e) => {
    this.socket.emit('accelerometer', {x: this.map(e.alpha), y: this.map(e.beta), z: this.map(e.gamma)}, (data) => {
      console.log(data);
    })
  }

  render() {
    

    return (
      <div onClick={this._onClick} style={styles.container}>
        <ThreeButton acc={this.state.accelerometerData}/>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};
