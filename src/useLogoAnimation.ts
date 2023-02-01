import {useRef} from "react";
import {Circle} from "./Circle";
import {DrawParams} from "./types";

export class Animation {
  circles: Circle[];
  prevElapsedTime = 0;
  timeSinceLastStep = 0;
  speed = 500;
  distancePerStep = 0;
  prevDistancePerStep = 0;
  frameCount = 0;

  constructor() {
    this.circles = [];
  }
}

const useLogoAnimation = () => {
  const animation = useRef(new Animation()).current;

  const addCircle = () => {
    for (let i = 0; i < 50; i++) {
      animation.circles.push(new Circle(animation.distancePerStep));
    }
  };

  const draw = (params: DrawParams) => {
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
      animation.circles.push(new Circle(animation.distancePerStep));
    }

    animation.circles.forEach((circle) => {
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

  return {addCircle, draw};
};

export default useLogoAnimation;
