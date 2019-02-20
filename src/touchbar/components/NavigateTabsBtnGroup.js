'use babel';

import React, { Fragment, Component } from 'react';
import { nativeImage } from 'remote';
import {
  hexToHsl,
  executeAtomCommand,
} from '../../utils';

export default class NavigateTabsBtnGroup extends Component {
  constructor(props) {
    super(props);

    const iconColor = '#ffffff';

    this.previousIcon = nativeImage.createFromNamedImage(
      'NSTouchBarGoBackTemplate',
      hexToHsl(iconColor),
    );

    this.nextIcon = nativeImage.createFromNamedImage(
      'NSTouchBarGoForwardTemplate',
      hexToHsl(iconColor),
    );
  }

  render() {
    return (
      <Fragment>
        <button
          icon={this.previousIcon}
          onClick={() => executeAtomCommand('pane:show-previous-item')}
        />
        <button
          icon={this.nextIcon}
          onClick={() => executeAtomCommand('pane:show-next-item')}
        />
      </Fragment>
    )
  }
}
