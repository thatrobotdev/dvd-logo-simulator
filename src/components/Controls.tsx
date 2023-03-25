import {Button, FormControlLabel, Slider, Switch} from "@mui/material";
import styled from "styled-components";

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;
  margin-left: 0.2rem;
  width: 50%;
`;

interface Props {
  spawnN: (n: number) => void;
  isDetectCollisions: boolean;
  toggleDetectCollisions: () => void;
  speed: number;
  handleSpeedChange: (event: Event, value: number) => void;
}

const Controls = ({
  spawnN,
  isDetectCollisions,
  toggleDetectCollisions,
  speed,
  handleSpeedChange,
}: Props) => {
  return (
    <ControlsContainer>
      <Slider
        aria-label="Speed"
        value={speed}
        // TODO
        // @ts-expect-error
        onChange={handleSpeedChange}
        min={1}
        max={100}
        defaultValue={1}
      />
      <Button onClick={() => spawnN(1)} variant="contained">
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
    </ControlsContainer>
  );
};

export default Controls;
