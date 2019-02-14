'use babel';

import { nativeImage } from 'remote';
import octicons from 'octicons';
import svg2img from 'svg2img';

const memoizedOcticons = {};

const scaleSizes = (height, width, scaleFactor = 10.0) => ({
  width: width / scaleFactor,
  height: height / scaleFactor,
  scaleFactor,
})

export function createOcticonImage({icon, color, height, width, scaleFactor }) {
  // Memoized octicon.
  if (memoizedOcticons[icon]) {
    return Promise.resolve(memoizedOcticons[icon]);
  }

  const octiconSVG = octicons[icon].toSVG({
    fill: color,
  });

  return new Promise((resolve, reject) => {
    svg2img(octiconSVG, { width, height }, (error, buffer) => {
      if (error) {
        return reject(error);
      }

      const image = nativeImage.createFromBuffer(buffer, {
        ...scaleSizes(scaleFactor),
      });

      // Memoize result to make parsing a bit faster next time.
      memoizedOcticons[icon] = image;

      return resolve(image);
    });
  });
}
