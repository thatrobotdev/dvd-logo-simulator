import {Button, FormControlLabel, Slider, Switch} from "@mui/material";
import {useState} from "react";
import styled from "styled-components";

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 3.5rem;
  margin-left: 0.2rem;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

interface Props {
  spawnN: (n: number) => void;
  isDetectCollisions: boolean;
  toggleDetectCollisions: () => void;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}

const Controls = ({
  spawnN,
  isDetectCollisions,
  toggleDetectCollisions,
  setSpeed,
}: Props) => {
  const [sliderValue, setSliderValue] = useState(20);

  return (
    <ControlsContainer>
      <Slider
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
      <Buttons>
        <Button onClick={() => spawnN(1)} variant="contained">
          Add logo
        </Button>
        <Button onClick={() => spawnN(5)} variant="contained">
          Add 5 logos
        </Button>
      </Buttons>
      <FormControlLabel
        control={
          <Switch
            checked={isDetectCollisions}
            onChange={toggleDetectCollisions}
          />
        }
        label="Detect collisions between logos (experimental)"
      />
    </ControlsContainer>
  );
};

export default Controls;
