'use babel';

let activePane = null;

function navigateByActivePane(history, item) {
  // Check if it makes sense to update TouchBar
  if (
    !item
    || !item.constructor
    || activePane === item.constructor.name
  ) {
    return null;
  }
  activePane = item.constructor.name;

  console.log('NAVIGATING TO ROUTE', `/${activePane.toLowerCase()}`);
  history.push(`/${activePane.toLowerCase()}`);
}

export default navigateByActivePane;
