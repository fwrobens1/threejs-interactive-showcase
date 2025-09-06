import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { X, Monitor, Power, Folder, Terminal, Settings } from 'lucide-react';

interface ComputerInterfaceProps {
  isActive: boolean;
  activeSection: string | null;
  onSectionChange: (section: string | null) => void;
}

const RetroOS = ({ activeSection, onSectionChange }: { activeSection: string | null, onSectionChange: (section: string | null) => void }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const desktopIcons = [
    { id: 'about', name: 'About Me', icon: '📄', x: 50, y: 80 },
    { id: 'skills', name: 'Skills', icon: '⚡', x: 50, y: 160 },
    { id: 'projects', name: 'Projects', icon: '📁', x: 50, y: 240 },
    { id: 'contact', name: 'Contact', icon: '📧', x: 50, y: 320 },
  ];

  const sectionContent = {
    about: {
      title: 'About Me - Personal Information',
      content: `
PORTFOLIO SYSTEM v1.0 - PERSONAL FILE
═══════════════════════════════════════════

NAME: John Doe
TITLE: Full Stack Developer & 3D Graphics Specialist
LOCATION: New York, NY
EXPERIENCE: 5+ Years in Software Development

BIOGRAPHY:
--------
Passionate developer with expertise in modern web 
technologies and 3D graphics. Specializes in creating 
immersive digital experiences that combine cutting-edge 
technology with intuitive design.

EDUCATION:
---------
• Bachelor of Computer Science - NYU (2018)
• Certified AWS Solutions Architect
• Three.js Certified Developer

INTERESTS:
---------
• 3D Graphics & WebGL Development
• Interactive User Experience Design  
• Open Source Contributions
• Virtual Reality Applications

ACHIEVEMENTS:
-----------
• Led development of 50+ successful projects
• Contributed to major open-source projects
• Speaker at tech conferences
• Mentored 20+ junior developers

[WINDOW: ABOUT_ME.exe] [STATUS: ACTIVE]`
    },
    skills: {
      title: 'Technical Skills - Proficiency Matrix',
      content: `
SKILL ASSESSMENT REPORT v2.1
═══════════════════════════════════════════

FRONTEND DEVELOPMENT:
--------------------
React/TypeScript    ████████████████████ 95%
JavaScript/ES6+     ████████████████████ 92%
HTML5/CSS3          ████████████████████ 90%
Three.js/WebGL      ████████████████     80%
Tailwind CSS        ███████████████████  88%

BACKEND DEVELOPMENT:
-------------------
Node.js/Express     ████████████████     85%
Python/FastAPI      ████████████████████ 88%
PostgreSQL          ████████████████     82%
MongoDB             ███████████████      75%
REST APIs           ████████████████████ 90%

DEVOPS & TOOLS:
--------------
Docker              ███████████████      78%
AWS Services        ███████████████      75%
Git/GitHub          ████████████████████ 95%
Linux/Unix          ████████████████     80%
CI/CD Pipelines     ██████████████       70%

FRAMEWORKS & LIBRARIES:
----------------------
• Next.js, Gatsby, Vite
• Express.js, Fastify
• Socket.io, WebRTC
• Redux, Zustand
• Jest, Cypress, Playwright

[WINDOW: SKILLS.exe] [STATUS: COMPUTING...]`
    },
    projects: {
      title: 'Project Portfolio - Development Archive',
      content: `
PROJECT DIRECTORY LISTING
═══════════════════════════════════════════

📁 PRODUCTION PROJECTS:
----------------------

🚀 E-COMMERCE_PLATFORM.app
   └── Tech Stack: React, Node.js, PostgreSQL
   └── Features: Payment integration, Admin panel
   └── Status: DEPLOYED | Users: 10,000+
   └── Performance: 99.9% uptime

🎮 INTERACTIVE_3D_PORTFOLIO.exe
   └── Tech Stack: Three.js, React, TypeScript  
   └── Features: Real-time 3D rendering
   └── Status: LIVE (Current project)
   └── Innovation: Immersive user experience

📱 TASK_MANAGEMENT_APP.mobile
   └── Tech Stack: React Native, Socket.io
   └── Features: Real-time collaboration
   └── Status: BETA TESTING
   └── Downloads: 5,000+ pre-launch

🤖 AI_CHAT_ASSISTANT.py
   └── Tech Stack: Python, OpenAI, FastAPI
   └── Features: Natural language processing
   └── Status: DEVELOPMENT 
   └── Accuracy: 94% response quality

📊 ANALYTICS_DASHBOARD.web
   └── Tech Stack: React, D3.js, Express
   └── Features: Real-time data visualization
   └── Status: CLIENT DELIVERY
   └── Data Processing: 1M+ records/hour

[DIRECTORY: /projects/] [FILES: 47] [SIZE: 2.3GB]`
    },
    contact: {
      title: 'Contact Information - Communication Protocols',
      content: `
CONTACT SYSTEM v3.0 - COMMUNICATION CENTER
═══════════════════════════════════════════

PRIMARY CONTACT METHODS:
-----------------------
📧 EMAIL: john.doe@example.com
   └── Response Time: < 24 hours
   └── Encryption: PGP Available
   └── Status: MONITORED 24/7

📱 PHONE: +1 (555) 123-4567
   └── Availability: 9AM - 6PM EST
   └── Emergency: Available 24/7
   └── Protocol: Voice/SMS supported

📍 LOCATION: New York, NY
   └── Time Zone: EST (UTC-5)
   └── Remote Work: Available globally
   └── Travel: Available for projects

PROFESSIONAL NETWORKS:
---------------------
🌐 LinkedIn: /in/johndoe-developer
   └── Connections: 2,500+
   └── Recommendations: 47
   └── Activity: Daily updates

💻 GitHub: /johndoe
   └── Repositories: 150+
   └── Stars: 1,200+
   └── Contributions: 2,000+ this year

🐦 Twitter: @johndoe_dev
   └── Followers: 5,000+
   └── Focus: Tech insights & tutorials

COLLABORATION PREFERENCES:
-------------------------
• Agile/Scrum methodologies
• Slack/Discord communication
• Video calls for complex discussions
• GitHub for code collaboration
• Notion/Confluence for documentation

[SYSTEM: CONTACT.exe] [STATUS: ONLINE] [PING: 12ms]`
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 overflow-hidden">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-15 h-full w-full">
          {Array.from({ length: 300 }, (_, i) => (
            <div key={i} className="border border-white/20" />
          ))}
        </div>
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 border-t-2 border-gray-600 flex items-center px-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-white hover:bg-gray-700"
          onClick={() => onSectionChange(null)}
        >
          <Power className="w-4 h-4 mr-2" />
          Start
        </Button>
        
        <div className="flex-1" />
        
        <div className="text-white text-sm bg-gray-700 px-3 py-1 rounded">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Desktop Icons */}
      {!activeSection && (
        <div className="absolute inset-0 p-4">
          {desktopIcons.map((icon) => (
            <motion.div
              key={icon.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * desktopIcons.indexOf(icon) }}
              className="absolute cursor-pointer group"
              style={{ left: icon.x, top: icon.y }}
              onDoubleClick={() => onSectionChange(icon.id)}
            >
              <div className="flex flex-col items-center p-3 rounded hover:bg-white/20 transition-colors">
                <div className="text-3xl mb-1">{icon.icon}</div>
                <span className="text-white text-sm text-center bg-black/50 px-2 py-1 rounded">
                  {icon.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Application Window */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-4 bg-gray-200 rounded-lg shadow-2xl overflow-hidden border-2 border-gray-400"
          >
            {/* Window Title Bar */}
            <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center px-2">
              <div className="flex space-x-1 mr-3">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-white text-sm font-medium">
                {sectionContent[activeSection as keyof typeof sectionContent]?.title}
              </span>
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                onClick={() => onSectionChange(null)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>

            {/* Window Content */}
            <div className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-auto">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {sectionContent[activeSection as keyof typeof sectionContent]?.content}
              </pre>
              
              {/* Blinking Cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-5 bg-green-400 ml-1"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ComputerInterface = ({ isActive, activeSection, onSectionChange }: ComputerInterfaceProps) => {
  const [isBooting, setIsBooting] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    setIsBooting(true);
    setTimeout(() => {
      onSectionChange(sectionId);
      setIsBooting(false);
    }, 800);
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
          <div className="glass p-6 rounded-lg text-center max-w-md">
            <Monitor className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse-glow" />
            <h3 className="text-lg font-bold gradient-text mb-2">Retro Computer Portfolio</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click on the glowing screen to boot up the vintage portfolio system
            </p>
            <div className="text-xs text-muted-foreground">
              🖱️ Double-click desktop icons to open applications
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
            className="absolute inset-0 bg-black flex items-center justify-center pointer-events-auto z-50"
          >
            <div className="text-center text-green-400 font-mono">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl mb-8"
              >
                PORTFOLIO OS v1.0
              </motion.div>
              <div className="text-sm mb-4">LOADING APPLICATION...</div>
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.8, 
                      delay: i * 0.05,
                      repeatType: "reverse" 
                    }}
                    className="w-1 h-4 bg-green-400"
                  />
                ))}
              </div>
              <div className="text-xs opacity-70">Please wait while the system initializes...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Retro OS Interface */}
      <AnimatePresence>
        {isActive && !isBooting && (
          <div className="absolute inset-0 pointer-events-auto">
            <RetroOS activeSection={activeSection} onSectionChange={onSectionChange} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};