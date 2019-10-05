import start from './start';
import { History } from 'history';

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

class TouchBar {
  private history: History | null;
  private status: Status;

  constructor(history: History) {
    this.history = history;
    this.status = Status.INACTIVE;
  }

  isDisposable() {
    return true;
  }

  dispose() {
    this.destroy();
  }

  init() {
    if (!this.history) {
      throw new Error('History is not set');
    }

    this.status = Status.ACTIVE;
    start(this.history);
  }

  destroy() {
    this.status = Status.INACTIVE;

    const atomWindow = atom.getCurrentWindow() as object & WindowWithTouchBar;
    if (!atomWindow) {
      return;
    }

    atomWindow.setTouchBar(null);
    this.history = null;
  }

  toggle() {
    if (this.status === Status.ACTIVE) {
      return this.destroy();
    }

    return this.init();
  }
}

export default TouchBar;

interface WindowWithTouchBar {
  setTouchBar: (arg: null) => void;
}
