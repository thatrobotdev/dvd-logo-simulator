export type Draw = (ctx: CanvasRenderingContext2D, elapsed: number) => void;

export interface Timers {
  start: number | null;
  previousTimestamp: number | null;
  elapsed: number | null;
  animationFrameId: number;
}
