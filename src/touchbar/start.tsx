import React from 'react';
import { BrowserWindow, TouchBar as NativeTouchBar } from 'electron';
import { History } from 'history';
import { ReactTouchBar, TouchBar } from 'touchbar-electron-renderer';
import Root from './Root';

export default function start(history: History) {
  console.time('USING-REACT-RENDERER');
  const atomWindow = atom.getCurrentWindow() as BrowserWindow;

  const result = ReactTouchBar.render(
    <Root history={history} />,
    new TouchBar(atomWindow, NativeTouchBar),
    () => {},
  );
  console.timeEnd('USING-REACT-RENDERER');
  return result;
}