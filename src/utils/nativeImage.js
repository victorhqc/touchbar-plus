'use babel';

import { nativeImage } from 'remote';
import octicons from 'octicons';
import svg2img from 'svg2img';

const memoizedOcticons = {};

const defaultSizes = (height = 120, width = 160) => ({
  width,
  height,
});

const scaleSizes = (height, width, scaleFactor = 10.0) => ({
  width: width / scaleFactor,
  height: height / scaleFactor,
  scaleFactor,
})

export function createOcticonImage({ icon, color, width, height, scaleFactor }) {
  // Memoized octicon.
  if (memoizedOcticons[icon]) {
    return Promise.resolve(memoizedOcticons[icon]);
  }

  const octiconWidth = width || octicons[icon].width * 10 * 1.2;
  const octiconHeight = height || octicons[icon].height * 10 * 1.2;

  const octiconSVG = octicons[icon].toSVG({
    fill: color,
  });

  const sizes = defaultSizes(octiconHeight, octiconWidth);

  return new Promise((resolve, reject) => {
    svg2img(octiconSVG, sizes, (error, buffer) => {
      if (error) {
        return reject(error);
      }

      const image = nativeImage.createFromBuffer(buffer, {
        ...scaleSizes(octiconHeight, octiconWidth, scaleFactor)
      });

      // Memoize result to make parsing a bit faster next time.
      memoizedOcticons[icon] = image;

      return resolve(image);
    });
  });
}
