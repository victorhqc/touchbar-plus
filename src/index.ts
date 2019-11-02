import { CompositeDisposable, Disposable } from 'atom';
import debounce from 'lodash/debounce';
import { createMemoryHistory } from 'history';
import TouchbarPlusView from './touchbar-plus-view';
import { TouchBar } from './touchbar';
import { logger, gePaneItemName, getMaybeNullValue } from './utils';

class TouchBarPlus {
  private touchbarPlusView: TouchbarPlusView | null;
  private subscriptions: CompositeDisposable | null;
  private touchbar: TouchBar | null;

  constructor() {
    this.touchbarPlusView = null;
    this.subscriptions = null;
    this.touchbar = null;
  }

  activate() {
    logger.debug('Activate');

    this.touchbarPlusView = new TouchbarPlusView();

    const history = createMemoryHistory();
    this.touchbar = new TouchBar(history);
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'touchbar-plus:toggle': () => this.toggle(),
      }),
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'touchbar-plus:config': () => this.config(),
      }),
    );

    this.subscriptions.add(
      atom.workspace.addOpener(uri => {
        if (uri !== 'atom://touchbar-plus-view') {
          return;
        }

        return new TouchbarPlusView();
      }),
    );

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

    this.subscriptions.add(
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof TouchbarPlusView) {
            item.destroy();
          }
        });
      }),
    );

    this.subscriptions.add(this.touchbar);
    this.touchbar.init();
  }

  deactivate() {
    logger.debug('Deactivating');

    this.getSubscriptions().dispose();
  }

  serialize() {
    return {
      touchbarPlusViewState: this.getTouchBarPlusView().serialize(),
    };
  }

  toggle() {
    this.getTouchbar().toggle();
  }

  config() {
    atom.workspace.open('atom://touchbar-plus-view');
  }

  getSubscriptions() {
    return getMaybeNullValue(this.subscriptions);
  }

  getTouchBarPlusView() {
    return getMaybeNullValue(this.touchbarPlusView);
  }

  getTouchbar() {
    return getMaybeNullValue(this.touchbar);
  }
}

export default new TouchBarPlus();
