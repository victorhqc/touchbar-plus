import { CompositeDisposable } from 'atom';
import debounce from 'lodash/debounce';
import TouchbarPlusView from './touchbar-plus-view';
import {
  TouchBar,
  getTouchBarButtonsForPane,
  observeAndRenderTouchBarForActivePaneItem,
} from './touchbar';
import defaultButtons from './config-default-buttons';

export default {

  touchbarPlusView: null,
  modalPanel: null,
  subscriptions: null,
  touchbar: null,
  activePane: null,

  config: {
    items: {
      title: 'TouchBar Items',
      description: 'Serialized TouchBar Items',
      type: 'string',
      default: JSON.stringify(defaultButtons),
    },
  },

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
    this.subscriptions.add(atom.workspace.observeActivePaneItem(
      debounce(
        item => observeAndRenderTouchBarForActivePaneItem(item, this.touchbar),
        150,
        {
          leading: false,
          trailing: true,
        },
      ),
    ));
    // this.subscriptions.add(atom.workspace.observeActivePaneItem(
    //   item => observeAndRenderTouchBarForActivePaneItem(item, this.touchbar),
    // ));

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
    const item = atom.workspace.getActivePaneItem();
    this.touchbar.toggle(getTouchBarButtonsForPane(item));
  },

};
