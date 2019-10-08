import React, { Component, ReactNode } from 'react';
import isFunction from 'lodash/isFunction';

import { ItemPane } from '../../../@types';
import { getActivePaneEmitter } from '../../../utils';

export class ActiveItem extends Component<Props, State> {
  private item: HTMLElement | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      route: '',
    };

    this.item = null;

    this.handleActivePaneChange = this.handleActivePaneChange.bind(this);
  }

  componentDidMount() {
    getActivePaneEmitter().onEmitActivePaneChange(this.handleActivePaneChange);
  }

  componentWillUnmount() {
    getActivePaneEmitter().removeOnEmitActivePaneChange(this.handleActivePaneChange);
  }

  handleActivePaneChange(item: ItemPane, route: string) {
    if (!item.element) return;

    this.item = item.element;
    this.setState({
      route,
    });
  }

  getActiveItemFromElement(element: HTMLElement) {
    const activeItem = element.querySelector<HTMLLIElement>('.panels-menu li.active');
    if (!activeItem) return '';

    return activeItem.getAttribute('name') || '';
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
  item: HTMLElement | null;
}

interface Props {
  children: ReactNode | WithActiveItemFunc;
}

interface State {
  route: string;
}
