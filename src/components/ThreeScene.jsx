import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Arena from "./Arena"

const ThreeScene = () => {

  return (
    <Canvas
      camera={{
        position: [0,2,4],
        fov: 60,
      }}
      //dpr={options.resolution}
    >
      <Suspense>
        <Arena />
      </Suspense>
    </Canvas>
  )
}

export default ThreeScene
