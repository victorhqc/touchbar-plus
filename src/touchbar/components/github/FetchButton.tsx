import React, { Component } from 'react';
import OcticonButton from '../OcticonButton';

class FetchButton extends Component {
  render() {
    return <OcticonButton octicon="sync" command="github:fetch" iconPosition="overlay" />;
  }
}

export default FetchButton;
