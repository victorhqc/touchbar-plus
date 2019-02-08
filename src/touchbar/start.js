'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import { ReactTouchBar, TouchBar } from 'touchbar-electron-renderer';
import React, { Component, Fragment } from 'react';

class AtomTouchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      now: Date.now(),
      isClicked: false,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.updateNow = this.updateNow.bind(this);
  }

  onButtonClick() {
    console.log('CLICKED!');
    // this.setState(() => ({
    //   text: Date.now(),
    //   isClicked: true,
    // }))
  }

  updateNow() {
    this.setState({
      now: Date.now(),
    });
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.onButtonClick}>Hello World</button>
        <button onClick={this.onButtonClick}>Another button</button>
        <button onClick={this.updateNow}>{`Now: ${this.state.now}`}</button>
      </Fragment>
    );
  }
}

export default function start() {
  return ReactTouchBar.render(<AtomTouchBar />, new TouchBar(atom.getCurrentWindow()));
}
