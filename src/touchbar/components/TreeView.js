'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component, Fragment } from 'react';
import { nativeImage } from 'remote';
import { hexToHsl } from '../../utils';


export default class TreeView extends Component {
  constructor(props) {
    super(props);

    const icon = nativeImage.createFromNamedImage(
      'NSTouchBarSidebarTemplate',
      hexToHsl('#ffffff'),
    );

    this.state = {
      now: Date.now(),
      isClicked: false,
      selectedColor: '#f2a4af',
      icon,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.updateNow = this.updateNow.bind(this);
  }

  onButtonClick() {
    console.log('CLICKED!');
    this.setState(() => ({
      text: Date.now(),
      isClicked: true,
    }))
  }

  updateNow() {
    console.log('CLICK!');
    this.setState(state => ({
      now: Date.now(),
      isClicked: !state.isClicked,
    }));
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
          icon={this.state.icon}
          iconPosition="left"
          onClick={this.updateNow} backgroundColor={this.state.selectedColor}>
          I'm in tree view :)
        </button>
      </Fragment>
    );
  }
}
