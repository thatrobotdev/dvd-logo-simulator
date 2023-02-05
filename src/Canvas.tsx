import {useEffect, useRef} from "react";
import {DrawParams} from "./useLogoAnimation";

interface Props {
  draw: (params: DrawParams) => void;
  params: {
    DEBUG: boolean;
    DRAW_RECT: boolean;
  };
}

const Canvas = (props: Props) => {
  const {
    draw,
    params: {DEBUG, DRAW_RECT},
    ...rest
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef(0);

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

    resizeCanvas(canvas);

    const step = () => {
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = DRAW_RECT ? "white" : "transparent";
      draw({
        ctx,
        synth: null,
        isAudioReady: false,
        DEBUG,
      });

      if (!DEBUG) {
        requestIdRef.current = window.requestAnimationFrame(step);
      }
    };

    step();

    return () => {
      window.cancelAnimationFrame(requestIdRef.current);
    };
  }, [DEBUG, DRAW_RECT, draw]);

  // For debugging purposes
  const manualStep = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = DRAW_RECT ? "white" : "transparent";
    draw({
      ctx,
      synth: null,
      isAudioReady: false,
      DEBUG,
    });
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        {...rest}
        style={{width: 500, height: 500, border: "1px solid black"}}
      >
        <p>Bouncing DVD Logo Simulator</p>
      </canvas>
      {DEBUG ? <button onClick={manualStep}>STEP</button> : null}
    </>
  );
};

export default Canvas;
