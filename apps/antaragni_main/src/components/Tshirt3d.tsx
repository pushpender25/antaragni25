'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

interface Merch3DProps {
  modelUrl: string;
  scale?: [number, number, number];
}

const Merch3D: React.FC<Merch3DProps> = ({ modelUrl, scale = [3.8, 3.8, 3.8] }) => {
  const Model = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gltf = useGLTF(modelUrl) as any;
    return <primitive object={gltf.scene} scale={scale} position={[0, -5, 0]} />;
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-[5%] mb-[1%] lg:mt-[1%] ">
      <div className="w-full max-w-2xl h-[500px]">
        <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            enablePan={true}
            enableZoom={false}
            enableRotate={true}
            maxPolarAngle={Math.PI/2} 
            minPolarAngle={Math.PI/3} 
            maxAzimuthAngle={Math.PI} 
            minAzimuthAngle={-Math.PI } 
          />
        </Canvas>
      </div>
    </div>
  );
};

export default Merch3D;
