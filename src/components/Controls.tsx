import {Button, FormControlLabel, Switch} from "@mui/material";
import styled from "styled-components";

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;
`;

interface Props {
  spawnN: (n: number) => void;
  isDetectCollisions: boolean;
  toggleDetectCollisions: () => void;
}

const Controls = ({
  spawnN,
  isDetectCollisions,
  toggleDetectCollisions,
}: Props) => {
  return (
    <ControlsContainer>
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
