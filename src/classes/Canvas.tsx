import {useEffect, useRef} from "react";
import {Sampler} from "tone";
import {DrawParams} from "../hooks/useLogoAnimation";

interface Props {
  draw: (params: DrawParams) => void;
  sampler: Sampler;
  params: {
    DEBUG: boolean;
    DRAW_RECT: boolean;
    canvasWidth: string;
    canvasHeight: string;
  };
}

const Canvas = (props: Props) => {
  const {
    draw,
    sampler,
    params: {DEBUG, DRAW_RECT, canvasHeight, canvasWidth},
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
        style={{width: canvasWidth, height: canvasHeight}}
      >
        <p>Bouncing DVD Logo Simulator</p>
      </canvas>
      {DEBUG ? <button onClick={manualStep}>STEP</button> : null}
    </>
  );
};

export default Canvas;
