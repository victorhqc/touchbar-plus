'use babel';

import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import FoldCodePopover from '../components/FoldCodePopover';
import CommandPaletteButton from '../components/CommandPaletteButton';
import SearchFilesPopover from '../components/SearchFilesPopover';
import ToggleGitTabButton from '../components/ToggleGitTabButton';

const TextEditor = () => (
  <Fragment>
    <ToggleSidebarButton />
    <FoldCodePopover />
    <CommandPaletteButton />
    <SearchFilesPopover />
    <ToggleGitTabButton />
  </Fragment>
);

export default TextEditor;
