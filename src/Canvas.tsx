import {useEffect, useRef} from "react";
import {Draw, Timers} from "./types";

interface Props {
  draw: Draw;
}

const Canvas = (props: Props) => {
  const {draw, ...rest} = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<Timers>({
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
    const animation = animationRef.current;

    resizeCanvas(canvas);

    const tick = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw({
        ctx,
        synth: null,
        isAudioReady: false,
      });

      animation.animationFrameId = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.cancelAnimationFrame(animation.animationFrameId);
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
