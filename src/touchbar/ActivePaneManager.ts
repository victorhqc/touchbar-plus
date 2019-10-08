import { History } from 'history';
import { logger, getActivePaneEmitter } from '../utils';
import { ItemPane } from '../@types';

const UNKNOWN = '__unknown__';

export default class ActivePaneManager {
  private activeItem: ItemPane | null;
  private routeName: string | null;
  private history: History;

  constructor(history: History) {
    this.activeItem = null;
    this.routeName = null;
    this.history = history;
  }

  setActive(item: ItemPane | null) {
    const route = this.getRouteNameFromItem(item);

    if (route === this.routeName) {
      return false;
    }

    this.activeItem = item;
    this.routeName = route;

    return true;
  }

  getMaybeNullValue<T>(value: T | null): T {
    if (!value) {
      throw new Error('Value does not exist');
    }

    return value;
  }

  getActiveItem() {
    return this.getMaybeNullValue(this.activeItem);
  }

  getRouteName() {
    return this.getMaybeNullValue(this.routeName);
  }

  navigateTo(item: ItemPane | null) {
    if (!this.setActive(item)) {
      return;
    }

    logger.debug(`Navigate to route /${this.routeName}`);
    this.history.push(`/${this.routeName}`);
    getActivePaneEmitter().emitActivePaneChange(this.activeItem, this.getRouteName());
  }

  getRouteNameFromItem(item: ItemPane | null) {
    if (!item) {
      return UNKNOWN;
    }

    if (item.hasOwnProperty('getElement') && item.getElement) {
      const element = item.getElement();
      return this.getRouteNameFromElement(element);
    } else if (item.constructor && item.constructor.name) {
      return item.constructor.name.toLowerCase();
    } else {
      return UNKNOWN;
    }
  }

  /**
   * Navigates to some special panes. This is a naive implementation that most likely is going to
   * break but is good for now.
   */
  getRouteNameFromElement(element: HTMLElement) {
    const classList = element.classList;
    logger.debug(`classList, ${JSON.stringify(classList)}`);

    if (classList.contains('github-Git-root')) {
      return 'github-pane';
    }

    return UNKNOWN;
  }

  isDisposable() {
    return true;
  }

  dispose() {
    this.activeItem = null;
    this.routeName = null;
  }
}
