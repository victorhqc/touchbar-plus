'use babel';

/* eslint import/no-named-as-default-member: 0 */
/* eslint import/no-named-as-default: 0 */

// import { TouchBar as ElectronTouchBar } from 'remote';
// import { touchBarSerializer } from '../serializers';
// import demo from '../components/demo';
import { TouchBar as NativeTouchBar } from 'remote';
import emoji from 'node-emoji';
import start from './start';

const { TouchBarButton, TouchBarScrubber, TouchBarPopover } = NativeTouchBar;
// const faceEmojis = emojis.filter(emoji => emoji.keywords.match(/face/gi));
const faceEmojis = emoji.search('face');

const ACTIVE = 'acticve';
const INACTIVE = 'inactive';

function buildSimpleTouchbar() {
  console.time('USING-SIMPLE-TOUCHBAR');
  const button = new TouchBarButton({
    label: 'Hello world',
    backgroundColor: '#d9b1b1',
  });

  const scrubber = new TouchBarScrubber({
    items: faceEmojis.map(({ emoji }) => (
      new TouchBarButton({
        label: emoji,
      })
    )),
  });

  const popover = new TouchBarPopover({
    label: faceEmojis[0].emoji,
    items: [
      scrubber,
    ],
  });

  const touchBar = new NativeTouchBar([
    button,
    popover,
  ]);

  atom.getCurrentWindow().setTouchBar(touchBar);
  console.timeEnd('USING-SIMPLE-TOUCHBAR');
}

class TouchBar {
  constructor(history) {
    this.history = history;
  }

  isDisposable() { return true; } // eslint-disable-line

  dispose() {
    this.destroy();
  }

  init() {
    this.status = ACTIVE;
    console.log('INIT TOUCHBAR');

    // buildSimpleTouchbar();

    start(this.history);

  }

  destroy() {
    this.status = INACTIVE;
    atom.getCurrentWindow().setTouchBar(null);
    this.instance = null;
    this.history = null;
  }

  toggle(elements) {
    if (this.status === ACTIVE) {
      return this.destroy();
    }

    return this.init(elements);
  }
}

export default TouchBar;
