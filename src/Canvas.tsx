import {useEffect, useRef} from "react";
import {Draw} from "./types";

interface Props {
  draw: Draw;
}

const Canvas = (props: Props) => {
  const {draw, ...rest} = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resizeCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) => {
    const {width, height} = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
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

    resizeCanvas(canvas, ctx);

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      draw(ctx, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
      style={{width: "100vw", height: "100vh"}}
    />
  );
};

export default Canvas;
