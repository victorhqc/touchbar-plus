'use babel';

import emojis from 'emojilib';
import memoize from 'lodash/memoize';


const emojisArray = Object.keys(emojis.lib).reduce((acc, name) => ([
  ...acc,
  {
    name,
    ...emojis.lib[name],
  }
]), []);

const validParams = [
  'keywords',
  'category',
];

function emojisByQuery(query) {
  const params = Object.keys(query).filter(param => validParams.includes(param));
  console.log('params', params);
  // keywords.some(keyword => emoji.keywords.includes(keyword))
  return emojisArray.filter((emoji) => {
    return params.reduce((acc, param) => {
      // If a param resulted in false, then there's no need to check it again.
      // Multiple params are considered `AND`.
      if (!acc) {
        return acc;
      }

      switch (param) {
        case 'category':
          return emoji.category === query[param];
        case 'keywords':
          return query[param].some(keyword => emoji.keywords.includes(keyword));
        default:
          return acc;
      }
    }, true);
  })
}

export const searchEmojis = memoize(emojisByQuery, (query) => JSON.stringify(query))
