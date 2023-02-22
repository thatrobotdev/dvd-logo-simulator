import {MutableRefObject, useRef} from "react";
import {Sampler} from "tone";
import {DVDLogo} from "./DVDLogo";

export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  sampler: Sampler;
  DEBUG?: boolean;
  DRAW_RECT?: boolean;
}

export class Animation {
  logos: DVDLogo[];
  distancePerStep = 5;
  prevDistancePerStep = 5;
  frameCount = 0;

  constructor() {
    this.logos = [];
  }
}

interface params {
  logoRef: MutableRefObject<null>;
  isLoading: boolean;
}

const useLogoAnimation = (params: params) => {
  const {logoRef, isLoading} = params;

  const animation = useRef(new Animation()).current;

  const spawn = () => {
    animation.logos.push(new DVDLogo(animation.distancePerStep, logoRef));
  };

  const draw = (params: DrawParams) => {
    if (isLoading) return;

    const {ctx, sampler, DEBUG, DRAW_RECT} = params;

    // Setup
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = DRAW_RECT ? "white" : "transparent";

    // Add the initial logo
    if (animation.frameCount === 0) {
      animation.logos.push(new DVDLogo(animation.distancePerStep, logoRef));
    }

    animation.logos.forEach((logo) => {
      logo.step(
        animation.logos,
        animation.distancePerStep,
        animation.prevDistancePerStep,
        animation.frameCount,
        ctx,
        sampler
      );
    });

    if (DEBUG) {
      console.log(animation.logos);
    }

    animation.prevDistancePerStep = animation.distancePerStep;

    animation.frameCount++;
  };

  return {addLogo: spawn, draw};
};

export default useLogoAnimation;
