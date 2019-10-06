import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import FetchButton from '../components/github/FetchButton';
import PullButton from '../components/github/PullButton';
import PushButton from '../components/github/PushButton';

const Githuv = () => (
  <Fragment>
    <ToggleSidebarButton />
    <ToggleGitTabButton />
    <FetchButton />
    <touchbar-spacer small />
    <CommandPaletteButton />
    <touchbar-spacer small />
    <PullButton />
    <PushButton />
  </Fragment>
);

export default Githuv;
