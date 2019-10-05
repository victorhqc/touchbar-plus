import { CompositeDisposable, Panel } from 'atom';
import debounce from 'lodash/debounce';
import { createMemoryHistory } from 'history';
import TouchbarPlusView from './touchbar-plus-view';
import {
  TouchBar,
  // getTouchBarButtonsForPane,
  navigateByActivePane,
  // observeAndRenderTouchBarForActivePaneItem,
} from './touchbar';
import defaultButtons from './config-default-buttons';

class TouchBarPlus {
  private touchbarPlusView: TouchbarPlusView | null;
  private modalPanel: Panel | null;
  private subscriptions: CompositeDisposable | null;
  private touchbar: TouchBar | null;
  private activePane: null;
  private config: Config;

  constructor() {
    this.touchbarPlusView = null;
    this.modalPanel = null;
    this.subscriptions = null;
    this.touchbar = null;
    this.activePane = null;

    this.config = {
      items: {
        title: 'TouchBar Items',
        description: 'Serialized TouchBar Items',
        type: 'string',
        default: JSON.stringify(defaultButtons),
      },
    };
  }

  activate() {
    this.touchbarPlusView = new TouchbarPlusView();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.getTouchBarPlusView().getElement(),
      visible: false,
    });

    const history = createMemoryHistory();

    this.touchbar = new TouchBar(history);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'touchbar-plus:toggle': () => this.toggle(),
      }),
    );

    // Register subscription for active PaneItem
    this.subscriptions.add(
      atom.workspace.observeActivePaneItem(
        debounce(
          item => navigateByActivePane(history, item),
          // item => observeAndRenderTouchBarForActivePaneItem(item, this.touchbar),
          50,
          {
            leading: false,
            trailing: true,
          },
        ),
      ),
    );
    // this.subscriptions.add(atom.workspace.observeActivePaneItem(
    //   item => observeAndRenderTouchBarForActivePaneItem(item, this.touchbar),
    // ));

    this.subscriptions.add(this.touchbar);

    this.touchbar.init();
  }

  deactivate() {
    this.getModalPanel().destroy();
    this.getSubscriptions().dispose();
    this.getTouchBarPlusView().destroy();
  }

  serialize() {
    return {
      touchbarPlusViewState: this.getTouchBarPlusView().serialize(),
    };
  }

  toggle() {
    this.getTouchbar().toggle();
  }

  getSubscriptions() {
    if (!this.subscriptions) {
      throw new Error('No subscriptions found');
    }

    return this.subscriptions;
  }

  getModalPanel() {
    if (!this.modalPanel) {
      throw new Error('No modalPanel found');
    }

    return this.modalPanel;
  }

  getTouchBarPlusView() {
    if (!this.touchbarPlusView) {
      throw new Error('No touchbarPlusView found');
    }

    return this.touchbarPlusView;
  }

  getTouchbar() {
    if (!this.touchbar) {
      throw new Error('No touchbar found');
    }

    return this.touchbar;
  }
}

export default new TouchBarPlus();

// interface TouchBarPlus {
//   subscriptions: CompositeDisposable | null
//   modalPanel: Panel | null,
//   touchbarPlusView: null,
//   touchbar: null,
//   activePane: null,
//   config: Config
// }

interface Config {
  items: object;
}
