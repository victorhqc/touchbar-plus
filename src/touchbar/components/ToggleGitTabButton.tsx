import React, { Component, ReactNode } from 'react';
import OcticonButton from './OcticonButton';
import { withActiveItem, WithActiveItemProps } from './activeItem';

class ToggleGitTabButton extends Component<Props, State> {
  componentDidMount() {
    console.log('PANES', atom.workspace.getPaneItems());
  }

  static getDerivedStateFromProps(props: WithActiveItemProps) {
    return {
      isGitPaneOpen: props.route === 'github-pane' ? true : false,
    };
  }

  render() {
    const { isGitPaneOpen } = this.state;
    console.log('IS GIT OPENED', isGitPaneOpen);

    const command = isGitPaneOpen
      ? 'github:toggle-git-tab'
      : 'github:toggle-git-tab|github:toggle-git-tab-focus';

    return <OcticonButton command={command} icon="git-commit" iconPosition="overlay" />;
  }
}

export default withActiveItem(ToggleGitTabButton);

interface Props extends WithActiveItemProps {
  children?: ReactNode;
}

interface State {
  isGitPaneOpen: boolean;
}
