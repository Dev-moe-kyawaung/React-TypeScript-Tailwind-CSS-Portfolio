import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'GitHub & Social', path: '/github-social' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      transition-all duration-300
      ${isScrolled ? 'bg-bg-dark/94 backdrop-blur-xl border-b border-border-light/12' : ''}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-19">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 font-poppins font-bold text-xl">
            <div className="w-11 h-11 rounded-xl bg-[conic-gradient(from_90deg,#00F5FF,#FF3DF2,#FFE600,#00F5FF)]" />
            <span className="hidden sm:inline">Moe-Kyaw-Aung</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-xl bg-surface border border-border-light/12 text-text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-xl font-semibold transition-all
                  ${location.pathname === link.path
                    ? 'text-text-primary bg-white/5'
                    : 'text-text-muted hover:text-text-primary'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-19 right-4 w-56 bg-bg-dark border border-border-light/12 rounded-xl p-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`
                  block px-4 py-3 rounded-xl font-semibold mb-2 transition-all
                  ${location.pathname === link.path
                    ? 'text-text-primary bg-white/5'
                    : 'text-text-muted hover:text-text-primary'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
