import React, { Component } from 'react';
import { NativeImage } from 'electron';
import { getActiveElement, createOcticonImage, executeAtomCommand } from '../../utils';

const buildArray = (size: number) => Array.from(Array(size).keys());

export default class FoldCodePopover extends Component<object, State> {
  constructor(props: object) {
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

    const [foldIcon, unfoldIcon] = await Promise.all([foldPromise, unfoldPromise]);

    this.setState({ foldIcon, unfoldIcon });
  }

  foldCode(index: number) {
    return () => {
      const activeElement = getActiveElement();

      activeElement &&
        atom.commands.dispatch(activeElement, `editor:fold-at-indent-level-${index}`);
    };
  }

  renderFoldButtons() {
    const foldingLevels = 5;
    return buildArray(foldingLevels).map(index => (
      <touchbar-button key={`fold-${index}`} onClick={this.foldCode(index + 1)} iconPosition="left">
        {`At level ${index + 1}`}
      </touchbar-button>
    ));
  }

  render() {
    const { foldIcon, unfoldIcon } = this.state;

    return (
      <touchbar-popover icon={foldIcon}>
        <touchbar-button
          onClick={() => executeAtomCommand('editor:unfold-all')}
          icon={unfoldIcon}
          iconPosition="left">
          Unfold code
        </touchbar-button>
        {this.renderFoldButtons()}
      </touchbar-popover>
    );
  }
}

interface State {
  foldIcon: NativeImage | null;
  unfoldIcon: NativeImage | null;
}
