import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { X, Monitor, Keyboard, User, Code, Briefcase, Mail } from 'lucide-react';

interface ComputerInterfaceProps {
  isActive: boolean;
  activeSection: string | null;
  onSectionChange: (section: string | null) => void;
}

const sections = [
  { id: 'about', name: 'About Me', icon: User, color: '#4F46E5' },
  { id: 'skills', name: 'Skills', icon: Code, color: '#06B6D4' },
  { id: 'projects', name: 'Projects', icon: Briefcase, color: '#8B5CF6' },
  { id: 'contact', name: 'Contact', icon: Mail, color: '#10B981' },
];

const sectionContent = {
  about: `> ABOUT_ME.exe
  
Name: John Doe
Role: Full Stack Developer & 3D Enthusiast
Experience: 5+ years

Passionate developer specializing in:
• Modern web technologies
• 3D graphics and WebGL
• Interactive user experiences
• Full-stack solutions

Currently working on cutting-edge
projects that blend creativity with
technical excellence.

[PRESS ESC TO RETURN]`,

  skills: `> SKILLS.bat
  
TECHNICAL EXPERTISE:
━━━━━━━━━━━━━━━━━━━━━━━

Frontend:
• React/TypeScript     ████████████ 95%
• Three.js/WebGL      ████████████ 80%
• CSS/Tailwind        ████████████ 90%

Backend:
• Node.js/Express     ████████████ 85%
• Python/FastAPI      ████████████ 88%
• PostgreSQL          ████████████ 82%

Tools:
• Docker              ████████████ 78%
• AWS                 ████████████ 75%
• Git                 ████████████ 95%

[PRESS ESC TO RETURN]`,

  projects: `> PROJECTS.dir
  
📁 FEATURED PROJECTS:
━━━━━━━━━━━━━━━━━━━━━━━

🚀 E-Commerce Platform
   Tech: React, Node.js, PostgreSQL
   Status: Production Ready
   
🎮 3D Portfolio Website  
   Tech: Three.js, React, TypeScript
   Status: You're viewing it!
   
📱 Task Management App
   Tech: React Native, Socket.io
   Status: In Development
   
🤖 AI Chat Application
   Tech: Python, OpenAI, FastAPI
   Status: Beta Testing

[PRESS ESC TO RETURN]`,

  contact: `> CONTACT.info
  
📧 CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━

Email: john.doe@example.com
Phone: +1 (555) 123-4567
Location: New York, NY

🌐 SOCIAL LINKS:
• GitHub: github.com/johndoe
• LinkedIn: linkedin.com/in/johndoe
• Twitter: @johndoe_dev

💼 AVAILABILITY:
Currently open for new opportunities
and exciting projects!

[PRESS ESC TO RETURN]`
};

export const ComputerInterface = ({ isActive, activeSection, onSectionChange }: ComputerInterfaceProps) => {
  const [isBooting, setIsBooting] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    setIsBooting(true);
    setTimeout(() => {
      onSectionChange(sectionId);
      setIsBooting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Computer Instructions */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
        >
          <div className="glass p-6 rounded-lg text-center">
            <Monitor className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground mb-4">
              Click on the computer screen to boot up the system
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Keyboard className="w-4 h-4" />
              <span>Use keyboard for navigation</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Boot Screen */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 flex items-center justify-center pointer-events-auto"
          >
            <div className="text-center text-green-400 font-mono">
              <div className="text-2xl mb-4">BOOTING SYSTEM...</div>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.8, 
                      delay: i * 0.1,
                      repeatType: "reverse" 
                    }}
                    className="w-3 h-3 bg-green-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interface */}
      <AnimatePresence>
        {isActive && !isBooting && (
          <>
            {/* Top Menu Bar */}
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="absolute top-4 left-4 right-4 pointer-events-auto"
            >
              <div className="glass p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-green-400 font-mono text-sm">
                      PORTFOLIO_OS v1.0
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSectionChange(null)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Content Area */}
            <div className="absolute inset-4 top-20 pointer-events-auto">
              <div className="h-full flex">
                {/* Sidebar */}
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  className="w-64 glass p-4 rounded-l-lg mr-2"
                >
                  <h3 className="text-lg font-bold gradient-text mb-4">
                    Navigation
                  </h3>
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleSectionClick(section.id)}
                      >
                        <section.icon className="w-4 h-4 mr-2" style={{ color: section.color }} />
                        {section.name}
                      </Button>
                    ))}
                  </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex-1 glass p-6 rounded-r-lg"
                >
                  {activeSection ? (
                    <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {sectionContent[activeSection as keyof typeof sectionContent]}
                    </pre>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl mb-2">Welcome to Portfolio OS</h3>
                      <p>Select a section from the navigation menu to get started.</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};