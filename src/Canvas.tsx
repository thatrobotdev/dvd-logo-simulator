import { Draw } from "./types";
import useCanvas from "./useCanvas";

interface Props {
  draw: Draw
}

const Canvas = (props: Props) => {
  const {draw, ...rest} = props;
  const canvasRef = useCanvas({draw});

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
