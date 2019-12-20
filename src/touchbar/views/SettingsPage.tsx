import React, { Component, Fragment } from 'react';

import { logger } from '../../utils';

import OcticonButton from '../components/OcticonButton';
import { withActiveItem, WithActiveItemProps } from '../components/activeItem';

class SettingsPage extends Component<object & WithActiveItemProps> {
  constructor(props: object & WithActiveItemProps) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  /**
   * This is a naive implementation for navigating in the settings page. I couldn't find a way
   * of programatically navigating in the settings page, so this workaround is needed. Note that
   * this part of the code could break after an atom update.
   */
  handleButtonClick(target: string) {
    return () => {
      if (!this.props.item) {
        logger.warning('Item does not exist');

        return;
      }

      const { element } = this.props.item;

      if (!element) {
        logger.warning('Item does not have an element');

        return;
      }

      const targetElement = element.querySelector<HTMLLIElement>(target);
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

  render() {
    return (
      <Fragment>
        <OcticonButton
          iconPosition="overlay"
          icon="settings"
          onClick={this.handleButtonClick('.panels-menu li[name="Core"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          icon="code"
          onClick={this.handleButtonClick('.panels-menu li[name="Editor"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          icon="link"
          onClick={this.handleButtonClick('.panels-menu li[name="URI Handling"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          icon="keyboard"
          onClick={this.handleButtonClick('.panels-menu li[name="Keybindings"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          icon="package"
          onClick={this.handleButtonClick('.panels-menu li[name="Packages"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          icon="paintcan"
          onClick={this.handleButtonClick('.panels-menu li[name="Themes"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          icon="cloud-download"
          onClick={this.handleButtonClick('.panels-menu li[name="Updates"] a')}
        />
        <OcticonButton
          iconPosition="overlay"
          icon="plus"
          onClick={this.handleButtonClick('.panels-menu li[name="Install"] a')}
        />
      </Fragment>
    );
  }
}

export default withActiveItem(SettingsPage);
