import React, { Component } from 'react';
import { NativeImage } from 'electron';
import { createOcticonImage, executeAtomCommand } from '../../utils';

class ToggleGitTabButton extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      icon: null,
    };

    this.buildIcon();
  }

  async buildIcon() {
    const icon = await createOcticonImage({
      icon: 'git-branch',
      color: '#ffffff',
    });

    this.setState({ icon });
  }

  render() {
    return (
      <touchbar-button
        icon={this.state.icon}
        onClick={() => executeAtomCommand('github:toggle-git-tab')}
      />
    );
  }
}

interface State {
  icon: NativeImage | null;
}

export default ToggleGitTabButton;
