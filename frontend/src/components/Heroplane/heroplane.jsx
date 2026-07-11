import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Plane from "./Plane";

export default function HeroPlane() {
  return (
    <div className="w-full h-[200px]">
      <Canvas
        camera={{
          position: [0, 1.1, 6.5],
          fov: 40,
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.65} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={0.9}
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.35}
          color="#8E86C9"
        />

        <Plane />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}