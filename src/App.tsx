import Canvas from "./Canvas";
import useLogoAnimation from "./useLogoAnimation";
import DVDlogo from "./DVDLogo.png";
import {useEffect, useRef, useState} from "react";
import {Sampler} from "tone";
import click from "./click.wav";
import click2 from "./click2.wav";
import * as Tone from "tone";
import IconButton from "@mui/material/IconButton";
import VolumeOff from "@mui/icons-material/VolumeOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import {Button, FormControlLabel, Switch} from "@mui/material";
import styled from "styled-components";

const CANVAS_WIDTH = "500px";
const CANVAS_HEIGHT = "500px";

const CanvasContainer = styled.div`
  height: ${CANVAS_HEIGHT};
  width: ${CANVAS_WIDTH};
  position: relative;
  margin: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-left: 1rem;
`;

const MuteButton = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  color: white;
`;

const App = () => {
  const DEBUG = false;
  const DRAW_RECT = false;

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

  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isSoundLoading, setIsSoundLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isDetectCollisions, setIsDetectCollisions] = useState(false);

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

  const {addLogo, draw} = useLogoAnimation({
    logoRef,
    isLoading: isImgLoading || isSoundLoading,
    isDetectCollisions,
  });

  const spawnN = (n: number) => {
    new Array(n).fill(null).forEach(() => addLogo());
  };

  useEffect(() => {
    isMuted ? (Tone.Destination.mute = true) : (Tone.Destination.mute = false);
  }, [isMuted]);

  return (
    <>
      <CanvasContainer>
        <Canvas
          draw={draw}
          params={{
            DEBUG,
            DRAW_RECT,
            canvasWidth: CANVAS_WIDTH,
            canvasHeight: CANVAS_HEIGHT,
          }}
          sampler={samplerRef.current}
        />
        <MuteButton
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </MuteButton>
      </CanvasContainer>
      <Buttons>
        <Button onClick={addLogo} variant="contained">
          Add logo
        </Button>
        <Button onClick={() => spawnN(5)} variant="contained">
          Add 5 logos
        </Button>
        <FormControlLabel
          control={
            <Switch
              checked={isDetectCollisions}
              onChange={toggleDetectCollisions}
            />
          }
          label="Detect collisions between logos (experimental)"
        />
      </Buttons>
      <div style={{display: "none"}}>
        {/* Alt not needed, img is just a source for the canvas */}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          id="DVDlogo"
          src={DVDlogo}
          width="128"
          height="62"
          ref={logoRef}
          onLoad={onImgLoad}
        />
      </div>
    </>
  );
};

export default App;
