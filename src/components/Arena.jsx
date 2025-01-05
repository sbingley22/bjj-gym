import { useState, useEffect } from "react"
import Character from "./Character"

const Arena = () => {
  const [anim1, setAnim1] = useState("Bjj Stance")
  const [anim2, setAnim2] = useState("Bjj Stance")


  return (
    <>
      <group position={[-0.5,0,0]} rotation={[0,Math.PI/2,0]} >
        <Character model="FightGirl" anim={anim1} />
      </group>
      <group position={[0.5,0,0]} rotation={[0,-Math.PI/2,0]} >
        <Character model="PunkFem" anim={anim2} />
      </group>
    </>
  )
}

export default Arena
