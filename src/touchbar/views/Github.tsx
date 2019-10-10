import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import OcticonButton from '../components/OcticonButton';

const Github = () => (
  <Fragment>
    <ToggleSidebarButton />
    <OcticonButton iconPosition="overlay" icon="mark-github" command="github:toggle-github-tab" />
    <ToggleGitTabButton />
    <touchbar-spacer small />
    <CommandPaletteButton />
    <touchbar-spacer small />
    <OcticonButton icon="sync" command="github:fetch" iconPosition="overlay" />
    <OcticonButton icon="arrow-down" command="github:pull" iconPosition="overlay" />
    <OcticonButton icon="arrow-up" command="github:push" iconPosition="overlay" />
  </Fragment>
);

export default Github;
