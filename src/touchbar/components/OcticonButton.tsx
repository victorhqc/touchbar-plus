import React, { Component } from 'react';
import { NativeImage } from 'electron';
import { executeAtomCommand, createOcticonImage } from '../../utils';

class OcticonButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      icon: null,
    };
  }

  async componentDidMount() {
    const { octicon, iconColor } = this.props;

    const icon = await createOcticonImage({
      icon: octicon,
      color: iconColor || '#ffffff',
    });

    this.setState({ icon });
  }

  render() {
    const { command, children, iconPosition } = this.props;
    const { icon } = this.state;

    return (
      <touchbar-button
        onClick={() => executeAtomCommand(command)}
        iconPosition={iconPosition || 'left'}
        icon={icon}>
        {children}
      </touchbar-button>
    );
  }
}

interface Props {
  iconColor?: string;
  iconPosition?: 'left' | 'right' | 'overlay';
  octicon: string;
  command: string;
  children?: string | number | null;
}

interface State {
  icon: NativeImage | null;
}

export default OcticonButton;
