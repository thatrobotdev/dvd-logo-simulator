import {MutableRefObject, useEffect, useState} from "react";
import logo1 from "../img/dvdlogo-01.png";
import logo2 from "../img/dvdlogo-02.png";
import logo3 from "../img/dvdlogo-03.png";
import logo4 from "../img/dvdlogo-04.png";
import logo5 from "../img/dvdlogo-05.png";
import logo6 from "../img/dvdlogo-06.png";
import logo7 from "../img/dvdlogo-07.png";
import logo8 from "../img/dvdlogo-08.png";

interface Props {
  logoRef: MutableRefObject<any[]>;
  onImgLoad: () => void;
}

const SourceImage = ({logoRef, onImgLoad}: Props) => {
  const logoImages = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];
  const [imgLoadingStates, setImgLoadingStates] = useState(
    new Array(8).fill(true)
  );

  const handleLoad = (i: number) => {
    setImgLoadingStates((prevState) => {
      const newState = [...prevState];
      newState[i] = false;
      return newState;
    });
  };

  useEffect(() => {
    if (imgLoadingStates.every((el) => el)) {
      onImgLoad();
    }
  }, [imgLoadingStates, onImgLoad]);

  return (
    <div style={{display: "none"}}>
      {logoImages.map((el, i) => {
        return (
          <img
            key={`logo${i}`}
            alt=""
            id={`logo${i}`}
            src={el}
            width="187"
            height="73"
            ref={(el) => (logoRef.current[i] = el)}
            onLoad={() => handleLoad(i)}
          />
        );
      })}
    </div>
  );
};

export default SourceImage;
