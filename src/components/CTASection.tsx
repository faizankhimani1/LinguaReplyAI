import { motion } from 'framer-motion';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center glass-card rounded-3xl p-10 sm:p-16 relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-400/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-6"
            >
              <Globe className="w-16 h-16 text-primary-500 opacity-50" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Start Translating <span className="gradient-text">Today</span>
            </h2>

            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
              Join thousands of users who communicate effortlessly across
              languages. No sign-up required — start translating instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('translator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Try It Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <p className="text-sm text-slate-400 dark:text-slate-500 mt-6">
              ✓ No credit card required &nbsp;·&nbsp; ✓ No sign-up needed &nbsp;·&nbsp; ✓ 100+ languages
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
