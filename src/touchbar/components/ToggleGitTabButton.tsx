import React, { Component, ReactNode } from 'react';
import OcticonButton from './OcticonButton';
import { withActiveItem, WithActiveItemProps } from './activeItem';

class ToggleGitTabButton extends Component<Props> {
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
