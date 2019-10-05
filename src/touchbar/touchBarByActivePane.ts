import TouchBar from './TouchBar';

export function getTouchBarButtonsForPane(item: Item): object | null {
  const allButtons = JSON.parse(atom.config.get('touchbar-plus.items')) || {};

  const itemName = item.constructor.name;
  const buttonsToRender = allButtons[itemName] || null;

  return buttonsToRender;
}

let activePane: string | null = null;
export function observeAndRenderTouchBarForActivePaneItem(item: Item | null, touchbar: TouchBar) {
  // Check if it makes sense to update TouchBar
  if (!item || !item.constructor || activePane === item.constructor.name) {
    return null;
  }
  activePane = item.constructor.name;

  console.log('ACTIVE PANE ITEM', item);
  console.log('CONSTRUCTOR NAME', item.constructor.name);
  const buttons = getTouchBarButtonsForPane(item);

  if (!buttons) {
    return touchbar.destroy();
  }

  return touchbar.init();
}

export interface Item {
  constructor: {
    name: string;
  };
}
