import React, { Component, ComponentType } from 'react';

import { ActiveItem, WithActiveItemProps } from './ActiveItem';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Optionalize<T extends K, K> = Omit<T, keyof K>;

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
