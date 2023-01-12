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

  const resizeCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const {width, height} = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      // Using pixel density for scaling ensures animation looks correct on retina displays
      const {devicePixelRatio: ratio = 1} = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.scale(ratio, ratio);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const timers = timersRef.current;

    
    const tick = (timestamp: number) => {
      if (timers.start === null) {
        timers.start = timestamp;
      }
      // Using elapsed time to drive animation ensures consistent speed regardless of screen refresh rate
      timers.elapsed = timestamp - timers.start;
      
      resizeCanvas(canvas, ctx);
      draw(ctx, timers.elapsed);
      timers.animationFrameId = window.requestAnimationFrame(tick);
    };

    tick(0);

    return () => {
      window.cancelAnimationFrame(timers.animationFrameId);
    };
  }, [draw]);

  return (
    <canvas ref={canvasRef} {...rest} style={{width: "100vw", height: "100vh"}}>
      <p>Alt text here</p>
    </canvas>
  );
};

export default Canvas;
