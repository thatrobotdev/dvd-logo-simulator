import {useRef, useState} from "react";

const useLogoImage = () => {
  const logoRef = useRef(null);
  const [isImgLoading, setIsImgLoading] = useState(true);

  const onImgLoad = () => {
    setIsImgLoading(false);
  };

  return {logoRef, isImgLoading, onImgLoad};
};

export default useLogoImage;
