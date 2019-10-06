export interface Item {
  constructor: {
    name: string;
  };
  getElement?: () => HTMLElement;
  element?: HTMLElement;
}

export type ItemPane = Item & object;
