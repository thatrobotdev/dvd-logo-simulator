export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  synth: any; // TODO,
  isAudioReady: boolean;
  debug?: boolean;
}

export type Draw = (params: DrawParams) => void;
