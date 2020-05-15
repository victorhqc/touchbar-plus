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

  const commands = command.split('|');
  commands.forEach((command) => atom.commands.dispatch(activeElement, command));
}
