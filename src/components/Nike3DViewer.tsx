// Nike3DViewer: Placeholder for 3D product rotation/zoom
// Uses React Three Fiber for 360 rotation and zoom
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

export const Nike3DViewer: React.FC = () => (
  <div className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* TODO: Replace with actual 3D model */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enablePan={false} enableZoom={true} />
      <Html center style={{ color: '#fff', fontWeight: 700 }}>3D Placeholder</Html>
    </Canvas>
  </div>
);
