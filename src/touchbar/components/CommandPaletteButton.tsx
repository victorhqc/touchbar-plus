import React, { FC } from 'react';
import { nativeImage } from 'electron';
import { hexToHsl, executeAtomCommand } from '../../utils';

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
