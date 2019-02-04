'use babel';

import { TouchBar as ElectronTouchBar } from 'remote';
import isFunction from 'lodash/isFunction';
import map from 'async/map';
import asyncify from 'async/asyncify';

import iconSerializer from './iconSerializer';

const { TouchBarButton, TouchBarGroup } = ElectronTouchBar;

// TODO: Fix me! The current implementation is a workaround.
const getActiveElement = () => {
  if (document.activeElement === document.body) {
    return atom.views.getView(atom.workspace);
  }

  return document.activeElement;
};

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

  const activeElement = getActiveElement();

  return {
    click: () => {
      console.log('CLICK', click);
      console.log('ACTIVE ELEMENT', activeElement);
      atom.commands.dispatch(activeElement, click);
    },
  };
};


const serializeButton = async ({ element }) => {
  const iconData = await iconSerializer(element);

  return new TouchBarButton({
    ...element,
    ...addClickIfNeeded(element),
    ...iconData,
  });
};

const serializeGroup = async ({ element }) => {
  const serializedGroup = await serializer(element.items); //eslint-disable-line

  return new TouchBarGroup({
    items: serializedGroup,
  });
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

  console.time('SERIALIZER');
  return new Promise((resolve, reject) => {
    map(elements, asyncify(async ({ type, ...element }) => {
      switch (type) {
        case 'button':
          return serializeButton({ element });
        case 'group':
          return serializeGroup({ element });
        default:
          return null;
      }
    }), (err, serializedElements) => {
      if (err) {
        return reject(err);
      }

      console.timeEnd('SERIALIZER');
      return resolve(serializedElements.filter(e => e));
    });
  });
}

export default serializer;
