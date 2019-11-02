import { ViewModel } from 'atom';
import start from './config/start';

export default class TouchbarPlusView implements ViewModel {
  private element: Element;

  constructor() {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('touchbar-plus');

    start(this.element);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    // do nothing.
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getTitle(): string {
    return 'TouchBar Plus View';
  }

  getElement(): Element {
    return this.element;
  }
}
