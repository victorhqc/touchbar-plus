declare module 'emojilib' {
  export const lib: Emojis;

  interface Emojis {
    [name: string]: Emoji;
  }

  interface Emoji {
    keywords: string[];
    char: string;
    fitzpatrick_scale: string;
    category: string;
  }
}
