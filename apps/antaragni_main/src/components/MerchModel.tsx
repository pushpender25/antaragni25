"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

type Merch3DModelProps = {
  modelUrl: string;
};

function Model({ url, scale, position }: { url: string; scale: number[]; position: number[] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} />;
}

export default function Merch3DModel({ modelUrl }: Merch3DModelProps) {
  const [scale, setScale] = useState<[number, number, number]>([8, 8, 8]);
  const [position, setPosition] = useState<[number, number, number]>([0, -10.2, 0]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 500) {
      setScale([6, 6, 6]);
      setPosition([0, 0, 0]);
    } else {
      setScale([8, 8, 8]);
      setPosition([0, -10.2, 0]);
    }
  }, []);

  return (
    <div className="flex justify-center items-center rounded-full bg-white/10 border border-[#7f76ff] shadow-[0_4px_30px_rgba(0,0,0,0.1)] w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]">
      <Canvas style={{ height: "100%", width: "100%" }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model url={modelUrl} scale={scale} position={position} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI}
          minAzimuthAngle={-Math.PI}
          minDistance={5}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}
