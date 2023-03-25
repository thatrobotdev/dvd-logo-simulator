import {MutableRefObject, useRef} from "react";
import {Sampler} from "tone";
import {DVDLogo} from "../classes/DVDLogo";

export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  sampler: Sampler;
  DEBUG?: boolean;
  DRAW_RECT?: boolean;
}

export class Animation {
  logos: DVDLogo[];
  distancePerStep = 1;
  prevDistancePerStep = 1;
  frameCount = 0;

  constructor() {
    this.logos = [];
  }
}

interface params {
  logoRef: MutableRefObject<any[]>;
  isLoading: boolean;
  isDetectCollisions: boolean;
  distancePerStep: number;
}

const useLogoAnimation = (params: params) => {
  const {logoRef, isLoading, isDetectCollisions, distancePerStep} = params;

  const animation = useRef(new Animation()).current;

  animation.distancePerStep = distancePerStep;

  const spawn = () => {
    animation.logos.push(new DVDLogo(animation.distancePerStep, logoRef));
  };

  const spawnN = (n: number) => {
    new Array(n).fill(null).forEach(() => spawn());
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
        sampler,
        isDetectCollisions
      );
    });

    if (DEBUG) {
      console.log(animation.logos);
    }

    animation.prevDistancePerStep = animation.distancePerStep;

    animation.frameCount++;
  };

  return {spawnN, draw};
};

export default useLogoAnimation;
