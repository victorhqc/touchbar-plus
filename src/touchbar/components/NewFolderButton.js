'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  executeAtomCommand,
  createOcticonImage,
} from '../../utils';

class NewFolderButton extends Component {
  constructor(props) {
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
    const { iconColor, ...props } = this.props;
    const { icon } = this.state;

    return (
      <button
        {...props}
        onClick={() => executeAtomCommand('tree-view:add-folder')}
        iconPosition="left"
        icon={icon}
      >
        Add folder
      </button>
    );
  }
}

NewFolderButton.defaultProps = {
  iconColor: '#ffffff',
};

NewFolderButton.propTypes = {
  iconColor: PropTypes.string,
};

export default NewFolderButton;
