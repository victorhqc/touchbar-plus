import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import OpenButton from '../components/OpenButton';
import FetchButton from '../components/github/FetchButton';
import PullButton from '../components/github/PullButton';
import PushButton from '../components/github/PushButton';

const BlankPage = () => (
  <Fragment>
    <ToggleSidebarButton />
    <OpenButton />
    <ToggleGitTabButton />
    <touchbar-spacer small />
    <CommandPaletteButton />
    <touchbar-spacer small />
    <FetchButton />
    <PullButton />
    <PushButton />
  </Fragment>
);

export default BlankPage;
