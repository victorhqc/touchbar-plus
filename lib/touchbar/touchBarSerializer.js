'use babel';

import { app, BrowserWindow, TouchBar as ElectronTouchBar } from 'remote';

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = ElectronTouchBar;

function serializer(elements = []) {
  return elements
    .map((element) => {
      switch (element.type) {
        case 'button':
          return new TouchBarButton(element);
        default:
          return null;
      }
    })
    // Discard any null element
    .filter(element => element);
}

export default serializer;
