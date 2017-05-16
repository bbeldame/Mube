import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const styles = {
  button: {
    width: 300,
    height: 300,
    backgroundColor: 'blue'
  },
};

let pattern = [];

class Button extends Component {
  constructor(props){
    super(props);

    this.state = {
      pattern: [],
    };
  }

  _onPress = () => {
    pattern.push(0);
    console.log('pressin');
  }

  _onLongPress = () => {
    pattern.push(1);
    console.log('longpress');
    console.log(pattern);
    this.props.sendPattern(pattern);
  }

  render() {
    return (
      <TouchableOpacity
        delayLongPress={150}
        onLongPress={this._onLongPress}
        onPress={this._onPress}
      >
        <View style={styles.button}>
        </View>
      </TouchableOpacity>
    )
  }
}

export default Button