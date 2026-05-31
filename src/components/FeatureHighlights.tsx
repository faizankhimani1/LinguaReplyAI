import { motion } from 'framer-motion';
import {
  Globe,
  Sparkles,
  Mic,
  Volume2,
  History,
  Star,
  Copy,
  Shield,
  Zap,
  Languages,
  MessageSquare,
} from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: '100+ Languages',
    description:
      'Translate between over 100 languages with high accuracy. From common languages to rare dialects.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Sparkles,
    title: 'Smart Reply Suggestions',
    description:
      'Get AI-powered contextual reply suggestions to communicate faster and more effectively.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Mic,
    title: 'Voice Input',
    description:
      'Speak instead of typing with multi-language speech-to-text recognition support.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Volume2,
    title: 'Text-to-Speech',
    description:
      'Listen to your translations with natural-sounding audio playback in multiple languages.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: Zap,
    title: 'Auto Detection',
    description:
      'Automatically identifies the source language so you don\'t have to select it manually.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: History,
    title: 'Translation History',
    description:
      'Access your last 50 translations anytime. Search, review, and reuse past translations.',
    color: 'text-teal-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
  },
  {
    icon: Star,
    title: 'Favorites',
    description:
      'Bookmark frequently used translations for quick access. Never lose important translations.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Copy,
    title: 'Copy & Share',
    description:
      'One-click copy to clipboard. Share translations easily across platforms and apps.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your data stays on your device. All translations are processed securely with no data storage.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeatureHighlights() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4">
            <Languages className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Communicate</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A complete translation toolkit with AI-powered features designed to
            break language barriers effortlessly.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 sm:p-12 rounded-3xl gradient-bg-animated text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Break Language Barriers?
            </h3>
            <p className="text-white/80 max-w-xl mx-auto mb-6">
              Join thousands of users who trust LinguaReply AI for instant,
              accurate translations with smart reply suggestions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById('translator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Translating Now — It&apos;s Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
