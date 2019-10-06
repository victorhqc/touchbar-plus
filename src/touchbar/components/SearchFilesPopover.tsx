import React, { Component } from 'react';
import { NativeImage } from 'electron';
import { createOcticonImage, executeAtomCommand } from '../../utils';

class SearchFilesPopover extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      icon: null,
    };

    this.buildIcon();
  }

  async buildIcon() {
    const icon = await createOcticonImage({
      icon: 'file-directory',
      color: '#ffffff',
    });
    this.setState({ icon });
  }

  render() {
    const { icon } = this.state;

    return (
      <touchbar-popover icon={icon}>
        <touchbar-button onClick={() => executeAtomCommand('fuzzy-finder:toggle-file-finder')}>
          Search all files
        </touchbar-button>
        <touchbar-button
          onClick={() => executeAtomCommand('fuzzy-finder:toggle-git-status-finder')}>
          Search modified files
        </touchbar-button>
      </touchbar-popover>
    );
  }
}

interface State {
  icon: NativeImage | null;
}

export default SearchFilesPopover;
