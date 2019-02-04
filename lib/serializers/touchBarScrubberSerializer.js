'use babel';

import { TouchBar as ElectronTouchBar } from 'remote';
import map from 'async/map';
import asyncify from 'async/asyncify';

import iconSerializer from './iconSerializer';

const {
  TouchBarScrubber,
} = ElectronTouchBar;

const serializeScrubberItems = async items => new Promise((resolve, reject) => {
  map(items, asyncify(async (item) => {
    const iconData = await iconSerializer(item);

    return {
      ...item,
      ...iconData,
    };
  }), (err, serializedItems) => {
    if (err) {
      return reject(err);
    }

    return resolve(serializedItems);
  });
});

export default async function touchBarScrubberSerializer({ element }) {
  const serializedItems = await serializeScrubberItems(element.items);

  return new TouchBarScrubber({
    ...element,
    items: serializedItems,
  });
}
