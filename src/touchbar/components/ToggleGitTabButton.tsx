import React, { Component } from 'react';
import OcticonButton from './OcticonButton';

class ToggleGitTabButton extends Component {
  render() {
    return (
      <OcticonButton command="github:toggle-git-tab" octicon="git-branch" iconPosition="overlay" />
    );
  }
}
export default ToggleGitTabButton;
