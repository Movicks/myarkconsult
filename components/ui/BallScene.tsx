"use client"; // Needed for Next.js App Router

import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Suspense } from "react";

const consultantBlue = "#007BFF"; // Replace with your Tailwind color if needed

const BallScene = () => {
  return (
    <div className="w-full h-[40rem] bg-transparent">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={1} />

          {/* 3D Balls with same sizes & positions */}
          <Ball position={[-4, 4, 0]} size={2} opacity={0.5} /> {/* -top-16 -left-16 w-40 h-40 */}
          <Ball position={[3, 2, 0]} size={1.4} opacity={0.7} /> {/* top-20 -right-12 w-28 h-28 */}
          <Ball position={[-3, -3, 0]} size={1.6} opacity={0.5} /> {/* -bottom-10 -left-10 w-32 h-32 */}

          <Ball position={[4, 4, 0]} size={2} opacity={0.6} /> {/* top-20 left-70 w-40 h-40 */}
          <Ball position={[5, -5, 0]} size={1.4} opacity={0.4} /> {/* -top-40 right-10 w-28 h-28 */}
          <Ball position={[-5, -4, 0]} size={1.6} opacity={0.5} /> {/* -bottom-20 left-[30rem] w-32 h-32 */}

          
        </Suspense>
      </Canvas>
    </div>
  );
};

const Ball = ({ position, size, opacity }: { position: [number, number, number]; size: number; opacity: number }) => {
  return (
    <Sphere args={[size, 32, 32]} position={position}>
      <meshStandardMaterial color={consultantBlue} transparent opacity={opacity} />
    </Sphere>
  );
};

export default BallScene;
