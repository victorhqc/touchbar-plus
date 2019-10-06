import React, { Component } from 'react';
import OcticonButton from '../OcticonButton';

class FetchButton extends Component {
  render() {
    return <OcticonButton octicon="repo-push" command="github:push" iconPosition="overlay" />;
  }
}

export default FetchButton;
