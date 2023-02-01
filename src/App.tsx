import Canvas from "./Canvas";
import useLogoAnimation from "./useLogoAnimation";

function App() {
  const {addCircle, draw} = useLogoAnimation();

  return (
    <>
      <Canvas draw={draw} />
      <button
        onClick={addCircle}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        Add logo
      </button>
    </>
  );
}

export default App;
