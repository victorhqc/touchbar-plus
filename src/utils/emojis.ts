import emojis, { Emoji } from 'emojilib';
import memoize from 'lodash/memoize';

const emojisArray = Object.keys(emojis.lib).reduce<EmojiWithName[]>((acc, name) => {
  const emoji: Emoji = emojis.lib[name];

  return [
    ...acc,
    {
      name,
      ...emoji,
    },
  ];
}, []);

type EmojiWithName = Emoji & { name: string };

const validParams = ['keywords', 'category'];

function emojisByQuery(query: Query) {
  const params = Object.keys(query).filter((param) => validParams.includes(param));
  return emojisArray.filter((emoji) => {
    return params.reduce<boolean>((acc, param) => {
      // If a param resulted in false, then there's no need to check it again.
      // Multiple params are considered `AND`.
      if (!acc) {
        return acc;
      }

      switch (param) {
        case 'category':
          return emoji.category === query[param];
        case 'keywords':
          return (query[param] || []).some((keyword) => emoji.keywords.includes(keyword));
        default:
          return acc;
      }
    }, true);
  });
}

interface Query {
  keywords?: string[];
  category?: string;
}

export const searchEmojis = memoize(emojisByQuery, (query) => JSON.stringify(query));
