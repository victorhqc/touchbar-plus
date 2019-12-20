import React, { Component, ReactNode } from 'react';
import isFunction from 'lodash/isFunction';

import { PaneItem } from '../../../@types';
import { gePaneItemName } from '../../../utils';

export class ActiveItem extends Component<Props, State> {
  private item: PaneItem | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      route: '',
    };

    this.item = null;
  }

  componentDidMount() {
    this.item = atom.workspace.getActivePane().getActiveItem();
    this.setState({ route: gePaneItemName(this.item) });
  }

  render() {
    const { children } = this.props;
    const { route } = this.state;

    if (isFunction(children)) {
      return children({ route, item: this.item });
    }

    return <>{this.props.children}</>;
  }
}

type WithActiveItemFunc = (args: WithActiveItemProps) => ReactNode | ReactNode[];

export interface WithActiveItemProps {
  route: string;
  item: PaneItem | null;
}

interface Props {
  children: ReactNode | WithActiveItemFunc;
}

interface State {
  route: string;
}
