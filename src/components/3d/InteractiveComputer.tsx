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
      computerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    
    if (screenRef.current && isScreenActive) {
      const intensity = 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  // Desk Surface
  const Desk = () => (
    <group position={[0, -1.5, 0]}>
      {/* Main desk surface */}
      <mesh>
        <boxGeometry args={[6, 0.1, 4]} />
        <meshStandardMaterial 
          color="#4a4a4a" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Desk legs */}
      {([[-2.5, -0.8, -1.5], [2.5, -0.8, -1.5], [-2.5, -0.8, 1.5], [2.5, -0.8, 1.5]] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.05, 0.05, 1.6]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      ))}
      
      {/* Desk edge */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[6.1, 0.02, 4.1]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
    </group>
  );

  // PC Tower
  const PCTower = () => (
    <group position={[2.5, -0.7, 0]}>
      {/* Main tower body */}
      <mesh>
        <boxGeometry args={[0.4, 1.2, 0.8]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      
      {/* Power button */}
      <mesh position={[0.21, 0.4, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02]} />
        <meshStandardMaterial 
          color={isScreenActive ? "#00ff00" : "#ff0000"}
          emissive={isScreenActive ? "#00ff00" : "#ff0000"}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* CD drive */}
      <mesh position={[0.21, 0.1, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Ventilation grilles */}
      {[-0.2, 0, 0.2].map((y, i) => (
        <mesh key={i} position={[0.21, y, -0.2]}>
          <boxGeometry args={[0.01, 0.05, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      
      {/* LED strips */}
      <mesh position={[0.21, -0.5, 0]}>
        <boxGeometry args={[0.01, 0.02, 0.6]} />
        <meshStandardMaterial 
          color="#0066ff"
          emissive="#0066ff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );

  // Monitor with enhanced screen
  const Monitor = () => (
    <group>
      {/* Monitor Base */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Monitor Body - Retro CRT style */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.8, 0.6]} />
        <meshStandardMaterial 
          color="#3a3a3a" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Screen Bezel */}
      <mesh position={[0, 0, 0.31]}>
        <boxGeometry args={[2.2, 1.6, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Actual Screen */}
      <mesh 
        ref={screenRef}
        position={[0, 0, 0.33]} 
        onClick={onScreenClick}
        onPointerOver={() => setHoveredPart('screen')}
        onPointerOut={() => setHoveredPart(null)}
      >
        <planeGeometry args={[1.9, 1.3]} />
        <meshStandardMaterial 
          color={isScreenActive ? "#001100" : "#000000"}
          emissive={isScreenActive ? "#003300" : "#000000"}
          emissiveIntensity={isScreenActive ? 0.6 : 0}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Screen Glow Effect */}
      {isScreenActive && (
        <mesh position={[0, 0, 0.32]}>
          <planeGeometry args={[2.1, 1.5]} />
          <meshStandardMaterial 
            color="#00ff00"
            transparent
            opacity={0.1}
            emissive="#00ff00"
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
      
      {/* Screen Content */}
      {isScreenActive && (
        <Text
          position={[0, 0, 0.34]}
          fontSize={0.08}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {screenContent}
        </Text>
      )}
      
      {/* Monitor Controls */}
      {[0.8, 1.0, 1.2].map((x, i) => (
        <mesh key={i} position={[x, -0.7, 0.31]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02]} />
          <meshStandardMaterial color="#404040" />
        </mesh>
      ))}
      
      {/* Brand label */}
      <mesh position={[0, -0.7, 0.31]}>
        <boxGeometry args={[0.6, 0.08, 0.01]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );

  // Enhanced Keyboard
  const Keyboard = () => (
    <group position={[0, -1.45, 0.8]}>
      {/* Keyboard Base */}
      <mesh 
        onClick={onKeyboardClick}
        onPointerOver={() => setHoveredPart('keyboard')}
        onPointerOut={() => setHoveredPart(null)}
      >
        <boxGeometry args={[1.6, 0.08, 0.6]} />
        <meshStandardMaterial 
          color={hoveredPart === 'keyboard' ? "#3a3a3a" : "#2a2a2a"}
          roughness={0.6}
        />
      </mesh>
      
      {/* Individual Keys with proper layout */}
      {Array.from({ length: 60 }, (_, i) => {
        const row = Math.floor(i / 12);
        const col = i % 12;
        return (
          <mesh 
            key={i}
            position={[
              -0.65 + col * 0.11,
              0.045,
              -0.2 + row * 0.1
            ]}
          >
            <boxGeometry args={[0.08, 0.03, 0.08]} />
            <meshStandardMaterial 
              color="#404040"
              roughness={0.8}
            />
          </mesh>
        );
      })}
      
      {/* Space bar */}
      <mesh position={[0, 0.045, 0.25]}>
        <boxGeometry args={[0.4, 0.03, 0.08]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
    </group>
  );

  // Enhanced Mouse with mouse pad
  const Mouse = () => (
    <group position={[1.2, -1.44, 0.3]}>
      {/* Mouse pad */}
      <mesh position={[0, -0.005, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Mouse body */}
      <mesh>
        <boxGeometry args={[0.12, 0.04, 0.18]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} />
      </mesh>
      
      {/* Mouse buttons */}
      <mesh position={[-0.03, 0.025, 0.04]}>
        <boxGeometry args={[0.04, 0.015, 0.06]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      <mesh position={[0.03, 0.025, 0.04]}>
        <boxGeometry args={[0.04, 0.015, 0.06]} />
        <meshStandardMaterial color="#404040" />
      </mesh>
      
      {/* Scroll wheel */}
      <mesh position={[0, 0.03, 0.02]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02]} />
        <meshStandardMaterial color="#606060" />
      </mesh>
    </group>
  );

  // Coffee Mug with steam effect
  const CoffeeMug = () => (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[-1.8, -1.3, -0.8]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.1, 0.2]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
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
        
        {/* Steam particles */}
        {isScreenActive && Array.from({ length: 5 }, (_, i) => (
          <mesh key={i} position={[0, 0.15 + i * 0.05, 0]}>
            <sphereGeometry args={[0.005]} />
            <meshStandardMaterial 
              color="#ffffff"
              transparent
              opacity={0.3 - i * 0.05}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );

  return (
    <group ref={computerRef}>
      <Desk />
      <PCTower />
      <Monitor />
      <Keyboard />
      <Mouse />
      <CoffeeMug />
      
      {/* Enhanced screen lighting */}
      {isScreenActive && (
        <>
          <pointLight
            position={[0, 0, 1]}
            color="#00ff00"
            intensity={0.8}
            distance={4}
            decay={2}
          />
          <spotLight
            position={[0, 0.5, 2]}
            target-position={[0, 0, 0]}
            angle={0.8}
            penumbra={0.5}
            intensity={0.4}
            color="#00ff00"
          />
        </>
      )}
    </group>
  );
};