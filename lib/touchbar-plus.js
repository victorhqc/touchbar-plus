'use babel';

import { CompositeDisposable } from 'atom';
import TouchbarPlusView from './touchbar-plus-view';
import { TouchBar } from './touchbar';

const elements = {
  TextEditor: [
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
      backgroundColor: '#bb95a4',
      iconColor: '#fff',
      icon: 'NSTouchBarSidebarTemplate',
      click: 'tree-view:toggle',
    },
    {
      type: 'group',
      items: [
        {
          type: 'button',
          label: 'Button 1',
          backgroundColor: '#b3ad99',
        },
        {
          type: 'button',
          label: 'Button 2',
          backgroundColor: '#a3b9b7',
        },
        {
          type: 'button',
          label: 'Button 3',
          backgroundColor: '#b1b1b0',
        },
      ],
    },
  ],
};

export default {

  touchbarPlusView: null,
  modalPanel: null,
  subscriptions: null,
  touchbar: null,
  activePane: null,

  activate(state) {
    this.touchbarPlusView = new TouchbarPlusView(state.touchbarPlusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.touchbarPlusView.getElement(),
      visible: false,
    });
    this.touchbar = new TouchBar();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'touchbar-plus:toggle': () => this.toggle(),
    }));

    // Register subscription for active PaneItem
    this.subscriptions.add(atom.workspace.observeActivePaneItem((item) => {
      // Check if it makes sense to update TouchBar
      if (this.activePane === item.constructor.name) {
        return null;
      }

      this.activePane = item.constructor.name;
      const elementsToRender = elements[this.activePane];

      console.log('ACTIVE PANE ITEM', item);
      console.log('CONSTRUCTOR NAME', item.constructor.name);

      if (!elementsToRender) {
        return this.touchbar.destroy();
      }

      return this.touchbar.init(elementsToRender);
    }));

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
