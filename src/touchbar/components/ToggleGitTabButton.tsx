import React, { Component } from 'react';
import OcticonButton from './OcticonButton';

class ToggleGitTabButton extends Component {
  render() {
    return (
      <OcticonButton command="github:toggle-git-tab" icon="git-commit" iconPosition="overlay" />
    );
  }
}
export default ToggleGitTabButton;
