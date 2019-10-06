import { History } from 'history';

let activePane: string | null = null;

function navigateByActivePane(history: History, item: Item | null) {
  // Check if it makes sense to update TouchBar
  if (!item || !item.constructor || activePane === item.constructor.name) {
    return;
  }
  activePane = item.constructor.name;

  console.log('NAVIGATING TO ROUTE', `/${activePane.toLowerCase()}`);
  history.push(`/${activePane.toLowerCase()}`);
}

export default navigateByActivePane;

export interface Item {
  constructor: {
    name: string;
  };
}
