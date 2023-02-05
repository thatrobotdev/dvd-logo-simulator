import {MutableRefObject, useRef} from "react";
import {DVDLogo} from "./DVDLogo";

export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  synth: any; // TODO,
  isAudioReady: boolean;
  DEBUG?: boolean;
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

    const {ctx, synth, isAudioReady, DEBUG} = params;

    // Add the initial logo
    if (animation.frameCount === 0) {
      // const left = [animation.distancePerStep, logoRef, 200, 0, 0, 8, "TOP"];

      // const right = [
      //   animation.distancePerStep,
      //   logoRef,
      //   300,
      //   400,
      //   0,
      //   -8,
      //   "BOTTOM",
      // ];

      animation.logos.push(new DVDLogo(animation.distancePerStep, logoRef));
      // // @ts-expect-error
      // animation.logos.push(new DVDLogo(...right));
    }

    animation.logos.forEach((logo) => {
      logo.step(
        animation.logos,
        animation.distancePerStep,
        animation.prevDistancePerStep,
        animation.frameCount,
        ctx,
        isAudioReady,
        synth
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
