import React, { Component } from 'react';
import OcticonButton from '../OcticonButton';

class FetchButton extends Component {
  render() {
    return <OcticonButton octicon="repo-pull" command="github:pull" iconPosition="overlay" />;
  }
}

export default FetchButton;
