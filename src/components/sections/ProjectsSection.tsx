import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true
  },
  {
    id: 2,
    title: '3D Portfolio Website',
    description: 'An interactive 3D portfolio built with Three.js and React. Showcases modern web development techniques with immersive user experience.',
    image: '/api/placeholder/600/400',
    technologies: ['Three.js', 'React', 'TypeScript', 'GSAP'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false
  },
  {
    id: 4,
    title: 'AI Chat Application',
    description: 'An intelligent chat application powered by AI with natural language processing and context-aware responses.',
    image: '/api/placeholder/600/400',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'React'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`glass rounded-2xl overflow-hidden group hover:shadow-cosmic transition-all duration-500 ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
      whileHover={{ y: -10 }}
    >
      <div className="aspect-video bg-gradient-cosmic relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">{project.title}</div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="glass border-primary/30 text-primary hover:bg-primary/10"
            asChild
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
          <Button
            size="sm"
            className="btn-cosmic"
            asChild
          >
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating expertise in full-stack development, 
            3D graphics, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="glass border-primary/30 text-primary hover:bg-primary/10 px-8 py-4"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};