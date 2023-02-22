import Canvas from "./Canvas";
import useLogoAnimation from "./useLogoAnimation";
import DVDlogo from "./DVDLogo.png";
import {useRef, useState} from "react";
import {Sampler} from "tone";
import click from "./click.wav";
import click2 from "./click2.wav";

function App() {
  const DEBUG = false;
  const DRAW_RECT = true;

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

  const onImgLoad = () => {
    setIsImgLoading(false);
  };

  const {addLogo, draw} = useLogoAnimation({
    logoRef,
    isLoading: isImgLoading || isSoundLoading,
  });

  const spawnN = (n: number) => {
    new Array(n).fill(null).forEach(() => addLogo());
  };

  return (
    <>
      <Canvas
        draw={draw}
        params={{DEBUG, DRAW_RECT}}
        sampler={samplerRef.current}
      />
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
