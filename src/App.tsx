import {useState} from "react";
import styled from "styled-components";
import Canvas from "./classes/Canvas";
import Author from "./components/Author";
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

  const [isDetectCollisions, setIsDetectCollisions] = useState(false);

  const {samplerRef, isSoundLoading, isMuted, toggleMute} = useSampler();

  const {logoRef, isImgLoading, onImgLoad} = useLogoImage();

  const {draw, spawnN} = useLogoAnimation({
    logoRef,
    isLoading: isImgLoading || isSoundLoading,
    isDetectCollisions,
  });

  const toggleDetectCollisions = () => setIsDetectCollisions((prev) => !prev);

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
