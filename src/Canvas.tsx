import {useEffect, useRef} from "react";
import {Draw} from "./types";

interface Props {
  draw: Draw;
  debug: boolean;
}

const Canvas = (props: Props) => {
  const {draw, debug, ...rest} = props;
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
      draw({
        ctx,
        synth: null,
        isAudioReady: false,
        debug,
      });

      if (!debug) {
        requestIdRef.current = window.requestAnimationFrame(step);
      }
    };

    step();

    return () => {
      window.cancelAnimationFrame(requestIdRef.current);
    };
  }, [debug, draw]);

  // For debugging purposes
  const manualStep = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    draw({
      ctx,
      synth: null,
      isAudioReady: false,
      debug,
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
      {debug ? <button onClick={manualStep}>STEP</button> : null}
    </>
  );
};

export default Canvas;
