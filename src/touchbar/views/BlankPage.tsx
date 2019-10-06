import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import OpenButton from '../components/OpenButton';

const BlankPage = () => (
  <Fragment>
    <ToggleSidebarButton />
    <OpenButton />
    <ToggleGitTabButton />
    <touchbar-spacer small />
    <CommandPaletteButton />
    <touchbar-spacer small />
  </Fragment>
);

export default BlankPage;
