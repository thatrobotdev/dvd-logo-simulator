import {MutableRefObject, useRef} from "react";
import {DVDLogo} from "./DVDLogo";
import {DrawParams} from "./types";

export class Animation {
  logos: DVDLogo[];
  prevElapsedTime = 0;
  timeSinceLastStep = 0;
  speed = 500;
  distancePerStep = 0;
  prevDistancePerStep = 0;
  frameCount = 0;

  constructor() {
    this.logos = [];
  }
}

const useLogoAnimation = (
  logoRef: MutableRefObject<null>,
  isImgLoading: boolean
) => {
  const animation = useRef(new Animation()).current;

  const addLogo = () => {
    animation.logos.push(new DVDLogo(animation.distancePerStep, logoRef));
  };

  const draw = (params: DrawParams) => {
    if (isImgLoading) return;

    const {ctx, elapsed, synth, isAudioReady} = params;

    // Skip the first step, because >1 step is needed to calculate timeSinceLastStep
    if (animation.frameCount === 0) {
      animation.frameCount++;
      return;
    }

    // Keep track of time between steps
    animation.timeSinceLastStep = elapsed - animation.prevElapsedTime;

    // Calculate how far the circles should move on this step
    animation.distancePerStep =
      (animation.timeSinceLastStep / 1000) * animation.speed;

    // Add the first circle
    if (animation.frameCount === 2) {
      addLogo();
    }

    animation.logos.forEach((circle) => {
      circle.step(
        animation.distancePerStep,
        animation.prevDistancePerStep,
        ctx,
        isAudioReady,
        synth
      );

      animation.prevDistancePerStep = animation.distancePerStep;
    });

    animation.prevElapsedTime = elapsed;
    animation.frameCount++;
  };

  return {addLogo, draw};
};

export default useLogoAnimation;
