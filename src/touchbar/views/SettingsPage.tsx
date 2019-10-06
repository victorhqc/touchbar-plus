import React, { Component, Fragment } from 'react';
import { fireEvent } from '@testing-library/dom';

import { ItemPane } from '../../@types';
import { getActivePaneEmitter, logger } from '../../utils';

import ToggleSidebarButton from '../components/ToggleSidebarButton';
import CommandPaletteButton from '../components/CommandPaletteButton';
import ToggleGitTabButton from '../components/ToggleGitTabButton';
import OcticonButton from '../components/OcticonButton';

class SettingsPage extends Component {
  private itemElement: HTMLElement | null;

  constructor(props: object) {
    super(props);

    this.itemElement = null;

    this.handleActivePaneChange = this.handleActivePaneChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    getActivePaneEmitter().onEmitActivePaneChange(this.handleActivePaneChange);
  }

  componentWillUnmount() {
    getActivePaneEmitter().removeOnEmitActivePaneChange(this.handleActivePaneChange);
  }

  handleActivePaneChange(item: ItemPane) {
    if (!item.element) return;

    this.itemElement = item.element;
  }

  handleButtonClick(target: string) {
    return () => {
      if (!this.itemElement) return;

      const targetElement = this.itemElement.querySelector<HTMLLIElement>(target);
      if (!targetElement) {
        logger.warning(`Could not find settings element: ${target}`);
        return;
      }

      fireEvent.click(targetElement);
    };
  }

  render() {
    if (this.itemElement) {
      // do nothing;
    }

    return (
      <Fragment>
        <ToggleSidebarButton />
        <ToggleGitTabButton />
        <touchbar-spacer small />
        <CommandPaletteButton />
        <touchbar-spacer small />
        <OcticonButton
          iconPosition="overlay"
          octicon="settings"
          onClick={this.handleButtonClick('.panels-menu li[name="Core"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="code"
          onClick={this.handleButtonClick('.panels-menu li[name="Editor"] a')}
        />
      </Fragment>
    );
  }
}

export default SettingsPage;
