import { useEffect, useRef } from "react"
import glb from "../assets/Fighters.glb?url"
import { useSkinnedMeshClone } from "./SkinnedMeshClone.js"
import { useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { MeshBasicMaterial, Color } from "three"

const Character = ({ model="GiGirl", anim, setAnim, speedMultiplier=1, alt=false }) => {
  const { scene, nodes, animations } = useSkinnedMeshClone(glb)
  const { mixer, actions } = useAnimations(animations, scene)
  const lastAnim = useRef("Bjj Stance")

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

  useEffect(()=>{
    if (actions[anim]){
      actions[lastAnim.current].fadeOut(0.1)
      actions[anim].reset().fadeIn(0.1).play()
      lastAnim.current = anim
    }
  }, [anim])

  const toggleVisibility = (name, vis) => {
    scene.traverse((object) => {
      if (object.name === name) object.visible = vis
    })
  }

  useEffect(()=>{
    if (!alt) return
    if (model==="GiGirl") {
      toggleVisibility("GiGirlBottoms", false)
    }
    else if (model==="PunkFem") {
      toggleVisibility("PunkFemPants", false)
    }
    else if (model==="FightGirl") {
      toggleVisibility("FightGirlJacket", false)
    }
  }, [alt])

   // Mixer Settings
  useEffect(()=>{
    if (!mixer) return

    const oneShotAnims = ["Bjj Single Leg A", "Bjj Single Leg B"]
    oneShotAnims.forEach(osa => {
      if (!actions[osa]) {
        // console.log("No such action: ", osa)
        return
      }
      actions[osa].clampWhenFinished = true
      actions[osa].repetitions = 1
    })

    mixer.addEventListener("finished", (e) => {
      const action = e.action.getClip().name
      // console.log(action)

      setTimeout(()=>{
        setAnim("Bjj Stance")
      },1000)
    })

    return mixer.removeEventListener("finished")
  }, [mixer, actions])

  return (
    <primitive object={scene} />
  )
}

export default Character
