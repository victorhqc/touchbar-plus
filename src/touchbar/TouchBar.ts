import { History } from 'history';
import { Disposable } from '../@types';
import start from './start';

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

class TouchBar implements Disposable {
  private history: History | null;
  private status: Status;

  constructor(history: History) {
    this.history = null;
    this.status = Status.INACTIVE;

    this.setHistory(history);
  }

  setHistory(history: History) {
    this.history = history;
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
