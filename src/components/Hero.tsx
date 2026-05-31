import { motion } from 'framer-motion';
import { Globe, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Hero() {
  const { setCurrentPage } = useStore();

  const scrollToTranslator = () => {
    const el = document.getElementById('translator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-96 h-96 bg-primary-400 top-[-10%] left-[-5%]" />
        <div className="orb w-80 h-80 bg-accent-400 top-[20%] right-[-5%]" />
        <div className="orb w-64 h-64 bg-pink-400 bottom-[10%] left-[30%]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-8"
          >
            <Zap className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              AI-Powered Translation Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span className="text-slate-900 dark:text-white">Translate </span>
            <span className="gradient-text">Smarter.</span>
            <br />
            <span className="text-slate-900 dark:text-white">Reply </span>
            <span className="gradient-text">Faster.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Instantly translate text between 100+ languages with AI-powered
            smart reply suggestions. Communicate effortlessly across borders.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTranslator}
              className="group flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
            >
              <Globe className="w-5 h-5" />
              Start Translating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCurrentPage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-8 py-4 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '100+', label: 'Languages' },
              { value: 'AI', label: 'Smart Replies' },
              { value: 'Free', label: 'To Use' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating globe illustration */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-10 top-1/4 hidden xl:block opacity-20 dark:opacity-10"
        >
          <Globe className="w-64 h-64 text-primary-500" />
        </motion.div>
      </div>
    </section>
  );
}
