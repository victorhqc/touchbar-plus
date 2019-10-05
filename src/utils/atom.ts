export function getActiveElement() {
  if (document.activeElement === document.body) {
    return atom.views.getView(atom.workspace);
  }

  return document.activeElement;
}

export function executeAtomCommand(command: string) {
  const activeElement = getActiveElement();
  if (!activeElement) {
    return;
  }

  atom.commands.dispatch(activeElement, command);
}
