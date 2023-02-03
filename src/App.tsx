import Canvas from "./Canvas";
import useLogoAnimation from "./useLogoAnimation";
import DVDlogo from "./DVDLogo.png";
import {useRef, useState} from "react";

function App() {
  const DEBUG = false;

  const logoRef = useRef(null);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const onImgLoad = () => {
    setIsImgLoading(false);
  };

  const {addLogo, draw} = useLogoAnimation(logoRef, isImgLoading);

  const spawnN = (n: number) => {
    new Array(n).fill(null).forEach(() => addLogo());
  };

  return (
    <>
      <Canvas draw={draw} debug={DEBUG} />
      <button onClick={addLogo}>+1</button>
      <button onClick={() => spawnN(10)}>+10</button>
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
}

export default App;
