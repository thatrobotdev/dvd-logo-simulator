import {MutableRefObject, useRef} from "react";
import {DVDLogo} from "./DVDLogo";
import {DrawParams} from "./types";

export class Animation {
  logos: DVDLogo[];
  distancePerStep = 5;
  prevDistancePerStep = 5;
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

  const spawn = () => {
    animation.logos.push(new DVDLogo(animation.distancePerStep, logoRef));
  };

  const draw = (params: DrawParams) => {
    if (isImgLoading) return;

    const {ctx, synth, isAudioReady, debug} = params;

    // Add the first circle
    if (animation.frameCount === 0) {
      spawn();
    }

    animation.logos.forEach((logo) => {
      logo.step(
        animation.distancePerStep,
        animation.prevDistancePerStep,
        animation.frameCount,
        ctx,
        isAudioReady,
        synth
      );
    });

    if (debug) {
      console.log(animation.logos[0]);
    }

    animation.prevDistancePerStep = animation.distancePerStep;

    animation.frameCount++;
  };

  return {addLogo: spawn, draw};
};

export default useLogoAnimation;
