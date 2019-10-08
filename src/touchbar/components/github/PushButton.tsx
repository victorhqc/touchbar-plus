import React, { Component } from 'react';
import OcticonButton from '../OcticonButton';

class FetchButton extends Component {
  render() {
    return <OcticonButton icon="repo-push" command="github:push" iconPosition="overlay" />;
  }
}

export default FetchButton;
