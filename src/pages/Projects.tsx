import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Search } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'Social Dashboard',
    description: 'Real-time social media analytics dashboard with charts and metrics.',
    imageUrl: 'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795829/copilot_image_1778795000722_okryxj.png',
    githubUrl: 'https://github.com/Dev-moe-kyawaung/social-dashboard',
    demoUrl: 'https://social-dashboard.moekyawaung.com',
    tags: ['React', 'TypeScript', 'Tailwind'],
    createdAt: '2024-10',
  },
  {
    id: 2,
    title: 'Android App',
    description: 'Native Android app built with Kotlin + Jetpack Compose + MVVM.',
    imageUrl: 'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795856/copilot_image_1778795675037_heh9xk.png',
    githubUrl: 'https://github.com/Dev-moe-kyawaung/android-app',
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM'],
    createdAt: '2024-09',
  },
  // Add more projects...
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = projects.flatMap(p => p.tags);
  const uniqueTags = [...new Set(allTags)];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="pt-19 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-light/12 bg-surface-2 text-sm font-semibold">
            Projects & Apps
          </div>
          
          <h1 className="text-6xl font-poppins font-bold mt-6">
            Featured <span className="gradient-text">Builds</span>
          </h1>
          
          <p className="text-text-muted mt-4 text-lg max-w-2xl">
            A curated portfolio of Android, web, dashboard, game, and PWA examples.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid md:grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-2 border border-border-light/12">
            <Search size={20} className="text-text-muted" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                !selectedTag
                  ? 'bg-neon-cyan text-bg-dark'
                  : 'bg-surface-2 text-text-muted border border-border-light/12'
              }`}
            >
              All
            </button>
            {uniqueTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-neon-cyan text-bg-dark'
                    : 'bg-surface-2 text-text-muted border border-border-light/12'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group rounded-2xl bg-surface/76 border border-border-light/12 overflow-hidden neon-shadow cyber-clip"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-cyan/12 text-neon-cyan">
                    {project.tags[0]}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-text-muted text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span className="px-2 py-1 rounded-lg text-xs bg-surface-2">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-surface-2 border border-border-light/12"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-neon-cyan text-bg-dark"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
