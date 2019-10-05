import React, { FC } from 'react';
import { nativeImage } from 'electron';
import { hexToHsl, executeAtomCommand } from '../../utils';

const ToggleSidebarButton: FC<Props> = ({ iconColor }) => {
  const sideBarIcon = nativeImage.createFromNamedImage(
    'NSTouchBarSidebarTemplate',
    hexToHsl(iconColor),
  );

  return (
    <touchbar-button onClick={() => executeAtomCommand('tree-view:toggle')} icon={sideBarIcon} />
  );
};

ToggleSidebarButton.defaultProps = {
  iconColor: '#ffffff',
};

interface Props {
  iconColor?: string;
}

export default ToggleSidebarButton;
