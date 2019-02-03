'use babel';

import { TouchBar as ElectronTouchBar, nativeImage } from 'remote';
import isFunction from 'lodash/isFunction';
import convert from 'color-convert';

const { TouchBarButton, TouchBarGroup } = ElectronTouchBar;

/**
 * Parses click property from `string` to an Atom's executable command.
 * If click is a function it leaves it as it was, and it it doesn't exist it doesn't add it.
 * @param {Function|String} click If string, it'll try to execute it as an Atom Command.
 */
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

/**
 * Parses Icon String as NativeImage. If the icon contains "/" it'll try to parse it as a path.
 * @param {String} icon
 * @param {String} iconColor HEX color.
 */
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

/**
 * Serializes an array of elements into valid TouchBar Items.
 * @param  {Array}  [elements=[]]
 * @return {Array}
 */
function serializer(elements = []) {
  if (!elements) {
    return null;
  }

  return elements
    .map(({ type, ...element }) => {
      switch (type) {
        case 'button':
          return new TouchBarButton({
            ...element,
            ...addClickIfNeeded(element),
            ...addIconIfNeeded(element),
          });
        case 'group':
          return new TouchBarGroup({
            items: serializer(element.items),
          });
        default:
          return null;
      }
    })
    // Discard any null element
    .filter(element => element);
}

export default serializer;
