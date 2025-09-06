import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import { InteractiveComputer } from '../3d/InteractiveComputer';
import { ComputerInterface } from '../ui/ComputerInterface';
import { ParticleField } from '../3d/ParticleField';

export const ComputerPortfolio = () => {
  const [isComputerActive, setIsComputerActive] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [screenContent, setScreenContent] = useState("PORTFOLIO OS v1.0\n\nClick screen to boot system\n\n> Power button located\n  on right side of monitor");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveSection(null);
        setIsComputerActive(false);
        setScreenContent("System shutdown...");
        setTimeout(() => {
          setScreenContent("Click to boot system...");
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleScreenClick = () => {
    if (!isComputerActive) {
      setIsComputerActive(true);
      setScreenContent("PORTFOLIO OS v1.0\n\nBOOTING SYSTEM...\n\n> Loading desktop environment\n> Initializing applications\n> System ready!");
      setTimeout(() => {
        setScreenContent("PORTFOLIO OS v1.0\n\nSYSTEM READY\n\nDouble-click desktop icons\nto open applications");
      }, 2000);
    }
  };

  const handleKeyboardClick = () => {
    if (isComputerActive && !activeSection) {
      setActiveSection('about');
    }
  };

  const handleSectionChange = (section: string | null) => {
    setActiveSection(section);
    if (section) {
      setScreenContent(`OPENING ${section.toUpperCase()}.exe\n\nLoading application...\nPlease wait...`);
    } else {
      setIsComputerActive(false);
      setScreenContent("SHUTTING DOWN...\n\nClosing applications\nSaving data\nPowering off");
      setTimeout(() => {
        setScreenContent("PORTFOLIO OS v1.0\n\nClick screen to boot system");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 2, 8]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#4F46E5" />
          <pointLight position={[-5, 2, -5]} intensity={0.5} color="#06B6D4" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.6}
            penumbra={1}
            intensity={0.5}
            color="#ffffff"
            target-position={[0, 0, 0]}
          />
          
          {/* Environment */}
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {/* Particle Field */}
          <ParticleField count={1000} radius={30} />
          
          {/* Interactive Computer */}
          <InteractiveComputer
            onScreenClick={handleScreenClick}
            onKeyboardClick={handleKeyboardClick}
            screenContent={screenContent}
            isScreenActive={isComputerActive}
          />
          
          {/* Camera Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxDistance={15}
            minDistance={5}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
            autoRotate={!isComputerActive}
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>
      
      {/* UI Overlay */}
      <ComputerInterface
        isActive={isComputerActive}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
};