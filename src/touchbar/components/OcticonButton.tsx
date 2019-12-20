import React, { FC } from 'react';
import { executeAtomCommand } from '../../utils';
import Octicon, { WithOcticonProps } from './Octicon';

const OcticonButton: FC<Props> = ({
  command,
  children,
  icon,
  iconPosition,
  iconColor,
  onClick,
}) => (
  <Octicon icon={icon} iconColor={iconColor}>
    {({ octicon }: WithOcticonProps) => (
      <touchbar-button
        onClick={() => (onClick ? onClick() : executeAtomCommand(command || ''))}
        iconPosition={iconPosition || 'left'}
        icon={octicon}>
        {children}
      </touchbar-button>
    )}
  </Octicon>
);

interface Props {
  iconColor?: string;
  iconPosition?: 'left' | 'right' | 'overlay';
  onClick?: Function;
  icon: string;
  command?: string;
  children?: string | number | null;
}

export default OcticonButton;
