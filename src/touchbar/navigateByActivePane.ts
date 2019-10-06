import { History } from 'history';
import { logger } from '../utils';

let activePane: string | null = null;

function navigateByActivePane(history: History, item: Item | null) {
  // Check if it makes sense to update TouchBar
  if (!item || !item.constructor || activePane === item.constructor.name) {
    return;
  }
  activePane = item.constructor.name;

  logger.debug(`Navigate to route /${activePane.toLowerCase()}`);
  history.push(`/${activePane.toLowerCase()}`);
}

export default navigateByActivePane;

export interface Item {
  constructor: {
    name: string;
  };
}
