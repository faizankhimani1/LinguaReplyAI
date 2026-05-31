import { motion } from 'framer-motion';
import {
  Globe,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  Code,
  Layers,
  Rocket,
  Target,
  Users,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const steps = [
  {
    step: '01',
    title: 'Enter Your Text',
    description: 'Type or speak the text you want to translate. Our system supports text input and voice recognition.',
    icon: '⌨️',
  },
  {
    step: '02',
    title: 'Auto-Detect & Translate',
    description: 'Our AI automatically detects the source language and translates your text into the target language instantly.',
    icon: '🤖',
  },
  {
    step: '03',
    title: 'Get Smart Replies',
    description: 'Receive AI-generated reply suggestions tailored to the translated content for quick and effective communication.',
    icon: '💬',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get translations in milliseconds with our optimized AI engine.',
  },
  {
    icon: Brain,
    title: 'Context-Aware AI',
    description: 'Our AI understands context to provide more accurate translations and relevant replies.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays on your device. We never store your personal translations.',
  },
  {
    icon: Globe,
    title: '100+ Languages',
    description: 'Comprehensive language support covering major world languages and dialects.',
  },
  {
    icon: Users,
    title: 'For Everyone',
    description: 'Designed for students, professionals, travelers, and businesses alike.',
  },
  {
    icon: Code,
    title: 'Modern Technology',
    description: 'Built with cutting-edge web technologies for the best user experience.',
  },
];

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Zustand', category: 'State' },
  { name: 'Web Speech API', category: 'Voice' },
];

const roadmap = [
  { phase: 'Phase 1', title: 'Core Platform', status: 'current', items: ['Text Translation', 'Smart Replies', 'Voice Features', 'History & Favorites'] },
  { phase: 'Phase 2', title: 'Premium Features', status: 'upcoming', items: ['Advanced AI Replies', 'Translation Export', 'Team Workspace', 'Priority Support'] },
  { phase: 'Phase 3', title: 'API & Extensions', status: 'planned', items: ['Translation API', 'Browser Extension', 'Mobile App', 'Developer Dashboard'] },
];

export default function About() {
  const { setCurrentPage } = useStore();

  return (
    <main className="pt-24 pb-12">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb w-72 h-72 bg-primary-400 top-0 left-1/4" />
          <div className="orb w-60 h-60 bg-accent-400 bottom-0 right-1/4" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
              <Lightbulb className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                About Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              The Future of{' '}
              <span className="gradient-text">Translation</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              LinguaReply AI is a modern, AI-powered translation platform that
              combines language translation and conversational assistance in a
              single, beautiful user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Three simple steps to seamless communication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="text-xs font-bold text-primary-500 mb-2 tracking-widest">
                  STEP {step.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 text-slate-300 dark:text-slate-600">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4">
              <Target className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Benefits
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose <span className="gradient-text">LinguaReply AI</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-primary-200 dark:hover:border-primary-800 transition-all"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4">
              <Layers className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Tech Stack
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Built With <span className="gradient-text">Modern Tech</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-center hover:border-primary-200 dark:hover:border-primary-800 transition-all"
              >
                <div className="text-base font-semibold text-slate-900 dark:text-white">
                  {tech.name}
                </div>
                <div className="text-xs text-slate-400 mt-1">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4">
              <Rocket className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Roadmap
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Future <span className="gradient-text">Enhancements</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.15 }}
                className={`p-6 rounded-2xl border transition-all ${
                  phase.status === 'current'
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                    : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest text-primary-500">
                    {phase.phase}
                  </span>
                  {phase.status === 'current' && (
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Try LinguaReply AI now and experience the future of translation.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 transition-all"
            >
              <Globe className="w-5 h-5" />
              Start Translating
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
