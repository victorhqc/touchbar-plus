import { CompositeDisposable, Panel } from 'atom';
import debounce from 'lodash/debounce';
import { createMemoryHistory } from 'history';
import TouchbarPlusView from './touchbar-plus-view';
import { TouchBar, navigateByActivePane } from './touchbar';
import { logger } from './utils';

class TouchBarPlus {
  private touchbarPlusView: TouchbarPlusView | null;
  private modalPanel: Panel | null;
  private subscriptions: CompositeDisposable | null;
  private touchbar: TouchBar | null;

  constructor() {
    this.touchbarPlusView = null;
    this.modalPanel = null;
    this.subscriptions = null;
    this.touchbar = null;
  }

  activate() {
    logger.debug('Activating');

    this.touchbarPlusView = new TouchbarPlusView();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.getTouchBarPlusView().getElement(),
      visible: false,
    });

    const history = createMemoryHistory();

    this.touchbar = new TouchBar(history);

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'touchbar-plus:toggle': () => this.toggle(),
      }),
    );

    // Register subscription for active PaneItem
    this.subscriptions.add(
      atom.workspace.observeActivePaneItem(
        debounce(item => navigateByActivePane(history, item), 50, {
          leading: false,
          trailing: true,
        }),
      ),
    );

    this.subscriptions.add(this.touchbar);

    this.touchbar.init();
  }

  deactivate() {
    logger.debug('Deactivating');

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
