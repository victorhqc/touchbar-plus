import { CompositeDisposable, Panel } from 'atom';
import debounce from 'lodash/debounce';
import { createMemoryHistory } from 'history';
import TouchbarPlusView from './touchbar-plus-view';
import { TouchBar, ActivePaneManager } from './touchbar';
import { logger } from './utils';

class TouchBarPlus {
  private touchbarPlusView: TouchbarPlusView | null;
  private modalPanel: Panel | null;
  private subscriptions: CompositeDisposable | null;
  private touchbar: TouchBar | null;
  private activePaneManager: ActivePaneManager | null;

  constructor() {
    this.touchbarPlusView = null;
    this.modalPanel = null;
    this.subscriptions = null;
    this.touchbar = null;
    this.activePaneManager = null;
  }

  activate() {
    logger.debug('Activating');

    this.touchbarPlusView = new TouchbarPlusView();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.getTouchBarPlusView().getElement(),
      visible: false,
    });

    const history = createMemoryHistory();
    this.activePaneManager = new ActivePaneManager(history);
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
        debounce(
          item => {
            this.getActivePaneManager().navigateTo(item);
          },
          10,
          {
            leading: false,
            trailing: true,
          },
        ),
      ),
    );

    this.subscriptions.add(this.touchbar);
    this.subscriptions.add(this.activePaneManager);

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

  getMaybeNullValue<T>(value: T | null): T {
    if (!value) {
      throw new Error(`No ${value} found`);
    }

    return value;
  }

  getSubscriptions() {
    return this.getMaybeNullValue(this.subscriptions);
  }

  getModalPanel() {
    return this.getMaybeNullValue(this.modalPanel);
  }

  getTouchBarPlusView() {
    return this.getMaybeNullValue(this.touchbarPlusView);
  }

  getTouchbar() {
    return this.getMaybeNullValue(this.touchbar);
  }

  getActivePaneManager() {
    return this.getMaybeNullValue(this.activePaneManager);
  }
}

export default new TouchBarPlus();
