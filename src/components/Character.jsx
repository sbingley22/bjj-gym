import { useEffect, useRef } from "react"
import glb from "../assets/Fighters.glb?url"
import { useSkinnedMeshClone } from "./SkinnedMeshClone.js"
import { useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { MeshBasicMaterial, Color } from "three"

const Character = ({ model="GiGirl", anim, setAnim, speedMultiplier=1, alt=false, shadeMode="flat" }) => {
  const { scene, nodes, animations } = useSkinnedMeshClone(glb)
  const { mixer, actions } = useAnimations(animations, scene)
  const lastAnim = useRef("Bjj Stance")

  // Initial Setup
  useEffect(()=>{
     //console.log(nodes, actions)

     // Replace all materials with MeshBasicMaterial, preserving textures
     scene.traverse((object) => {
      if (object.isMesh || object.isSkinnedMesh) {
        if (shadeMode==="flat") {
          const originalMaterial = object.material;
          object.material = new MeshBasicMaterial({
            map: originalMaterial.map, // Use the texture map from the original material
            color: originalMaterial.color, // Preserve the color if neede
            transparent: originalMaterial.transparent, // Preserve transparency
            opacity: originalMaterial.opacity, // Preserve opacity
            alphaTest: originalMaterial.alphaTest || 0,
            blending: originalMaterial.blending || THREE.NormalBlending,
          });
        }

        if (!object.name.includes(model) && !object.parent.name.includes(model)) object.visible = false
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

      actions[anim].setEffectiveTimeScale(speedMultiplier)
    }
  }, [anim])

  const toggleVisibility = (name, vis) => {
    scene.traverse((object) => {
      if (object.name === name) object.visible = vis
    })
  }

  const changeMaterialCol = (name, r, g, b) => {
    scene.traverse((object) => {
      if (object.name === name) {
        // Clone the material to avoid shared references
        const newMaterial = object.material.clone();
        newMaterial.color.setRGB(r, g, b);
        object.material = newMaterial; // Update the object with the new material
      }
    })
  }

  useEffect(()=>{
    if (!alt) return
    if (model==="GiGirl") {
      changeMaterialCol("GiGirlBottoms", 0.1, 0.1, 0.1)
      changeMaterialCol("GiGirlTop", 0.1, 0.1, 0.1)
      toggleVisibility("GiGirlHair", false)
      toggleVisibility("FightGirlHair", true)
    }
    //else if (model==="PunkFem") {
    //  toggleVisibility("PunkFemJacket", false)
    //  toggleVisibility("PunkFemPants", false)
    //}
    //else if (model==="FightGirl") {
    //  toggleVisibility("FightGirlJacket", false)
    //  toggleVisibility("FightGirlPants", false)
    //}
  }, [alt])

   // Mixer Settings
  useEffect(()=>{
    if (!mixer) return

    const oneShotAnims = ["Bjj Single Leg A", "Bjj Single Leg B", "Bjj Snap Down A", "Bjj Snap Down B", "Bjj Hip Throw A", "Bjj Hip Throw B", "F Throw A 1", "F Throw B 1"]
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
