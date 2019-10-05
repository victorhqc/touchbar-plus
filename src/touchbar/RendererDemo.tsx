import React, { Component, Fragment } from 'react';
// import emojis from 'emojilib';
// import filter from 'lodash/filter';

enum Color {
  Pink = '#f2a4af',
  Purple = '#665674',
}

// const faceEmojis = filter(emojis.lib, emoji => emoji.keywords.indexOf('face') >= 0)

const segmentOptions = [
  'automatic',
  'rounded',
  'textured-rounded',
  'round-rect',
  'textured-square',
  'capsule',
  'small-square',
  'separated',
];

export default class RendererDemo extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      color: Color.Pink,
      selectedColor: '',
      chosenEmoji: -1,
      segmentStyle: 'automatic',
      sliderValue: 0,
    };

    this.toggleColor = this.toggleColor.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.chooseEmoji = this.chooseEmoji.bind(this);
    this.chooseSegmentStyle = this.chooseSegmentStyle.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  toggleColor() {
    this.setState(state => ({
      color: state.color === Color.Pink ? Color.Purple : Color.Pink,
    }));
  }

  chooseColor(newColor: string) {
    this.setState({ selectedColor: newColor });
  }

  chooseEmoji(index: number) {
    this.setState({ chosenEmoji: index });
  }

  chooseSegmentStyle(index: number) {
    this.setState({
      segmentStyle: segmentOptions[index],
    });
  }

  updateValue(newValue: number) {
    this.setState({
      sliderValue: newValue,
    });
  }

  getSliderLabel() {
    if (this.state.sliderValue < 20) {
      return '😐';
    }

    if (this.state.sliderValue < 40) {
      return '🙂';
    }

    if (this.state.sliderValue < 60) {
      return '😀';
    }

    if (this.state.sliderValue < 80) {
      return '😁';
    }

    return '😂';
  }

  getSpacerSize() {
    if (this.state.sliderValue < 40) {
      return { small: true };
    }

    return { large: true };
  }

  render() {
    return (
      <Fragment>
        <touchbar-button backgroundColor={this.state.color} onClick={this.toggleColor}>
          Hello world
        </touchbar-button>
        {/* <label color={this.state.selectedColor}>Choose a color</label>
        <color-picker selected={this.state.selectedColor} onChange={this.chooseColor}>
          <color>#d9b1b1</color>
          <color>#bb95a4</color>
          <color>#b3ad99</color>
          <color>#a3b9b7</color>
          <color>#b1b1b0</color>
        </color-picker> */}
        {/* <group>
          {this.state.selectedColor ? <label>Color was chosen 🎉!</label> : null}
        </group> */}
        <touchbar-popover label={this.state.color === Color.Pink ? '😎' : '😝'}>
          <touchbar-button onClick={this.toggleColor} backgroundColor={this.state.color}>
            Toggle color
          </touchbar-button>
          <label>You can use any valid TouchBar element here.</label>
        </touchbar-popover>
        {/* <label color={this.state.color}>
          Emoji: {this.state.chosenEmoji && faceEmojis[this.state.chosenEmoji].char}
        </label>
        <scrubber onHighlight={this.chooseEmoji}>
          {faceEmojis.map(emoji => (
            <scrub-item key={emoji}>
              {emoji.char}
            </scrub-item>
          ))}
        </scrubber> */}
        {/* <segmented-control selected={0} segmentStyle={this.state.segmentStyle}>
          <segment>Option 1</segment>
          <segment>Option 2</segment>
        </segmented-control>
        <scrubber onHighlight={this.chooseSegmentStyle}>
          {segmentOptions.map(segment => (
            <segment key={segment}>{segment}</segment>
          ))}
        </scrubber> */}
        <touchbar-spacer {...this.getSpacerSize()} />
        <touchbar-slider
          value={this.state.sliderValue}
          debounceTime={250}
          minValue={0}
          maxValue={100}
          onChange={this.updateValue}>
          {this.getSliderLabel()}
        </touchbar-slider>
      </Fragment>
    );
  }
}

interface State {
  color: Color;
  selectedColor: string;
  chosenEmoji: number;
  segmentStyle: string;
  sliderValue: number;
}
