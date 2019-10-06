import React, { Component } from 'react';
import OcticonButton from './OcticonButton';

class FetchButton extends Component {
  render() {
    return <OcticonButton octicon="inbox" command="application:open" iconPosition="overlay" />;
  }
}

export default FetchButton;
