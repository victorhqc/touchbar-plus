'use babel';

import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import FoldCodePopover from '../components/FoldCodePopover';
import CommandPaletteButton from '../components/CommandPaletteButton';
import SearchFilesPopover from '../components/SearchFilesPopover';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import NavigateTabsBtnGroup from '../components/NavigateTabsBtnGroup';

const TextEditor = () => (
  <Fragment>
    <NavigateTabsBtnGroup />
    <ToggleSidebarButton />
    <ToggleGitTabButton />
    <spacer small />
    <CommandPaletteButton />
    <spacer small />
    <FoldCodePopover />
    <SearchFilesPopover />
  </Fragment>
);

export default TextEditor;
