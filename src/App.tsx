import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import { useStore } from '@/store/useStore';

const pages: Record<string, React.FC> = {
  home: Home,
  about: About,
  contact: Contact,
  privacy: Privacy,
  terms: Terms,
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function App() {
  const { theme, currentPage } = useStore();

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Detect system preference on first load
  useEffect(() => {
    const stored = localStorage.getItem('linguareply-storage');
    if (!stored) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      useStore.getState().setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const PageComponent = pages[currentPage] || Home;

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      {/* Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
            border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
          },
        }}
        richColors
      />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
