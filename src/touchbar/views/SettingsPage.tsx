import React, { Component, Fragment } from 'react';

import { logger } from '../../utils';

import OcticonButton from '../components/OcticonButton';
import { withActiveItem, WithActiveItemProps } from '../components/activeItem';

class SettingsPage extends Component<object & WithActiveItemProps, State> {
  constructor(props: object & WithActiveItemProps) {
    super(props);

    this.state = {
      activeItem: '',
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  static getDerivedStateFromProps(props: WithActiveItemProps) {
    return {
      activeItem: props.item ? getActiveItemFromElement(props.item) : '',
    };
  }

  /**
   * This is a naive implementation for navigating in the settings page. I couldn't find a way
   * of programatically navigating in the settings page, so this workaround is needed. Note that
   * this part of the code could break after an atom update.
   */
  handleButtonClick(target: string) {
    return () => {
      if (!this.props.item) return;

      const targetElement = this.props.item.querySelector<HTMLLIElement>(target);
      if (!targetElement) {
        logger.warning(`Could not find settings element: ${target}`);
        return;
      }

      targetElement.click();

      const parentNode = targetElement.parentNode as HTMLLIElement;
      if (!parentNode) return;

      this.setState({
        activeItem: parentNode.getAttribute('name') || '',
      });
    };
  }

  getIconColor(name: string) {
    const { activeItem } = this.state;

    return activeItem === name ? '#f2a4af' : '#ffffff';
  }

  render() {
    return (
      <Fragment>
        <OcticonButton
          iconPosition="overlay"
          octicon="settings"
          iconColor={this.getIconColor('Core')}
          onClick={this.handleButtonClick('.panels-menu li[name="Core"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="code"
          iconColor={this.getIconColor('Editor')}
          onClick={this.handleButtonClick('.panels-menu li[name="Editor"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="link"
          iconColor={this.getIconColor('URI Handling')}
          onClick={this.handleButtonClick('.panels-menu li[name="URI Handling"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="keyboard"
          iconColor={this.getIconColor('Keybindings')}
          onClick={this.handleButtonClick('.panels-menu li[name="Keybindings"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="package"
          iconColor={this.getIconColor('Packages')}
          onClick={this.handleButtonClick('.panels-menu li[name="Packages"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="paintcan"
          iconColor={this.getIconColor('Themes')}
          onClick={this.handleButtonClick('.panels-menu li[name="Themes"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="cloud-download"
          iconColor={this.getIconColor('Updates')}
          onClick={this.handleButtonClick('.panels-menu li[name="Updates"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          octicon="plus"
          iconColor={this.getIconColor('Install')}
          onClick={this.handleButtonClick('.panels-menu li[name="Install"] a')}
        />
      </Fragment>
    );
  }
}

export default withActiveItem(SettingsPage);

interface State {
  activeItem: string;
}

function getActiveItemFromElement(element: HTMLElement) {
  const activeItem = element.querySelector<HTMLLIElement>('.panels-menu li.active');
  if (!activeItem) return '';

  return activeItem.getAttribute('name') || '';
}
