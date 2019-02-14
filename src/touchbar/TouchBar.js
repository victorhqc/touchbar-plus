'use babel';

/* eslint import/no-named-as-default-member: 0 */
/* eslint import/no-named-as-default: 0 */

// import { TouchBar as ElectronTouchBar } from 'remote';
// import { touchBarSerializer } from '../serializers';
// import demo from '../components/demo';
import { TouchBar as NativeTouchBar } from 'remote';
import emojis from 'emoji.json';
import start from './start';

const { TouchBarButton, TouchBarScrubber, TouchBarPopover } = NativeTouchBar;
const faceEmojis = emojis.filter(emoji => emoji.keywords.match(/face/gi));

const ACTIVE = 'acticve';
const INACTIVE = 'inactive';

function buildSimpleTouchbar() {
  const button = new TouchBarButton({
    label: 'Hello world',
    backgroundColor: '#d9b1b1',
  });

  const scrubber = new TouchBarScrubber({
    items: faceEmojis.map((emoji) => (
      new TouchBarButton({
        label: emoji.char,
      })
    )),
  });

  const popover = new TouchBarPopover({
    label: faceEmojis[0].char,
    items: [
      scrubber,
    ],
  });

  const touchBar = new NativeTouchBar([
    button,
    popover,
  ]);

  atom.getCurrentWindow().setTouchBar(touchBar);
}

class TouchBar {
  constructor(elements = null) {
    this.init(elements);
  }

  isDisposable() { return true; } // eslint-disable-line

  dispose() {
    this.destroy();
  }

  init(elements) {
    if (!elements) {
      return;
    }

    this.status = ACTIVE;

    console.time('USING-REACT-RENDERER');

    // buildSimpleTouchbar();

    start();
    console.timeEnd('USING-REACT-RENDERER');

    // console.log('ABOUT TO SERIALIZE');
    // touchBarSerializer(elements).then((serialized) => {
    //   console.log('SERIALIZED');
    //   this.instance = new ElectronTouchBar(serialized);
    //   atom.getCurrentWindow().setTouchBar(this.instance);
    // });
  }

  destroy() {
    this.status = INACTIVE;
    atom.getCurrentWindow().setTouchBar(null);
    this.instance = null;
  }

  toggle(elements) {
    if (this.status === ACTIVE) {
      return this.destroy();
    }

    return this.init(elements);
  }
}

export default TouchBar;
