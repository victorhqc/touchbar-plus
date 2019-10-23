import React, { Component } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import OcticonButton from '../components/OcticonButton';
import { withTreeView, WithTreeViewProps } from '../components/treeView';

class TreeView extends Component<WithTreeViewProps> {
  constructor(props: WithTreeViewProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { treeView } = this.props;

    console.log(treeView.getTreeView().selectedPaths());
  }

  render() {
    console.log('TREE VIEW', this.props.treeView);

    return (
      <>
        <ToggleSidebarButton />
        <OcticonButton command="tree-view:add-file" icon="file" iconPosition="overlay" />
        <OcticonButton
          command="tree-view:add-folder"
          icon="file-directory"
          iconPosition="overlay"
        />
        <ToggleGitTabButton />
        <touchbar-spacer small />
        <CommandPaletteButton />
        <touchbar-spacer small />
        <OcticonButton icon="pencil" iconPosition="overlay" onClick={this.handleClick} />
      </>
    );
  }
}

export default withTreeView(TreeView);
