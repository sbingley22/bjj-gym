import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Arena from "./Arena";

const ThreeScene = () => {
  const [shadeMode, setShadeMode] = useState("half");
  const [animation, setAnimation] = useState("Bjj Stance");
  const [animationSpeed, setAnimationSpeed] = useState(1.0); // New animationSpeed state

  const handleSpeedChange = (event) => {
    setAnimationSpeed(parseFloat(event.target.value)); // Update animation speed from slider
  };

  return (
    <div className="flex h-[80vh]">
      <div className="w-1/6 flex flex-col justify-top items-center space-y-4 p-1">
        {/* Slider for Animation Speed */}
        <div className="w-full flex flex-col items-center space-y-2">
          <label htmlFor="speed-slider" className="text-gray-100 font-medium">
            {animationSpeed.toFixed(1)}x
          </label>
          <input
            id="speed-slider"
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={animationSpeed}
            onChange={handleSpeedChange}
            className="w-full cursor-pointer"
          />
        </div>
        <button
          className="px-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setAnimation("Bjj Single Leg")}
        >
          Single Leg
        </button>
        <button
          className="px-1 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setAnimation("Bjj Snap Down")}
        >
          Snap Down
        </button>
        <button
          className="px-1 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setAnimation("Bjj Hip Throw")}
        >
          Hip Throw
        </button>
        <button
          className="px-1 py-2 bg-yellow-500 text-white rounded hover:bg-red-600"
          onClick={() => setAnimation("F Throw")}
        >
          Leg Sweep
        </button>

      </div>

      <div className="w-5/6">
        <Canvas
          camera={{
            position: [0, 2, 4],
            fov: 60,
          }}
        >
          <Suspense>
            <Arena 
              shadeMode={shadeMode}
              animation={animation}
              setAnimation={setAnimation}
              animationSpeed={animationSpeed}
            />
          </Suspense>
        </Canvas>
      </div>

    </div>
  );
};

export default ThreeScene;
