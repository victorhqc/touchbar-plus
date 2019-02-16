'use babel';

import React, { Component, Fragment } from 'react';
import { nativeImage } from 'remote';
import {
  hexToHsl,
  createOcticonImage,
  executeAtomCommand,
} from '../../utils';

import ToggleSidebarButton from './ToggleSidebarButton';
import FoldCodePopover from './FoldCodePopover';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foldIcon: null,
      unfoldIcon: null,
    };

    const whiteColor = hexToHsl('#ffffff');

    this.searchIcon = nativeImage.createFromNamedImage(
      'NSTouchBarSearchTemplate',
      whiteColor,
    );

    this.folderIcon = nativeImage.createFromNamedImage(
      'NSTouchBarFolderTemplate',
      whiteColor,
    );

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
        <button
          onClick={() => executeAtomCommand('command-palette:toggle')}
          icon={this.searchIcon}
          iconPosition="left"
        >
          Command palette
        </button>
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
