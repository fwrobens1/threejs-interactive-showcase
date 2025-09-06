import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'React', level: 95, color: '#61DAFB' },
  { name: 'TypeScript', level: 90, color: '#3178C6' },
  { name: 'Node.js', level: 85, color: '#339933' },
  { name: 'Three.js', level: 80, color: '#000000' },
  { name: 'Python', level: 88, color: '#3776AB' },
  { name: 'PostgreSQL', level: 82, color: '#336791' },
  { name: 'Docker', level: 78, color: '#2496ED' },
  { name: 'AWS', level: 75, color: '#FF9900' },
];

const SkillOrb = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass p-6 rounded-2xl hover:shadow-cosmic transition-all duration-300 group"
      whileHover={{ y: -10 }}
    >
      <div className="text-center space-y-4">
        <div 
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-glow"
          style={{ backgroundColor: skill.color }}
        >
          {skill.name.charAt(0)}
        </div>
        
        <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
        
        <div className="relative">
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : {}}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              className="h-2 rounded-full bg-gradient-cosmic"
            />
          </div>
          <span className="text-sm text-muted-foreground mt-2 block">{skill.level}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="min-h-screen py-20 bg-background-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A diverse set of skills acquired through years of passionate development 
            and continuous learning in the ever-evolving tech landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillOrb key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6 text-foreground">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'Redux',
              'Next.js', 'Express.js', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs',
              'Git', 'Linux', 'Webpack', 'Vite', 'Jest', 'Cypress'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.05 }}
                className="px-4 py-2 glass rounded-full text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};