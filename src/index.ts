import { CompositeDisposable } from 'atom';
import debounce from 'lodash/debounce';
import { createMemoryHistory } from 'history';
import { TouchBar } from './touchbar';
import { logger, gePaneItemName, getMaybeNullValue } from './utils';

class TouchBarPlus {
  private subscriptions: CompositeDisposable | null;
  private touchbar: TouchBar | null;

  constructor() {
    this.subscriptions = null;
    this.touchbar = null;
  }

  activate() {
    logger.debug('Activate');

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
      atom.workspace.observeActivePaneItem(
        debounce(
          (item) => {
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

    this.getSubscriptions().dispose();
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

  getTouchbar() {
    return getMaybeNullValue(this.touchbar);
  }
}

export default new TouchBarPlus();
