import { ViewModel } from 'atom';

export default class TouchbarPlusView implements ViewModel {
  private element: Element;

  constructor() {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('touchbar-plus');

    // Create message element
    const message = document.createElement('div');
    message.textContent = "The TouchbarPlus package is Alive! It's ALIVE!";
    message.classList.add('message');
    this.element.appendChild(message);
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
