import {useEffect, useRef} from "react";
import { Sampler } from "tone";
import {DrawParams} from "./useLogoAnimation";

interface Props {
  draw: (params: DrawParams) => void;
  sampler: Sampler;
  params: {
    DEBUG: boolean;
    DRAW_RECT: boolean;
  };
}

const Canvas = (props: Props) => {
  const {
    draw,
    sampler,
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
      draw({
        ctx,
        sampler,
        DEBUG,
        DRAW_RECT,
      });

      if (!DEBUG) {
        requestIdRef.current = window.requestAnimationFrame(step);
      }
    };

    step();

    return () => {
      window.cancelAnimationFrame(requestIdRef.current);
    };
  }, [DEBUG, DRAW_RECT, draw, sampler]);

  // For debugging purposes
  const manualStep = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    draw({
      ctx,
      sampler,
      DEBUG,
      DRAW_RECT,
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
