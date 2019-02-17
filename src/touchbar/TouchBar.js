'use babel';

import start from './start';

const ACTIVE = 'acticve';
const INACTIVE = 'inactive';

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
