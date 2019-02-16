'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component, Fragment } from 'react';
import { nativeImage } from 'remote';
import { hexToHsl, getActiveElement, createOcticonImage } from '../../utils';

const buildArray = (size) => Array.from(Array(size).keys());

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foldIcon: null,
      unfoldIcon: null,
    };

    this.sideBarIcon = nativeImage.createFromNamedImage(
      'NSTouchBarSidebarTemplate',
      hexToHsl('#ffffff'),
    );

    this.buildOcticonIcons();

    this.foldCode = this.foldCode.bind(this);
  }

  async buildOcticonIcons() {
    const foldPromise = createOcticonImage({
      icon: 'fold',
      color: '#ffffff',
    });

    const unfoldPromise = createOcticonImage({
      icon: 'unfold',
      color: '#ffffff',
    });

    const [
      foldIcon,
      unfoldIcon,
    ] = await Promise.all([foldPromise, unfoldPromise]);

    this.setState({ foldIcon, unfoldIcon });
  }


  toggleSideBar() {
    const activeElement = getActiveElement();
    atom.commands.dispatch(activeElement, 'tree-view:toggle');
  }

  foldCode(index) {
    return () => {
      const activeElement = getActiveElement();
      atom.commands.dispatch(activeElement, `editor:fold-at-indent-level-${index}`);
    };
  }

  unfoldCode() {
    const activeElement = getActiveElement();
    atom.commands.dispatch(activeElement, 'editor:unfold-all');
  }

  renderFoldButtons() {
    const foldingLevels = 6;
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
    const { foldIcon } = this.state;

    return (
      <Fragment>
        <button
          onClick={this.toggleSideBar}
          icon={this.sideBarIcon}
        />
        <popover
          label="Fold code"
          icon={foldIcon}
        >
          <button
            onClick={this.unfoldCode}
            icon={this.state.unfoldIcon}
            iconPosition="left"
          >
            Unfold code
          </button>
          {this.renderFoldButtons()}
        </popover>
      </Fragment>
    );
  }
}
