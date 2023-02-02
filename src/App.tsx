import Canvas from "./Canvas";
import useLogoAnimation from "./useLogoAnimation";
import DVDlogo from "./DVDLogo.png";
import {useRef, useState} from "react";

function App() {
  const logoRef = useRef(null);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const onImgLoad = () => {
    setIsImgLoading(false);
  };

  const {addLogo, draw} = useLogoAnimation(logoRef, isImgLoading);

  return (
    <>
      <Canvas draw={draw} />
      <button
        onClick={addLogo}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        Add logo
      </button>
      <div style={{display: "none"}}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          id="DVDlogo"
          src={DVDlogo}
          width="320"
          height="163"
          ref={logoRef}
          onLoad={onImgLoad}
        />
      </div>
    </>
  );
}

export default App;
