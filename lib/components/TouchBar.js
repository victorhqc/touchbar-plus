'use babel';

import { TouchBar as NativeTouchBar } from 'remote';

class TouchBar {
  constructor(children = []) {
    this.children = children;
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    this.children = this.children
      .filter(childElement => childElement !== child);
  }

  createInstance() {
    return new NativeTouchBar(this.children);
  }
}

export default TouchBar;
