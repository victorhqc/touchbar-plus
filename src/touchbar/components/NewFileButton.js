'use babel';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  executeAtomCommand,
  createOcticonImage,
} from '../../utils';

class NewFileButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: null,
    };
  }

  async componentDidMount() {
    const icon = await createOcticonImage({
      icon: 'file',
      color: '#ffffff',
      height: 194,
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
        onClick={() => executeAtomCommand('application:new-file')}
        iconPosition="left"
        icon={icon}
      >
        Add file
      </button>
    );
  }
}

NewFileButton.defaultProps = {
  iconColor: '#ffffff',
};

NewFileButton.propTypes = {
  iconColor: PropTypes.string,
};

export default NewFileButton;
