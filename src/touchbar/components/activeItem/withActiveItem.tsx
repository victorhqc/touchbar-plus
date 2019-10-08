import React, { FC, ComponentType } from 'react';

import { ActiveItem, WithActiveItemProps } from './ActiveItem';

export const withActiveItem = <P extends object>(
  WrappedComponent: ComponentType<P>,
): FC<P & WithActiveItemProps> => () => (
  <ActiveItem>{(args: WithActiveItemProps) => <WrappedComponent {...(args as P)} />}</ActiveItem>
);
