'use babel';

import { nativeImage } from 'remote';
import convert from 'color-convert';
import octicons from 'octicons';
import svg2img from 'svg2img';

const nativeIconSerializer = ({ icon, iconColor }) => {
  const hslColor = convert.hex.hsl(iconColor).map(e => e / 100);

  return Promise.resolve({
    icon: icon.indexOf('/') < 0
      ? nativeImage.createFromNamedImage(icon, hslColor)
      : nativeImage.createFromPath(icon),
  });
};

const memoizedOcticons = {};

const octiconIconSerializer = ({ icon, iconColor }) => {
  const octiconName = icon.replace('octicon-', '');

  // Memoized octicon.
  if (memoizedOcticons[octiconName]) {
    console.log('MEMOIZED OCTICON');
    return Promise.resolve(memoizedOcticons[octiconName]);
  }

  return new Promise((resolve, reject) => {
    console.time('SVG-TO-IMAGE');
    svg2img(octicons[octiconName].toSVG({
      fill: iconColor,
    }), { width: 120, height: 160 }, (error, buffer) => {
      if (error) {
        return reject(error);
      }

      const iconData = {
        icon: nativeImage.createFromBuffer(buffer, {
          width: 12,
          height: 16,
          scaleFactor: 10.0,
        }),
      };

      console.timeEnd('SVG-TO-IMAGE');

      // Memoize result to make parsing a bit faster next time.
      memoizedOcticons[octiconName] = iconData;

      return resolve(iconData);
    });
  });
};

/**
 * Parses Icon String as NativeImage. If the icon contains "/" it'll try to parse it as a path.
 * @param {String} icon
 * @param {String} iconColor HEX color.
 */
function iconSerializer({ icon, iconColor }) {
  if (!icon) {
    return Promise.resolve({});
  }

  if (icon.indexOf('octicon-') < 0) {
    return nativeIconSerializer({ icon, iconColor });
  }

  return octiconIconSerializer({ icon, iconColor });
}

export default iconSerializer;
