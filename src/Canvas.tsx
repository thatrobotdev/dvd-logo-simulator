import {useEffect, useRef} from "react";
import {Draw, Timers} from "./types";

interface Props {
  draw: Draw;
}

const Canvas = (props: Props) => {
  const {draw, ...rest} = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timersRef = useRef<Timers>({
    start: 0,
    previousTimestamp: 0,
    elapsed: 0,
    animationFrameId: 0,
  });

  const resizeCanvas = (canvas: HTMLCanvasElement) => {
    const {width, height} = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const timers = timersRef.current;

    resizeCanvas(canvas);

    const tick = (timestamp: number) => {
      if (timers.start === null) {
        timers.start = timestamp;
      }
      // Using elapsed time to drive animation ensures consistent speed regardless of screen refresh rate
      timers.elapsed = timestamp - timers.start;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw({
        ctx,
        elapsed: timers.elapsed,
        synth: null,
        isAudioReady: false,
      });
      timers.animationFrameId = window.requestAnimationFrame(tick);
    };

    tick(0);

    return () => {
      window.cancelAnimationFrame(timers.animationFrameId);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
      style={{width: 500, height: 500, border: "1px solid black"}}
    >
      <p>Alt text here</p>
    </canvas>
  );
};

export default Canvas;
