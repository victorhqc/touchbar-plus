'use babel';

import { TouchBar as ElectronTouchBar } from 'remote';
import isFunction from 'lodash/isFunction';
import map from 'async/map';
import asyncify from 'async/asyncify';

import iconSerializer from './iconSerializer';

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
 * Serializes an array of elements into valid TouchBar Items.
 * @param  {Array}  [elements=[]]
 * @return {Array}
 */
function serializer(elements = []) {
  if (!elements) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    map(elements, asyncify(async ({ type, ...element }) => {
      const iconData = await iconSerializer(element);

      switch (type) {
        case 'button':
          return new TouchBarButton({
            ...element,
            ...addClickIfNeeded(element),
            ...iconData,
          });
        case 'group':
          return new TouchBarGroup({
            items: serializer(element.items),
          });
        default:
          return null;
      }
    }), (err, serializedElements) => {
      if (err) {
        return reject(err);
      }

      return resolve(serializedElements);
    });
  });
}

export default serializer;
