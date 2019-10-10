import logger from './logger';
import { PaneItem } from '../@types';

const UNKNOWN = '__unknown__';

export function gePaneItemName(item: PaneItem | null) {
  if (!item) {
    return UNKNOWN;
  }

  const element = getElementFromPaneItem(item);
  if (element) {
    return getNameFromElement(element);
  } else if (item.constructor && item.constructor.name) {
    return item.constructor.name.toLowerCase();
  } else {
    return UNKNOWN;
  }
}

export function getElementFromPaneItem(item: PaneItem | null): HTMLElement | null {
  if (item && item.hasOwnProperty('getElement') && item.getElement) {
    return item.getElement();
  }

  return null;
}

/**
 * Navigates to some special panes. This is a naive implementation that most likely is going to
 * break but is good for now.
 */
function getNameFromElement(element: HTMLElement) {
  const classList = element.classList;
  logger.debug(`classList, ${JSON.stringify(classList)}`);

  if (classList.contains('github-Git-root')) {
    return 'github-pane';
  }

  return UNKNOWN;
}
