import React, { Component } from 'react';
import OcticonButton from './OcticonButton';

class FetchButton extends Component {
  render() {
    return <OcticonButton icon="inbox" command="application:open" iconPosition="overlay" />;
  }
}

export default FetchButton;
