import React, { Component, ComponentType } from 'react';
import { Optionalize } from '../../../@types';
import treeView, { TreeViewManager } from '../../../helpers/treeViewSingleton';

export function withTreeView<P extends WithTreeViewProps = WithTreeViewProps>(
  WrappedComponent: ComponentType<P>,
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class ComponentWithActiveItem extends Component<Optionalize<P, WithTreeViewProps>> {
    static displayName = `withTreeView(${displayName})`;

    render() {
      return <WrappedComponent {...(this.props as P)} treeView={treeView} />;
    }
  };
}

export interface WithTreeViewProps {
  treeView: TreeViewManager;
}
