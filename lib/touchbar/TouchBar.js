'use babel';

import { TouchBar as ElectronTouchBar } from 'remote';
import serializer from './touchBarSerializer';

const ACTIVE = 'acticve';
const INACTIVE = 'inactive';

class TouchBar {
  constructor(elements) {
    this.init(elements);
  }

  isDisposable() { return true; } // eslint-disable-line

  dispose() {
    this.destroy();
  }

  init(elements) {
    this.status = ACTIVE;
    this.instance = new ElectronTouchBar(serializer(elements));
    atom.getCurrentWindow().setTouchBar(this.instance);
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
