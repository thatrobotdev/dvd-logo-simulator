import VolumeOff from "@mui/icons-material/VolumeOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import {IconButton} from "@mui/material";
import styled from "styled-components";

const ButtonElement = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  color: white;
`;

interface Props {
  toggleMute: () => void;
  isMuted: boolean;
}

const MuteButton = ({toggleMute, isMuted}: Props) => {
  return (
    <ButtonElement
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeOff /> : <VolumeUp />}
    </ButtonElement>
  );
};

export default MuteButton;
