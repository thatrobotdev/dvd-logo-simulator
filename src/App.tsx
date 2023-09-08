import {Skeleton} from "@mui/material";
import {useState} from "react";
import styled from "styled-components";
import Canvas from "./classes/Canvas";
import Controls from "./components/Controls";
import MuteButton from "./components/MuteButton";
import SourceImage from "./components/SourceImage";
import useLogoAnimation from "./hooks/useLogoAnimation";
import useLogoImage from "./hooks/useLogoImage";
import useSampler from "./hooks/useSampler";

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

  const [isDetectCollisions, setIsDetectCollisions] = useState(true);
  const [speed, setSpeed] = useState(20);

  const {samplerRef, isSoundLoading, isMuted, toggleMute} = useSampler();

  const {logoRef, isImgLoading, onImgLoad} = useLogoImage();

  const isLoading = isSoundLoading || isImgLoading;

  const {draw, spawnN} = useLogoAnimation({
    logoRef,
    isLoading,
    isDetectCollisions,
    distancePerStep: speed / 10,
  });

  const toggleDetectCollisions = () => setIsDetectCollisions((prev) => !prev);

  const searchParams = new URLSearchParams(
    window.location.search.replace("?", "")
  );
  const isIframe = searchParams.get("iframe") === "true";

  return (
    <AppContainer isIframe={isIframe}>
      <CanvasContainer>
        {isLoading && (
          <Skeleton variant="rectangular" width="100%" height="500px" />
        )}
        <Canvas
          draw={draw}
          params={{
            DEBUG,
            DRAW_RECT,
            canvasWidth: "100%",
            canvasHeight: "60vh",
          }}
          sampler={samplerRef.current}
        />
        <MuteButton
          toggleMute={toggleMute}
          isMuted={isMuted}
          isSoundLoading={isSoundLoading}
        />
      </CanvasContainer>
      <marquee style={{fontSize: 50}}>Scan the QR code to sign up for CSHS!!!</marquee>
      <marquee style={{fontSize: 50}}>(or you can go to url.peaktopeak.org/builder)</marquee>
      <Controls
        spawnN={spawnN}
        isDetectCollisions={isDetectCollisions}
        toggleDetectCollisions={toggleDetectCollisions}
        setSpeed={setSpeed}
        isIframe={isIframe}
      />
      <SourceImage logoRef={logoRef} onImgLoad={onImgLoad} />
    </AppContainer>
  );
};

export default App;
