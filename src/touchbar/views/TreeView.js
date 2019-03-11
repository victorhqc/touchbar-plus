'use babel';

import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import NewFileButton from '../components/NewFileButton';
import NewFolderButton from '../components/NewFolderButton';

const TreeView = () => (
  <Fragment>
    <ToggleSidebarButton />
    <NewFileButton />
    <NewFolderButton />
    <ToggleGitTabButton />
    <spacer small />
    <CommandPaletteButton />
    <spacer small />
  </Fragment>
);

export default TreeView;
