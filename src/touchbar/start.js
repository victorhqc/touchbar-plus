'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component, Fragment } from 'react';
import { ReactTouchBar, TouchBar } from 'touchbar-electron-renderer';
import { nativeImage } from 'remote';
import emojis from 'emoji.json';
import { hexToHsl } from '../utils';

const faceEmojis = emojis.filter(emoji => emoji.keywords.match(/face/gi));

// const FaceEmojis = () => (
//   <popover label={emojis[0].char}>
//     {faceEmojis.map(emoji => (
//       <button key={emoji.no}>
//         {emoji.char}
//       </button>
//     ))}
//   </popover>
// );

class AtomTouchBar extends Component {
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
      selectedEmojiIndex: 0,
      icon,
      selectedSegment: 0,
      sliderValue: 0,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.updateNow = this.updateNow.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onChangeEmoji = this.onChangeEmoji.bind(this);
    this.onSegmentChange = this.onSegmentChange.bind(this);

    this.doSliderChange = this.doSliderChange.bind(this);
    this.onEmojiTap = this.onEmojiTap.bind(this);
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

  onColorChange(color) {
    console.log('UPDATING COLOR', color);
    this.setState({
      selectedColor: color,
    });
  }

  onChangeEmoji(index) {
    // console.log('CHANGING EMOJI', faceEmojis[index]);
  }

  onEmojiTap(index) {
    console.log('TAPPING EMOJI', index, faceEmojis[index]);
    this.setState({
      selectedEmojiIndex: index,
    });
  }

  onSegmentChange(index) {
    console.log('CHANGING SEGMENT', index);

    this.setState({
      selectedSegment: index,
    });
  }

  doSliderChange(newValue) {
    this.setState({ sliderValue: newValue });
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

        <spacer large />

        {/* <label color={this.state.selectedColor}>I'm a label</label> */}
        <popover label={emojis[this.state.selectedEmojiIndex].char}>
          <scrubber onClick={this.onEmojiTap} selectedStyle="background">
            {faceEmojis.map(emoji => (
              <button key={emoji.no}>
                {emoji.char}
              </button>
            ))}
          </scrubber>
        </popover>

        {/* <segmented-control
          style="rounded"
          onChange={this.onSegmentChange}
          selected={this.selectedSegment}>
          <segment>Foo</segment>
          <segment>Bar</segment>
          <segment>Baz</segment>
        </segmented-control> */}

        <spacer size="small" />

        <slider value={this.state.sliderValue} minValue={0} maxValue={10} onChange={this.doSliderChange}>
          Drag me!
        </slider>
      </Fragment>
    );
  }
}

export default function start() {
  return ReactTouchBar.render(<AtomTouchBar />, new TouchBar(atom.getCurrentWindow()));
}
