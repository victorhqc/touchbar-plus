import convert from 'color-convert';

export function hexToHsl(hex = '#ffffff') {
  return convert.hex.hsl(hex).map((e) => e / 100);
}
