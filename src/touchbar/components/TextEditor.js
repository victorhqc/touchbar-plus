'use babel';

import React, { Fragment } from 'react';

import ToggleSidebarButton from './ToggleSidebarButton';
import FoldCodePopover from './FoldCodePopover';
import CommandPaletteButton from './CommandPaletteButton';
import SearchFilesPopover from './SearchFilesPopover';


const TextEditor = () => (
  <Fragment>
    <ToggleSidebarButton />
    <FoldCodePopover />
    <CommandPaletteButton />
    <SearchFilesPopover />
  </Fragment>
);

export default TextEditor;
