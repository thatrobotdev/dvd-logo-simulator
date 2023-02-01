export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  elapsed: number;
  synth: any; // TODO,
  isAudioReady: boolean;
}

export type Draw = (params: DrawParams) => void;
export interface Timers {
  start: number | null;
  previousTimestamp: number | null;
  elapsed: number | null;
  animationFrameId: number;
}
