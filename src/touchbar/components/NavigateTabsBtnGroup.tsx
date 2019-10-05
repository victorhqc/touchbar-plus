import React, { Fragment, Component } from 'react';
import { nativeImage, NativeImage } from 'electron';
import { hexToHsl, executeAtomCommand } from '../../utils';

export default class NavigateTabsBtnGroup extends Component {
  private previousIcon: NativeImage;
  private nextIcon: NativeImage;

  constructor(props: object) {
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
        <touchbar-button
          icon={this.previousIcon}
          onClick={() => executeAtomCommand('pane:show-previous-item')}
        />
        <touchbar-button
          icon={this.nextIcon}
          onClick={() => executeAtomCommand('pane:show-next-item')}
        />
      </Fragment>
    );
  }
}
