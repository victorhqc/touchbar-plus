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
      height: 167,
      width: 167,
      scaleFactor: 10.0,
    });

    this.setState({ icon });
  }

  render() {
    const { iconColor, ...props } = this.props;
    const { icon } = this.state;

    return (
      <button
        {...props}
        onClick={() => executeAtomCommand('application:add-project-folder')}
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
