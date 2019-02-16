'use babel';

import React, { Component, Fragment } from 'react';
import {
  createOcticonImage,
  executeAtomCommand,
} from '../../utils';

import ToggleSidebarButton from './ToggleSidebarButton';
import FoldCodePopover from './FoldCodePopover';
import CommandPaletteButton from './CommandPaletteButton';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folderIcon: null,
    };

    this.buildOcticonIcons();
  }

  async buildOcticonIcons() {
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

    this.setState({ folderIcon });
  }

  render() {
    const { folderIcon } = this.state;

    return (
      <Fragment>
        <ToggleSidebarButton />
        <FoldCodePopover />
        <CommandPaletteButton />
        <popover
          icon={folderIcon}
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
      </Fragment>
    );
  }
}
