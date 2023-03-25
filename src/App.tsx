import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import * as Tone from "tone";
import {Sampler} from "tone";
import Canvas from "./Canvas";
import click from "./click.wav";
import click2 from "./click2.wav";
import Author from "./components/Author";
import Controls from "./components/Controls";
import MuteButton from "./components/MuteButton";
import SourceImage from "./components/SourceImage";
import useLogoAnimation from "./useLogoAnimation";

interface AppContainerProps {
  isIframe: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  margin: ${({isIframe}) => (isIframe ? "0 0 1rem 0" : "1rem")};
`;

const CanvasContainer = styled.div`
  position: relative;
`;

const App = () => {
  const DEBUG = false;
  const DRAW_RECT = false;

  // States
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isSoundLoading, setIsSoundLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isDetectCollisions, setIsDetectCollisions] = useState(false);

  // Refs
  const logoRef = useRef(null);
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

  // Hooks
  const {addLogo, draw} = useLogoAnimation({
    logoRef,
    isLoading: isImgLoading || isSoundLoading,
    isDetectCollisions,
  });

  // Handlers
  const onImgLoad = () => {
    setIsImgLoading(false);
  };

  const toggleMute = async () => {
    if (isSoundLoading) {
      await Tone.start();
      setIsSoundLoading(false);
    }
    setIsMuted((prevState) => !prevState);
  };

  const toggleDetectCollisions = () => setIsDetectCollisions((prev) => !prev);

  const spawnN = (n: number) => {
    new Array(n).fill(null).forEach(() => addLogo());
  };

  // Side-effects
  useEffect(() => {
    isMuted ? (Tone.Destination.mute = true) : (Tone.Destination.mute = false);
  }, [isMuted]);

  const searchParams = new URLSearchParams(
    window.location.search.replace("?", "")
  );
  const isIframe = searchParams.get("iframe") === "true";

  return (
    <AppContainer isIframe={isIframe}>
      <CanvasContainer>
        <Canvas
          draw={draw}
          params={{
            DEBUG,
            DRAW_RECT,
            canvasWidth: "100%",
            canvasHeight: "500px",
          }}
          sampler={samplerRef.current}
        />
        <MuteButton toggleMute={toggleMute} isMuted={isMuted} />
      </CanvasContainer>
      <Controls
        addLogo={addLogo}
        spawnN={spawnN}
        isDetectCollisions={isDetectCollisions}
        toggleDetectCollisions={toggleDetectCollisions}
      />

      {!isIframe ? <Author /> : null}
      <SourceImage logoRef={logoRef} onImgLoad={onImgLoad} />
    </AppContainer>
  );
};

export default App;
