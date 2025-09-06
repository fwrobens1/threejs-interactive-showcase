import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-background-secondary border-t border-primary/20">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="gradient-text text-xl font-bold">
            John Doe
          </div>
          <p className="text-muted-foreground">
            Full Stack Developer & 3D Enthusiast
          </p>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved. Built with ❤️ and Three.js
          </div>
        </motion.div>
      </div>
    </footer>
  );
};