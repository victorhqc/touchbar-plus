import { CompositeDisposable, Panel } from 'atom';
import debounce from 'lodash/debounce';
import { createMemoryHistory } from 'history';
import TouchbarPlusView from './touchbar-plus-view';
import { TouchBar } from './touchbar';
import { logger, gePaneItemName } from './utils';
import treeView from './helpers/treeViewSingleton';
import { TreeView } from './@types';

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
    logger.debug('Activate');

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
        debounce(
          item => {
            const name = gePaneItemName(item);
            logger.debug(`Navigate to route /${name}`);
            history.push(`/${name}`);
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

    this.touchbar.init();
  }

  deactivate() {
    logger.debug('Deactivating');

    this.getModalPanel().destroy();
    this.getSubscriptions().dispose();
    this.getTouchBarPlusView().destroy();
  }

  consumeTreeView(tree: TreeView) {
    treeView.setTreeView(tree);
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
}

export default new TouchBarPlus();
