'use babel';

import React, { Component } from 'react';
import {
  createOcticonImage,
  executeAtomCommand,
} from '../../utils';

class SearchFilesPopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconFolder: null,
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
      <popover
        icon={icon}
      >
      <button
        onClick={() => executeAtomCommand('fuzzy-finder:toggle-file-finder')}
      >
        Search all files
      </button>
        <button
          onClick={() => executeAtomCommand('fuzzy-finder:toggle-git-status-finder')}
        >
          Search modified files
        </button>
      </popover>
    );
  }
}

export default SearchFilesPopover;
