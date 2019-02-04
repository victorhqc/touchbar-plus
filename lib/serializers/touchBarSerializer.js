'use babel';

import { TouchBar as ElectronTouchBar } from 'remote';
import map from 'async/map';
import asyncify from 'async/asyncify';

import touchBarButtonSerializer from './touchBarButtonSerializer';
import touchBarScrubberSerializer from './touchBarScrubberSerializer';

const {
  TouchBarGroup,
} = ElectronTouchBar;

const serializeGroup = async ({ element }) => {
  const serializedItems = await serializer(element.items); //eslint-disable-line

  return new TouchBarGroup({
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
        case 'group':
          return serializeGroup({ element });
        case 'scrubber':
          return touchBarScrubberSerializer({ element });
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
