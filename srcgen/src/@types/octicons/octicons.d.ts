declare module 'octicons' {
  // const octicons: Octicons = octicons;

  export interface Octicons {
    [name: string]: Octicon;
  }

  const octicons: Octicons;
  export default octicons;

  export interface Octicon {
    width: number;
    height: number;
    toSVG: (args?: ToSVGOptions) => string;
  }

  export interface ToSVGOptions {
    fill?: string;
  }
}
