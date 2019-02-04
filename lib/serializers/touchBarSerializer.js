'use babel';

import { TouchBar as ElectronTouchBar } from 'remote';
import map from 'async/map';
import asyncify from 'async/asyncify';

import iconSerializer from './iconSerializer';
import touchBarButtonSerializer from './touchBarButtonSerializer';
import touchBarScrubberSerializer from './touchBarScrubberSerializer';

const {
  TouchBarGroup,
  TouchBarPopover,
} = ElectronTouchBar;

const touchBarGroupSerializer = async ({ element }) => {
  const serializedItems = await serializer(element.items); // eslint-disable-line

  return new TouchBarGroup({
    items: serializedItems,
  });
};

const touchBarPopoverSerializer = async ({ element }) => {
  const iconData = await iconSerializer(element);
  const serializedItems = await serializer(element.items); // eslint-disable-line

  return new TouchBarPopover({
    ...element,
    ...iconData,
    items: serializedItems,
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
          return touchBarButtonSerializer({ element });
        case 'scrubber':
          return touchBarScrubberSerializer({ element });
        case 'group':
          return touchBarGroupSerializer({ element });
        case 'popover':
          return touchBarPopoverSerializer({ element });
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
