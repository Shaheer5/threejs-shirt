import { useRef } from "react";
import {
  AccumulativeShadows,
  RandomizedLight,
  SpotLight,
} from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal={true}
      limit={40}
      frames={120}
      alphaTest={0.95}
      scale={5}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={6}
        radius={8}
        intensity={0.55}
        ambient={0.25}
        position={[7, 7, -10]}
      />
      <RandomizedLight
        amount={6}
        radius={5}
        intensity={0.4}
        ambient={0.6}
        position={[-7, 7, -9]}
      />
      <SpotLight
        intensity={1.5}
        angle={0.3}
        penumbra={1}
        position={[0, 10, 0]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
