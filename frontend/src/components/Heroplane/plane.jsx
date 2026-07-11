import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Plane() {

  const meshRef = useRef();
  const groupRef = useRef();

  const [drag, setDrag] = useState(false);

  const geometry = useMemo(() => {

    const positions = new Float32Array([

      // top left

      0,0,1.6,
      0,0.28,-1.4,
      -1.5,-0.15,-1.1,

      // top right

      0,0,1.6,
      1.5,-0.15,-1.1,
      0,0.28,-1.4,

      // bottom left

      0,0,1.6,
      -1.5,-0.15,-1.1,
      0,-0.05,-1.05,

      // bottom right

      0,0,1.6,
      0,-0.05,-1.05,
      1.5,-0.15,-1.1,

    ]);

    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions,3)
    );

    geo.computeVertexNormals();

    return geo;

  }, []);

  useFrame((state)=>{

    const t = state.clock.elapsedTime;

    if(!drag){

      groupRef.current.rotation.y += 0.002;

      groupRef.current.position.y =
        Math.sin(t*1.2)*0.12;

    }

  });

  return(

    <group
      ref={groupRef}
      rotation={[0,0.5,0]}
    >

      <mesh
        ref={meshRef}
        geometry={geometry}
      >

        <meshPhongMaterial
          color="#FAF8F4"
          shininess={10}
          flatShading
          side={THREE.DoubleSide}
        />

      </mesh>

      <lineSegments>

        <edgesGeometry args={[geometry]} />

        <lineBasicMaterial
          color="#2B2B2B"
        />

      </lineSegments>

      <line>

        <bufferGeometry>

          <bufferAttribute
            attach="attributes-position"
            count={2}
            itemSize={3}
            array={
              new Float32Array([
                0,0,1.6,
                0,-0.05,-1.05
              ])
            }
          />

        </bufferGeometry>

        <lineBasicMaterial
          color="#8E86C9"
        />

      </line>

    </group>

  );

}