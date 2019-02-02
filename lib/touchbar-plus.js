'use babel';

import TouchbarPlusView from './touchbar-plus-view';
import { CompositeDisposable } from 'atom';

export default {

  touchbarPlusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.touchbarPlusView = new TouchbarPlusView(state.touchbarPlusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.touchbarPlusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'touchbar-plus:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.touchbarPlusView.destroy();
  },

  serialize() {
    return {
      touchbarPlusViewState: this.touchbarPlusView.serialize()
    };
  },

  toggle() {
    console.log('TouchbarPlus was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
