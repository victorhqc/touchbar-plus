import { History } from 'history';
import { logger } from '../utils';

let activePane: string | null = null;

function navigateByActivePane(history: History, item: ItemPane | null) {
  const navigate = navigateTo(history);

  if (!item) {
    return navigate('__unknown__');
  }

  if (item.hasOwnProperty('getElement') && item.getElement) {
    const element = item.getElement();
    navigateWithElement(history, element);
  } else if (item.constructor && item.constructor.name) {
    navigate(item.constructor.name.toLowerCase());
  } else {
    navigate('__unknown__');
  }
}

function navigateTo(history: History) {
  return (routeName: string) => {
    if (activePane === routeName) {
      return;
    }

    activePane = routeName;

    logger.debug(`Navigate to route /${routeName}`);
    history.push(`/${routeName}`);
  };
}

/**
 * Navigates to some special panes. This is a naive implementation that most likely is going to
 * break but is good for now.
 */
function navigateWithElement(history: History, element: HTMLElement) {
  const classList = element.classList;
  logger.debug(`classList, ${JSON.stringify(classList)}`);

  if (classList.contains('github-Git-root')) {
    navigateTo(history)('github-pane');
  }
}

export default navigateByActivePane;

export interface Item {
  constructor: {
    name: string;
  };
  getElement?: () => HTMLElement;
}

type ItemPane = Item & object;
