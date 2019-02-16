'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component, Fragment } from 'react';
import { nativeImage } from 'remote';
import {
  hexToHsl,
  getActiveElement,
  createOcticonImage,
  executeAtomCommand,
} from '../../utils';

import ToggleSidebarButton from './ToggleSidebarButton';

const buildArray = (size) => Array.from(Array(size).keys());

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

    this.foldCode = this.foldCode.bind(this);
  }

  async buildOcticonIcons() {
    const whiteColor = '#ffffff';

    const foldPromise = createOcticonImage({
      icon: 'fold',
      color: whiteColor,
      height: 204,
      width: 204,
      scaleFactor: 10.0,
    });

    const unfoldPromise = createOcticonImage({
      icon: 'unfold',
      color: whiteColor,
      height: 204,
      width: 204,
      scaleFactor: 10.0,
    });

    const folderPromise = createOcticonImage({
      icon: 'file-directory',
      color: whiteColor,
      height: 204,
      width: 204,
      scaleFactor: 10.0,
    });

    const [
      foldIcon,
      unfoldIcon,
      folderIcon,
    ] = await Promise.all([foldPromise, unfoldPromise, folderPromise]);

    this.setState({ foldIcon, unfoldIcon, folderIcon });
  }

  foldCode(index) {
    return () => {
      const activeElement = getActiveElement();
      atom.commands.dispatch(activeElement, `editor:fold-at-indent-level-${index}`);
    };
  }

  renderFoldButtons() {
    const foldingLevels = 5;
    return buildArray(foldingLevels).map(index => (
      <button
        key={`fold-${index}`}
        onClick={this.foldCode(index + 1)}
        iconPosition="left"
      >
        {`At level ${index + 1}`}
      </button>
    ));
  }

  render() {
    const { foldIcon, unfoldIcon, folderIcon } = this.state;

    return (
      <Fragment>
        <ToggleSidebarButton />
        <popover
          icon={foldIcon}
        >
          <button
            onClick={() => executeAtomCommand('editor:unfold-all')}
            icon={unfoldIcon}
            iconPosition="left"
          >
            Unfold code
          </button>
          {this.renderFoldButtons()}
        </popover>
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
