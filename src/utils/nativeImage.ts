import { NativeImage } from 'electron';
import octicons from 'octicons';
import svg2img from 'svg2img';

const { nativeImage } = require('remote');

const memoizedOcticons: MemoizedOcticons = {};

const defaultSizes = (height = 120, width = 160) => ({
  width,
  height,
});

const scaleSizes = (height: number, width: number, scaleFactor = 10.0) => ({
  width: width / scaleFactor,
  height: height / scaleFactor,
  scaleFactor,
});

export function createOcticonImage({
  icon,
  color,
  width,
  height,
  scaleFactor,
}: CreateOcticonImageOptions): Promise<NativeImage> {
  const memoized = memoizedOcticons[icon];
  if (memoized) {
    return Promise.resolve(memoized);
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
        ...scaleSizes(octiconHeight, octiconWidth, scaleFactor),
      });

      // Memoize result to make parsing a bit faster next time.
      memoizedOcticons[icon] = image;

      return resolve(image);
    });
  });
}

interface CreateOcticonImageOptions {
  icon: string;
  color: string;
  width?: number;
  height?: number;
  scaleFactor?: number;
}

interface MemoizedOcticons {
  [name: string]: NativeImage | null | undefined;
}
