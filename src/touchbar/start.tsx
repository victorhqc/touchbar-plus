import React from 'react';
import { BrowserWindow } from 'electron';
import { History } from 'history';
import { ReactTouchBar, TouchBar } from 'touchbar-electron-renderer';
import { logger } from '../utils';
import Root from './Root';

const { TouchBar: NativeTouchBar } = require('remote');

export default function start(history: History) {
  logger.debug('Boot touchbar renderer');
  const atomWindow = atom.getCurrentWindow() as BrowserWindow;

  ReactTouchBar.render(<Root history={history} />, new TouchBar(atomWindow, NativeTouchBar), () => {
    // Empty function
  });
  logger.debug('Boot touchbar renderer finished');
}
