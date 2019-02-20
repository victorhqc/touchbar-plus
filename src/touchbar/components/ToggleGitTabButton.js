'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  createOcticonImage,
  executeAtomCommand,
} from '../../utils';

class ToggleGitTabButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: null,
    };

    this.buildIcon();
  }

  async buildIcon() {
    const icon = await createOcticonImage({
      icon: 'git-commit',
      color: '#ffffff',
      height: 167,
      width: 167,
      scaleFactor: 10.0,
    });

    this.setState({ icon });
  }

  render() {
    return (
      <button
        {...this.props}
        iconPosition="left"
        icon={this.state.icon}
        onClick={() => executeAtomCommand('github:toggle-git-tab')}
      >
        Git
      </button>
    );
  }
}

ToggleGitTabButton.defaultProps = {
  iconColor: '#ffffff',
};

ToggleGitTabButton.propTypes = {
  iconColor: PropTypes.string,
};

export default ToggleGitTabButton;
