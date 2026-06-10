import { useState, useEffect } from 'react';
import { motion } from 'framer motion';
import { Link } from 'react-router-dom';
import { Github, Mail, Star, ChevronDown } from 'lucide-react';

const Home = () => {
  const roles = [
    'Android Developer',
    'Kotlin Engineer',
    'Jetpack Compose Specialist',
    'Flutter Developer',
    'Firebase Builder',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentRole = roles[currentIndex];
      
      if (!isDeleting) {
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.substring(0, currentText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentRole.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 45 : 70);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex]);

  return (
    <div className="pt-19">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-light/12 bg-surface-2 text-sm font-semibold">
              <Star size={16} className="text-neon-yellow" />
              <span>Portfolio Website V141</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-poppins font-bold mt-6 leading-tight">
              <span className="gradient-text">Moe Kyaw</span>
              <br />
              <span className="gradient-text">Aung</span>
            </h1>

            <div className="flex items-center gap-2 mt-6 text-xl font-semibold">
              <Star size={20} className="text-neon-yellow" />
              <span className="text-neon-cyan">{currentText}▍</span>
              <Star size={20} className="text-neon-yellow" />
            </div>

            <p className="text-text-muted mt-6 text-lg max-w-2xl">
              Senior Android Developer with 12 years of experience. 
              Strong in Kotlin and modern Jetpack development (Compose, ViewModel, Room).
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-bg-dark bg-gradient-to-r from-neon-cyan to-neon-pink"
              >
                <Mail size={20} />
                Hire Me
              </Link>
              
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-text-primary bg-surface-2 border border-border-light/12"
              >
                <Github size={20} />
                View Projects
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-12">
              {[
                { value: '12+', label: 'Years' },
                { value: '3K+', label: 'Apps' },
                { value: '22', label: 'Repos' },
                { value: '100%', label: 'Sat' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-5 rounded-2xl bg-surface/70 border border-border-light/12 text-center"
                >
                  <div className="text-2xl font-bold text-neon-cyan">{stat.value}</div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-yellow animate-spin-slow opacity-30" />
              
              {/* Inner Ring */}
              <div className="absolute inset-4 rounded-full border-2 border-neon-cyan/50" />
              
              {/* Avatar Image */}
              <img
                src="https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_3_zqrhhr.webp"
                alt="Moe Kyaw Aung"
                className="absolute inset-8 w-[calc(100%-64px)] h-[calc(100%-64px)] rounded-full object-cover border-3 border-white/14"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex justify-center pb-12"
      >
        <ChevronDown size={32} className="text-neon-cyan animate-bounce-slow" />
      </motion.div>
    </div>
  );
};

export default Home;
