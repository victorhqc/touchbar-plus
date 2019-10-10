import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import OcticonButton from '../components/OcticonButton';

const TreeView = () => (
  <Fragment>
    <ToggleSidebarButton />
    <OcticonButton command="tree-view:add-file" icon="file" />
    <OcticonButton command="tree-view:add-folder" icon="file-directory" />
    <ToggleGitTabButton />
    <touchbar-spacer small />
    <CommandPaletteButton />
    <touchbar-spacer small />
  </Fragment>
);

export default TreeView;
