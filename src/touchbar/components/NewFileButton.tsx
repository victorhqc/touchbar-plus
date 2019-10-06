import React, { Component } from 'react';
import OcticonButton from './OcticonButton';

class NewFileButton extends Component {
  render() {
    return (
      <OcticonButton command="tree-view:add-file" octicon="file">
        Add file
      </OcticonButton>
    );
  }
}

export default NewFileButton;
