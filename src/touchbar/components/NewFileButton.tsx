import React, { Component } from 'react';
import { NativeImage } from 'electron';
import { executeAtomCommand, createOcticonImage } from '../../utils';

class NewFileButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      icon: null,
    };
  }

  async componentDidMount() {
    const icon = await createOcticonImage({
      icon: 'file',
      color: '#ffffff',
    });

    this.setState({ icon });
  }

  render() {
    const { iconColor, ...props } = this.props;
    const { icon } = this.state;

    return (
      <touchbar-button
        {...props}
        onClick={() => executeAtomCommand('tree-view:add-file')}
        iconPosition="left"
        icon={icon}>
        Add file
      </touchbar-button>
    );
  }
}

interface Props {
  iconColor?: string;
}

interface State {
  icon: NativeImage | null;
}

export default NewFileButton;
