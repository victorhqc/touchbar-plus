import React, { Component } from 'react';
import { NativeImage } from 'electron';
import { executeAtomCommand, createOcticonImage } from '../../utils';

class NewFolderButton extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      icon: null,
    };
  }

  async componentDidMount() {
    const icon = await createOcticonImage({
      icon: 'file-directory',
      color: '#ffffff',
    });

    this.setState({ icon });
  }

  render() {
    const { icon } = this.state;

    return (
      <touchbar-button
        {...this.props}
        onClick={() => executeAtomCommand('tree-view:add-folder')}
        iconPosition="left"
        icon={icon}>
        Add folder
      </touchbar-button>
    );
  }
}

interface State {
  icon: NativeImage | null;
}

export default NewFolderButton;
