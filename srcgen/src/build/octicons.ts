import fs from 'fs';
import path from 'path';
import svg2img from 'svg2img';
import { promisify } from 'util';
import octicons from 'octicons';

const readDirAync = promisify(fs.readdir);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAync = promisify(fs.mkdir);

const rootPath = path.join(__dirname, '..', '..', '..');
const nodeModulesPath = path.join(rootPath, 'node_modules');
const octiconsPath = path.join(nodeModulesPath, '@primer', 'octicons', 'build', 'svg');
const picturesTargetPath = path.join(rootPath, 'lib', 'build', 'octicons');

async function convertImages() {
  await mkdirAync(picturesTargetPath, { recursive: true });

  const files = await readDirAync(octiconsPath);
  console.log(`Parsing ${files.length} files`);
  for (const file of files) {
    const fileNoExtension = file.replace('.svg', '');
    const octicon = octicons[fileNoExtension];
    if (!octicon) {
      console.warn(`Couldn't parse ${file}`);
      continue;
    }

    const buffer = await svgToImage(octicon.toSVG({ fill: '#ffffff' }), {
      width: octicon.width * 10,
      height: octicon.height * 10,
    });

    const filePngName = file.replace('svg', 'png');
    await writeFileAsync(path.join(picturesTargetPath, filePngName), buffer);
  }
}

function svgToImage(string: string, dimensions: Dimensions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    svg2img(
      string,
      {
        ...dimensions,
        preserveAspectRatio: true,
      },
      (err, buffer) => {
        if (err) {
          return reject(err);
        }

        return resolve(buffer);
      },
    );
  });
}

convertImages()
  .then(() => {
    console.log('Built octicons successfully');
  })
  .catch(e => {
    console.warn('Something went wrong building octicons');
    console.warn(e);
  });

interface Dimensions {
  width: number;
  height: number;
}
