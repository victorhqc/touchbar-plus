'use babel';

/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import { TouchBar as NativeTouchBar } from 'remote';
import { ReactTouchBar, TouchBar } from 'touchbar-electron-renderer';
import Root from './Root';

export default function start(history) {
  console.time('USING-REACT-RENDERER');
  const result = ReactTouchBar.render(<Root history={history} />, new TouchBar(atom.getCurrentWindow(), NativeTouchBar));
  console.timeEnd('USING-REACT-RENDERER');
  return result;
}
