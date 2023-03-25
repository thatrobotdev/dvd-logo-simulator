import {MutableRefObject} from "react";
import DVDlogo from "./DVDLogo.png";

interface Props {
  logoRef: MutableRefObject<null>;
  onImgLoad: () => void;
}

const SourceImage = ({logoRef, onImgLoad}: Props) => {
  return (
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
  );
};

export default SourceImage;
