import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import FetchButton from '../components/github/FetchButton';
import PullButton from '../components/github/PullButton';
import PushButton from '../components/github/PushButton';
import OcticonButton from '../components/OcticonButton';

const Github = () => (
  <Fragment>
    <ToggleSidebarButton />
    <ToggleGitTabButton />
    <OcticonButton iconPosition="overlay" icon="play" command="github:dive" />
    <touchbar-spacer small />
    <CommandPaletteButton />
    <touchbar-spacer small />
    <FetchButton />
    <PullButton />
    <PushButton />
  </Fragment>
);

export default Github;
