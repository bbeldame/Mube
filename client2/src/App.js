import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SocketIOClient from 'socket.io-client';
import Button from './button'

export default class App extends Component {
  constructor(props) {
    super(props);
  
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient('http://localhost:3000');
  }

  sendPattern = (pattern) => {
    console.log('gonna send pattern');
    this.socket.emit('pattern', { pattern, cool: 'hey' }, (data) => {
      console.log(data);
      console.log('hello');
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <Button sendPattern={this.sendPattern}/>
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
