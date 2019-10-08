import React, { Component, ReactNode } from 'react';
import OcticonButton from './OcticonButton';
import { withActiveItem, WithActiveItemProps } from './activeItem';

class ToggleGitTabButton extends Component<Props> {
  static getDerivedStateFromProps(props: WithActiveItemProps) {
    console.log('TOGGLE GIT PROPS', props);

    return {};
  }

  render() {
    return (
      <OcticonButton command="github:toggle-git-tab" icon="git-commit" iconPosition="overlay" />
    );
  }
}

export default withActiveItem(ToggleGitTabButton);

interface Props extends WithActiveItemProps {
  children?: ReactNode;
}
