'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import { ReactTouchBar, TouchBar } from 'touchbar-electron-renderer';
import React, { Component, Fragment } from 'react';
import emojis from 'emoji.json';

const faceEmojis = emojis.filter(emoji => emoji.keywords.match(/face/gi));

const FaceEmojis = () => (
  <popover label={emojis[0].char}>
    {faceEmojis.map(emoji => (
      <button key={emoji.no}>
        {emoji.char}
      </button>
    ))}
  </popover>
);

class AtomTouchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      now: Date.now(),
      isClicked: false,
      selectedColor: '#f2a4af',
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.updateNow = this.updateNow.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
  }

  onButtonClick() {
    console.log('CLICKED!');
    // this.setState(() => ({
    //   text: Date.now(),
    //   isClicked: true,
    // }))
  }

  updateNow() {
    console.log('CLICK!');
    this.setState(state => ({
      now: Date.now(),
      isClicked: !state.isClicked,
    }));
  }

  onColorChange(color) {
    console.log('UPDATING COLOR', color);
    this.setState({
      selectedColor: color,
    });
  }

  render() {

    return (
      <Fragment>
        {
          this.state.isClicked ? (
            <button backgroundColor="#d9b1b1" onClick={this.onButtonClick}>
              Hello World
            </button>
          ) : null
        }
        <button
          onClick={this.updateNow} backgroundColor={this.state.selectedColor}>
          {`Now: ${this.state.now}`}
        </button>

        <color-picker onChange={this.onColorChange} selected={this.state.selectedColor}>
          <color>#f2a4af</color>
          <color>#d9b1b1</color>
          <color>#bb95a4</color>
          <color>#b3ad99</color>
          <color>#a3b9b7</color>
          <color>#b1b1b0</color>
          <color>#665674</color>
          <color>#008189</color>
          <color>#c9746e</color>
        </color-picker>

        <group>
          <button backgroundColor={this.state.selectedColor}>A button in a group</button>
          {
            this.state.isClicked ? (
              <button>And another one</button>
            ) : null
          }
        </group>

        <label color={this.state.selectedColor}>I'm a label</label>
        <FaceEmojis />
      </Fragment>
    );
  }
}

export default function start() {
  return ReactTouchBar.render(<AtomTouchBar />, new TouchBar(atom.getCurrentWindow()));
}
