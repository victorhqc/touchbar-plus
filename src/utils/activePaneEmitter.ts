import EventEmitter from 'events';
import { ItemPane } from '../@types';

export const ACTIVE_PANE_CHANGE = 'active-pane-change';

export class ActivePaneEmitter extends EventEmitter {
  emitActivePaneChange(item: ItemPane | null, routeName: string) {
    this.emit(ACTIVE_PANE_CHANGE, item, routeName);
  }

  onEmitActivePaneChange(cb: Callback) {
    this.on(ACTIVE_PANE_CHANGE, cb);
  }

  removeOnEmitActivePaneChange(cb: Callback) {
    this.removeListener(ACTIVE_PANE_CHANGE, cb);
  }
}

const emitter = new ActivePaneEmitter();

export function getActivePaneEmitter() {
  return emitter;
}

type Callback = (item: ItemPane, routeName: string) => void;
