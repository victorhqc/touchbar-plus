'use babel';

import { CompositeDisposable } from 'atom';
import TouchbarPlusView from './touchbar-plus-view';
import { TouchBar } from './touchbar';

const elements = [
  {
    type: 'button',
    label: '😀 Hello World',
    backgroundColor: '#d9b1b1',
    click: (e) => {
      console.log('e', e);
    },
  },
  {
    type: 'button',
    label: 'Toggle sidebar',
    iconPosition: 'left',
    iconColor: '#fff',
    icon: 'NSTouchBarSidebarTemplate',
    click: 'tree-view:toggle',
  },
];

export default {

  touchbarPlusView: null,
  modalPanel: null,
  subscriptions: null,
  touchbar: null,

  activate(state) {
    this.touchbarPlusView = new TouchbarPlusView(state.touchbarPlusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.touchbarPlusView.getElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'touchbar-plus:toggle': () => this.toggle(),
    }));

    this.touchbar = new TouchBar(elements);
    this.subscriptions.add(this.touchbar);
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.touchbarPlusView.destroy();
  },

  serialize() {
    return {
      touchbarPlusViewState: this.touchbarPlusView.serialize(),
    };
  },

  toggle() {
    this.touchbar.toggle(elements);
  },

};
