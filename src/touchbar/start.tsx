import React from 'react';
import { BrowserWindow, remote } from 'electron';
import { History } from 'history';
import { ReactTouchBar, TouchBar } from 'touchbar-electron-renderer';
import Root from './Root';
const { TouchBar: NativeTouchBar } = remote;

export default function start(history: History) {
  console.time('USING-REACT-RENDERER');
  const atomWindow = atom.getCurrentWindow() as BrowserWindow;

  ReactTouchBar.render(
    <Root history={history} />,
    new TouchBar(atomWindow, NativeTouchBar),
    () => {},
  );
  console.timeEnd('USING-REACT-RENDERER');
}
