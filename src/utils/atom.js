'use babel';

export function getActiveElement() {
  if (document.activeElement === document.body) {
    return atom.views.getView(atom.workspace);
  }

  return document.activeElement;
};

export function executeAtomCommand(command) {
  const activeElement = getActiveElement();
  atom.commands.dispatch(activeElement, command);
}
