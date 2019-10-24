export interface Item {
  constructor: {
    name: string;
  };
  getElement?: () => HTMLElement;
  element?: HTMLElement;
}

export type PaneItem = Item & object;

export interface Disposable {
  isDisposable: () => boolean;
  dispose: () => void;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Optionalize<T extends K, K> = Omit<T, keyof K>;
