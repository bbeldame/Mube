import React, { Component } from 'react';

const styles = {
  button: {
    width: 300,
    height: 300,
    backgroundColor: 'blue'
  },
};

let pattern = [];
let timer = null;

class Button extends Component {
  constructor(props){
    super(props);

    this.state = {
      pattern: [],
    };
  }

  _onClick = () => {
    pattern.push(0);
    clearTimeout(timer);
    timer = setTimeout(() => { this.props.sendPattern(pattern) }, 1000); // 1000 ms avant envoi du pattern

    console.log("pressed");
    console.log(pattern)
  }

  render() {
    return (
      <div onClick={this._onClick.bind(this)}>
        <div style={styles.button}>
        </div>
      </div>
    )
  }
}

export default Button