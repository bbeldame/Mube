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
    this.socket = SocketIOClient('http://localhost:3000');
    this.socket.on('friendAccelerometer', this.onReceivedAcc);
    this.state = {
      accelerometerData: {},
    };
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
