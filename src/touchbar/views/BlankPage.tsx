import React, { Fragment } from 'react';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import OpenButton from '../components/OpenButton';
import OcticonButton from '../components/OcticonButton';

const BlankPage = () => (
  <Fragment>
    <ToggleSidebarButton />
    <OpenButton />
    <OcticonButton command="settings-view:open" icon="gear" iconPosition="overlay" />
    <ToggleGitTabButton />
    <touchbar-spacer small />
    <CommandPaletteButton />
    <touchbar-spacer small />
  </Fragment>
);

export default BlankPage;
