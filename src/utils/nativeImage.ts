import fs from 'fs';
import path from 'path';
import { NativeImage } from 'electron';
import octicons from 'octicons';
import { promisify } from 'util';

const { nativeImage } = require('remote');

const readFileAync = promisify(fs.readFile);
const octiconsPath = path.join(__dirname, 'build', 'octicons');
const memoizedOcticons: MemoizedOcticons = {};

const scaleSizes = (height: number, width: number, scaleFactor = 10.0) => ({
  width: width / scaleFactor,
  height: height / scaleFactor,
  scaleFactor,
});

export async function createOcticonImage({
  icon,
  color,
  width,
  height,
  scaleFactor,
}: CreateOcticonImageOptions): Promise<NativeImage> {
  const memoized = memoizedOcticons[`${icon}-${color}`];
  if (memoized) {
    return memoized;
  }

  const octicon = await readFileAync(path.join(octiconsPath, `${icon}.png`));

  const octiconWidth = width || octicons[icon].width * 10 * 1.2;
  const octiconHeight = height || octicons[icon].height * 10 * 1.2;

  const image = nativeImage.createFromBuffer(octicon, {
    ...scaleSizes(octiconHeight, octiconWidth, scaleFactor),
  });

  // Memoize result to make parsing a bit faster next time.
  memoizedOcticons[`${icon}-${color}`] = image;

  return image;
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
