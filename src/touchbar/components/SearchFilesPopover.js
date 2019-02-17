'use babel';

import React, { Component } from 'react';
import {
  createOcticonImage,
  executeAtomCommand,
} from '../../utils';

const buildOcticon = async () => {
  const whiteColor = '#ffffff';

  const folderPromise = createOcticonImage({
    icon: 'file-directory',
    color: whiteColor,
    height: 204,
    width: 204,
    scaleFactor: 10.0,
  });

  const [
    folderIcon,
  ] = await Promise.all([folderPromise]);

  return folderIcon;
};

class SearchFilesPopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconFolder: null,
    };

    this.buildIcon();
  }

  async buildIcon() {
    const icon = await buildOcticon();
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
