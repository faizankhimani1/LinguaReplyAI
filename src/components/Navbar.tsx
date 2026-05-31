import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Info,
  Mail,
  Shield,
  FileText,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const navLinks = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Info },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'terms', label: 'Terms', icon: FileText },
];

export default function Navbar() {
  const { theme, toggleTheme, currentPage, setCurrentPage } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
            aria-label="Go to home page"
          >
            <div className="relative">
              <Globe className="w-8 h-8 text-primary-500 transition-transform group-hover:rotate-180 duration-500" />
              <div className="absolute inset-0 w-8 h-8 bg-primary-500/20 rounded-full blur-lg group-hover:bg-primary-500/40 transition-all" />
            </div>
            <span className="text-xl font-bold">
              <span className="gradient-text">LinguaReply</span>
              <span className="text-slate-400 font-light ml-1">AI</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentPage === link.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                }`}
                aria-label={`Navigate to ${link.label}`}
              >
                {currentPage === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary-50 dark:bg-primary-900/30 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-slate-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/20 dark:border-white/5 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    currentPage === link.id
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
