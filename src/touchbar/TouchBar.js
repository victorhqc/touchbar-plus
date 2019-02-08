/* eslint import/no-named-as-default-member: 0 */
/* eslint import/no-named-as-default: 0 */

// import { TouchBar as ElectronTouchBar } from 'remote';
// import { touchBarSerializer } from '../serializers';
// import demo from '../components/demo';
import start from './start';

const ACTIVE = 'acticve';
const INACTIVE = 'inactive';

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
