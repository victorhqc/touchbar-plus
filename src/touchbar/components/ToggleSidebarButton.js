'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import { nativeImage } from 'remote';
import {
  hexToHsl,
  executeAtomCommand,
} from '../../utils';

const ToggleSidebarButton = ({ iconColor, ...props }) => {
  const sideBarIcon = nativeImage.createFromNamedImage(
    'NSTouchBarSidebarTemplate',
    hexToHsl(iconColor),
  );

  return (
    <button
      {...props}
      onClick={() => executeAtomCommand('tree-view:toggle')}
      icon={sideBarIcon}
    />
  );
};

ToggleSidebarButton.defaultProps = {
  iconColor: '#ffffff',
};

ToggleSidebarButton.propTypes = {
  iconColor: PropTypes.string,
};

export default ToggleSidebarButton;
