import React, { Component } from 'react';
import OcticonButton from './OcticonButton';

class NewFolderButton extends Component {
  render() {
    return (
      <OcticonButton command="tree-view:add-folder" octicon="file-directory">
        Add folder
      </OcticonButton>
    );
  }
}
export default NewFolderButton;
