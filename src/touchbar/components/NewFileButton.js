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
    });

    this.setState({ icon });
  }

  render() {
    const { iconColor, ...props } = this.props;
    const { icon } = this.state;

    return (
      <button
        {...props}
        onClick={() => executeAtomCommand('tree-view:add-file')}
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
