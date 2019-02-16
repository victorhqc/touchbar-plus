'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component, Fragment } from 'react';
import { nativeImage } from 'remote';
import { hexToHsl, getActiveElement } from '../../utils';

export default class TreeView extends Component {
  constructor(props) {
    super(props);

    this.sideBarIcon = nativeImage.createFromNamedImage(
      'NSTouchBarSidebarTemplate',
      hexToHsl('#ffffff'),
    );
  }

  toggleSideBar() {
    const activeElement = getActiveElement();
    atom.commands.dispatch(activeElement, 'tree-view:toggle');
  }

  render() {
    return (
      <Fragment>
        <button
          backgroundColor="#d9b1b1"
          onClick={this.toggleSideBar}
          icon={this.sideBarIcon}
        />
      </Fragment>
    );
  }
}
