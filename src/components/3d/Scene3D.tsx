import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'torus' | 'octahedron';
  color: string;
  scale?: number;
}

const FloatingGeometry = ({ position, geometry, color, scale = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.6, 0.3, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {renderGeometry()}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

interface Scene3DProps {
  cameraPosition?: [number, number, number];
  showText?: boolean;
  text?: string;
  children?: React.ReactNode;
}

export const Scene3D = ({ 
  cameraPosition = [0, 0, 5], 
  showText = false, 
  text = "PORTFOLIO",
  children 
}: Scene3DProps) => {
  return (
    <div className="w-full h-full">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#4F46E5" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
          
          {/* Environment and Stars */}
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* 3D Text */}
          {showText && (
            <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.5}
                height={0.1}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={[-text.length * 0.15, 0, 0]}
              >
                {text}
                <meshStandardMaterial
                  color="#4F46E5"
                  emissive="#4F46E5"
                  emissiveIntensity={0.3}
                />
              </Text3D>
            </Float>
          )}
          
          {/* Floating Geometries */}
          <FloatingGeometry position={[-3, 2, -2]} geometry="sphere" color="#4F46E5" scale={0.8} />
          <FloatingGeometry position={[3, -1, -1]} geometry="torus" color="#06B6D4" scale={0.6} />
          <FloatingGeometry position={[-2, -2, -3]} geometry="octahedron" color="#8B5CF6" scale={0.7} />
          <FloatingGeometry position={[2, 2, -2]} geometry="box" color="#10B981" scale={0.5} />
          <FloatingGeometry position={[0, -3, -1]} geometry="sphere" color="#F59E0B" scale={0.4} />
          
          {children}
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};