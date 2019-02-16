'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import { nativeImage } from 'remote';
import {
  hexToHsl,
  executeAtomCommand,
} from '../../utils';

const CommandPaletteButton = ({ iconColor, ...props }) => {
  const searchIcon = nativeImage.createFromNamedImage(
    'NSTouchBarSearchTemplate',
    hexToHsl(iconColor),
  );

  return (
    <button
      {...props}
      onClick={() => executeAtomCommand('command-palette:toggle')}
      iconPosition="left"
      icon={searchIcon}
    >
      Command palette
    </button>
  );
};

CommandPaletteButton.defaultProps = {
  iconColor: '#ffffff',
};

CommandPaletteButton.propTypes = {
  iconColor: PropTypes.string,
};

export default CommandPaletteButton;
