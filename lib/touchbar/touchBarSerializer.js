'use babel';

import { TouchBar as ElectronTouchBar, nativeImage } from 'remote';
import isFunction from 'lodash/isFunction';
import convert from 'color-convert';

const { TouchBarButton } = ElectronTouchBar;

const addClickIfNeeded = ({ click }) => {
  if (!click) {
    return {};
  }

  if (isFunction(click)) {
    return {
      click,
    };
  }

  const activeElement = atom.views.getView(atom.workspace);

  return {
    click: () => atom.commands.dispatch(activeElement, click),
  };
};

const addIconIfNeeded = ({ icon, iconColor }) => {
  if (!icon) {
    return {};
  }

  const hslColor = convert.hex.hsl(iconColor).map(e => e / 100);

  return {
    icon: icon.indexOf('/') < 0
      ? nativeImage.createFromNamedImage(icon, hslColor)
      : nativeImage.createFromPath(icon),
  };
};

function serializer(elements = []) {
  return elements
    .map(({ type, ...element }) => {
      switch (type) {
        case 'button':
          return new TouchBarButton({
            ...element,
            ...addClickIfNeeded(element),
            ...addIconIfNeeded(element),
          });
        default:
          return null;
      }
    })
    // Discard any null element
    .filter(element => element);
}

export default serializer;
