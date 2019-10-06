import React, { FC } from 'react';
import { hexToHsl, executeAtomCommand } from '../../utils';

const { nativeImage } = require('remote');

const CommandPaletteButton: FC<Props> = ({ iconColor, ...props }) => {
  const searchIcon = nativeImage.createFromNamedImage(
    'NSTouchBarSearchTemplate',
    hexToHsl(iconColor),
  );

  return (
    <touchbar-button
      {...props}
      onClick={() => executeAtomCommand('command-palette:toggle')}
      iconPosition="left"
      icon={searchIcon}>
      Command palette
    </touchbar-button>
  );
};

CommandPaletteButton.defaultProps = {
  iconColor: '#ffffff',
};

interface Props {
  iconColor?: string;
}

export default CommandPaletteButton;
