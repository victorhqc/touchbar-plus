'use babel';

import { TouchBar as ElectronTouchBar } from 'remote';
import isFunction from 'lodash/isFunction';

import iconSerializer from './iconSerializer';

const {
  TouchBarButton,
} = ElectronTouchBar;

// TODO: Fix me! The current implementation is a workaround.
const getActiveElement = () => {
  if (document.activeElement === document.body) {
    return atom.views.getView(atom.workspace);
  }

  return document.activeElement;
};

/**
 * Parses click property from `string` to an Atom's executable command.
 * If click is a function it leaves it as it was, and it it doesn't exist it doesn't add it.
 * @param {Function|String} click If string, it'll try to execute it as an Atom Command.
 */
const addClickIfNeeded = ({ click }) => {
  if (!click) {
    return {};
  }

  if (isFunction(click)) {
    return {
      click,
    };
  }

  const activeElement = getActiveElement();

  return {
    click: () => atom.commands.dispatch(activeElement, click),
  };
};


export default async function touchBarButtonSerializer({ element }) {
  const iconData = await iconSerializer(element);

  return new TouchBarButton({
    ...element,
    ...addClickIfNeeded(element),
    ...iconData,
  });
}
