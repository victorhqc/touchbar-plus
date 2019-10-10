export interface Item {
  constructor: {
    name: string;
  };
  getElement?: () => HTMLElement;
  element?: HTMLElement;
}

export type PaneItem = Item & object;
