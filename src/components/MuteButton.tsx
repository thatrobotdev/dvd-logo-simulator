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

const P = styled.p`
  position: absolute;
  right: 0.9rem;
  bottom: -2.3rem;
`;

interface Props {
  toggleMute: () => void;
  isMuted: boolean;
  isSoundLoading: boolean;
}

const MuteButton = ({toggleMute, isMuted, isSoundLoading}: Props) => {
  if (isSoundLoading) return null;

  return (
    <>
      <ButtonElement
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeOff /> : <VolumeUp />}
      </ButtonElement>
      <P>Click for sound ⬆️</P>
    </>
  );
};

export default MuteButton;
