export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  synth: any; // TODO,
  isAudioReady: boolean;
}

export type Draw = (params: DrawParams) => void;
export interface Timers {
  animationFrameId: number;
}
