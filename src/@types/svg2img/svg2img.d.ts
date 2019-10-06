declare module 'svg2img' {
  export default function svg2img(svg: string, sizes: Sizes, callback: Callback): void;

  type Callback = (error: Error | null | undefined, buffer: Buffer) => void;

  interface Sizes {
    width: number;
    height: number;
  }
}
