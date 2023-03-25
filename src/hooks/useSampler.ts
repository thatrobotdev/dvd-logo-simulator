import {useEffect, useRef, useState} from "react";
import * as Tone from "tone";
import {Sampler} from "tone";
import click from "../audio/click.wav";
import click2 from "../audio/click2.wav";

const useSampler = () => {
  const [isSoundLoading, setIsSoundLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const samplerRef = useRef(
    new Sampler(
      {C4: click2, D4: click},
      {
        onload: () => {
          setIsSoundLoading(false);
        },
      }
    ).toDestination()
  );

  const toggleMute = async () => {
    if (isSoundLoading) {
      await Tone.start();
      setIsSoundLoading(false);
    }
    setIsMuted((prevState) => !prevState);
  };

  useEffect(() => {
    isMuted ? (Tone.Destination.mute = true) : (Tone.Destination.mute = false);
  }, [isMuted]);

  return {samplerRef, isSoundLoading, isMuted, toggleMute};
};

export default useSampler;
