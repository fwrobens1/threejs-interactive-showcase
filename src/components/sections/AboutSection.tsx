import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scene3D } from '../3d/Scene3D';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
              About Me
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience 
              creating digital solutions that bridge the gap between design and functionality. 
              My journey began with a fascination for how technology can transform ideas 
              into reality.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Specializing in modern web technologies including React, Node.js, and Three.js, 
              I love building immersive experiences that captivate users and solve real-world problems. 
              When I'm not coding, you'll find me exploring the latest in 3D graphics and 
              interactive design.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-primary mb-2">50+</h3>
                <p className="text-muted-foreground">Projects Completed</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-secondary mb-2">5+</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-96 lg:h-[500px] relative"
          >
            <div className="absolute inset-0 glass rounded-2xl overflow-hidden">
              <Scene3D cameraPosition={[2, 0, 6]} showText={false}>
                {/* Additional 3D elements can be added here */}
              </Scene3D>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};