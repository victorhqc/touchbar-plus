'use babel';

import React, { Component } from 'react';
import {
  getActiveElement,
  createOcticonImage,
  executeAtomCommand,
} from '../../utils';

const buildArray = (size) => Array.from(Array(size).keys());

export default class FoldCodePopover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foldIcon: null,
      unfoldIcon: null,
    };

    this.buildOcticonIcons();

    this.foldCode = this.foldCode.bind(this);
  }

  async buildOcticonIcons() {
    const whiteColor = '#ffffff';

    const foldPromise = createOcticonImage({
      icon: 'fold',
      color: whiteColor,
    });

    const unfoldPromise = createOcticonImage({
      icon: 'unfold',
      color: whiteColor,
    });

    const [
      foldIcon,
      unfoldIcon,
    ] = await Promise.all([foldPromise, unfoldPromise]);

    this.setState({ foldIcon, unfoldIcon });
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
    const { foldIcon, unfoldIcon } = this.state;

    return (
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
    );
  }
}
