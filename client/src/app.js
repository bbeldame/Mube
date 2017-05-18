import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SocketIOClient from 'socket.io-client';

import config from './config.json';
import Button from './button';

export default class Mube extends Component {
  constructor(props) {
    super(props);
  
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient('http://localhost:3000');
    this.socket = SocketIOClient(`http://${config.ip}:${config.port}`);
    this.socket.on('message', this.onReceivedMessage);
    this.state = {
      acc: 'Hello',
    };
  }

  sendPattern = (pattern) => {
    console.log('gonna send pattern');
    this.socket.emit('pattern', { pattern }, (data) => {
      console.log(data);
      console.log('hello');
    });
  }

  onReceivedMessage = (message) => {
    console.log('message is', message);
    this.setState({ acc: message });
  }

  showMe = () => {
    console.log('cool dope ass');
    this.socket.emit('showme');
  }

  render() {
    let buttonOfTest = null;
    if (this.state.show)
      buttonOfTest = <Button sendPattern={this.showMe}/>

    return (
      <View style={styles.container}>
        <Button sendPattern={this.sendPattern}/>
        <Button sendPattern={this.showMe}/>
        <Text>{this.state.acc}</Text>
        {buttonOfTest}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
