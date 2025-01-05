import { useEffect, useRef } from "react"
import glb from "../assets/Fighters.glb?url"
import { useSkinnedMeshClone } from "./SkinnedMeshClone.js"
import { useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { MeshBasicMaterial, Color } from "three"

const Character = ({ model="GiFem", anim, speedMultiplier=1 }) => {
  const { scene, nodes, animations } = useSkinnedMeshClone(glb)
  const { mixer, actions } = useAnimations(animations, scene)

  // Initial Setup
  useEffect(()=>{
    // console.log(nodes, actions)

    // Replace all materials with MeshBasicMaterial, preserving textures
    scene.traverse((object) => {
      if (object.isMesh || object.isSkinnedMesh) {
        const originalMaterial = object.material;
        object.material = new MeshBasicMaterial({
          map: originalMaterial.map, // Use the texture map from the original material
          color: originalMaterial.color, // Preserve the color if needed
        });

        if (!object.name.includes(model)) object.visible = false
      }
    });

    if (actions[anim]){
      actions[anim].play()
    }

  },[nodes, actions])

  return (
    <primitive object={scene} />
  )
}

export default Character
