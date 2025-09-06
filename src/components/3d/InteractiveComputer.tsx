import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveComputerProps {
  onScreenClick: () => void;
  onKeyboardClick: () => void;
  screenContent: string;
  isScreenActive: boolean;
}

export const InteractiveComputer = ({ 
  onScreenClick, 
  onKeyboardClick, 
  screenContent, 
  isScreenActive 
}: InteractiveComputerProps) => {
  const computerRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  useFrame((state) => {
    if (computerRef.current) {
      computerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (screenRef.current && isScreenActive) {
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  // Computer Monitor
  const Monitor = () => (
    <group>
      {/* Monitor Base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Monitor Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 1.6, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Screen */}
      <mesh 
        ref={screenRef}
        position={[0, 0, 0.16]} 
        onClick={onScreenClick}
        onPointerOver={() => setHoveredPart('screen')}
        onPointerOut={() => setHoveredPart(null)}
      >
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial 
          color={isScreenActive ? "#00ff00" : "#001100"}
          emissive={isScreenActive ? "#003300" : "#000000"}
          emissiveIntensity={isScreenActive ? 0.3 : 0}
        />
      </mesh>
      
      {/* Screen Content */}
      {isScreenActive && (
        <Text
          position={[0, 0, 0.17]}
          fontSize={0.1}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
        >
          {screenContent}
        </Text>
      )}
      
      {/* Screen Border */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[2.0, 1.4]} />
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  );

  // Computer Keyboard
  const Keyboard = () => (
    <group position={[0, -1.2, 0.8]}>
      {/* Keyboard Base */}
      <mesh 
        onClick={onKeyboardClick}
        onPointerOver={() => setHoveredPart('keyboard')}
        onPointerOut={() => setHoveredPart(null)}
      >
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial 
          color={hoveredPart === 'keyboard' ? "#3a3a3a" : "#2a2a2a"} 
        />
      </mesh>
      
      {/* Keys */}
      {Array.from({ length: 40 }, (_, i) => (
        <mesh 
          key={i}
          position={[
            -0.6 + (i % 10) * 0.12,
            0.06,
            -0.15 + Math.floor(i / 10) * 0.1
          ]}
        >
          <boxGeometry args={[0.08, 0.04, 0.08]} />
          <meshStandardMaterial color="#404040" />
        </mesh>
      ))}
    </group>
  );

  // Computer Mouse
  const Mouse = () => (
    <group position={[1, -1.2, 0.5]}>
      <mesh>
        <boxGeometry args={[0.15, 0.05, 0.25]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Mouse buttons */}
      <mesh position={[0, 0.03, 0.05]}>
        <boxGeometry args={[0.06, 0.02, 0.08]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      <mesh position={[0, 0.03, -0.05]}>
        <boxGeometry args={[0.06, 0.02, 0.08]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
    </group>
  );

  // Coffee Mug
  const CoffeeMug = () => (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[1.5, -0.8, -0.5]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.1, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.02]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.02]} />
          <meshStandardMaterial color="#3C1810" />
        </mesh>
      </group>
    </Float>
  );

  return (
    <group ref={computerRef}>
      <Monitor />
      <Keyboard />
      <Mouse />
      <CoffeeMug />
      
      {/* Ambient lighting from screen */}
      {isScreenActive && (
        <pointLight
          position={[0, 0, 1]}
          color="#00ff00"
          intensity={0.5}
          distance={3}
        />
      )}
    </group>
  );
};