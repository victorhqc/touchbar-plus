import React, { Component, ComponentType } from 'react';

import { Optionalize } from '../../../@types';
import { ActiveItem, WithActiveItemProps } from './ActiveItem';

export function withActiveItem<P extends WithActiveItemProps = WithActiveItemProps>(
  WrappedComponent: ComponentType<P>,
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class ComponentWithActiveItem extends Component<Optionalize<P, WithActiveItemProps>> {
    static displayName = `withActiveItem(${displayName})`;

    render() {
      return (
        <ActiveItem>{args => <WrappedComponent {...(this.props as P)} {...args} />}</ActiveItem>
      );
    }
  };
}
