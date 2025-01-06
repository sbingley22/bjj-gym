import { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei"; // Import OrbitControls
import Character from "./Character";

const Arena = ({ shadeMode, animation, setAnimation, animationSpeed }) => {
  const [anim1, setAnim1] = useState("Bjj Stance");
  const [anim2, setAnim2] = useState("Bjj Stance");

  useEffect(() => {
    setAnim1("Bjj Single Leg A");
    setAnim2("Bjj Single Leg B");
  }, []);

  useEffect(() => {
    if (!animation) return
    if (animation==="") return

    setAnim1(animation + " A");
    setAnim2(animation + " B");

    setAnimation("")
  }, [animation])
  

  return (
    <>
      {shadeMode !== "flat" && <ambientLight intensity={2} />}

      <OrbitControls
        target={[0, 0.9, 0]} // Set the focus point
        enablePan={false} // Disable panning
        minDistance={1.4} // Set minimum zoom distance
        maxDistance={2.8} // Set maximum zoom distance
        maxPolarAngle={Math.PI / 2} // Restrict vertical rotation (e.g., top-down view)
        minPolarAngle={0} // Restrict rotation to prevent flipping
      />

      <group position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Character
          //model="FightGirl"
          //alt={true}
          anim={anim1}
          setAnim={setAnim1}
          shadeMode={shadeMode}
          speedMultiplier={animationSpeed}
        />
      </group>
      <group position={[0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <Character
          //model="PunkFem"
          alt={true}
          anim={anim2}
          setAnim={setAnim2}
          shadeMode={shadeMode}
          speedMultiplier={animationSpeed}
        />
      </group>
    </>
  );
};

export default Arena;

