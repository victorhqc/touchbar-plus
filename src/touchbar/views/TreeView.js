'use babel';

import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import NavigateTabsBtnGroup from '../components/NavigateTabsBtnGroup';

const TreeView = () => (
  <Fragment>
    <NavigateTabsBtnGroup />
    <ToggleSidebarButton />
    <ToggleGitTabButton />
    <spacer small />
    <CommandPaletteButton />
    <spacer small />
  </Fragment>
);

export default TreeView;
