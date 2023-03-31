import {Button, FormControlLabel, Slider, Switch} from "@mui/material";
import {useState} from "react";
import styled from "styled-components";
import Author from "./Author";

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 3.5rem auto 0;
  width: 95%;
`;

const SliderContainer = styled.div`
  width: 100%;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

interface Props {
  spawnN: (n: number) => void;
  isDetectCollisions: boolean;
  toggleDetectCollisions: () => void;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  isIframe: boolean;
}

const Controls = ({
  spawnN,
  isDetectCollisions,
  toggleDetectCollisions,
  setSpeed,
  isIframe,
}: Props) => {
  const [sliderValue, setSliderValue] = useState(20);

  return (
    <ControlsContainer>
      <SliderContainer>
        <p>Animation speed</p>
        <Slider
          className="slider"
          aria-label="Speed"
          value={sliderValue}
          // @ts-expect-error
          onChange={(e, value) => setSliderValue(value)}
          // @ts-expect-error
          onChangeCommitted={(e, value) => setSpeed(value)}
          min={1}
          max={100}
          defaultValue={20}
        />
      </SliderContainer>

      <Flex>
        <Button onClick={() => spawnN(1)} variant="contained">
          Add logo
        </Button>
        <Button onClick={() => spawnN(5)} variant="contained">
          Add 5 logos
        </Button>
      </Flex>
      <FormControlLabel
        control={
          <Switch
            checked={isDetectCollisions}
            onChange={toggleDetectCollisions}
          />
        }
        label="Logos bounce off each other (experimental)"
      />
      {!isIframe ? <Author /> : null}
    </ControlsContainer>
  );
};

export default Controls;
