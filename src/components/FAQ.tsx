import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How many languages does LinguaReply AI support?',
    answer:
      'LinguaReply AI supports over 100 languages including English, Spanish, French, German, Chinese, Japanese, Korean, Arabic, Hindi, and many more. We continuously add support for additional languages to help you communicate globally.',
  },
  {
    question: 'Is LinguaReply AI free to use?',
    answer:
      'Yes! LinguaReply AI is completely free to use. You can translate text, generate smart reply suggestions, use voice input, and text-to-speech features at no cost. We plan to introduce premium features in the future for advanced users and teams.',
  },
  {
    question: 'How does automatic language detection work?',
    answer:
      'Our AI analyzes the text you enter and automatically identifies the source language using advanced pattern recognition. This means you don\'t need to manually select the source language — just start typing and let the system handle the detection.',
  },
  {
    question: 'What are Smart Reply Suggestions?',
    answer:
      'Smart Reply Suggestions are AI-generated responses based on the translated content. After translating a message, our system analyzes the context and suggests appropriate replies, helping you respond quickly and naturally in the target language.',
  },
  {
    question: 'Can I use voice input for translation?',
    answer:
      'Yes! LinguaReply AI supports voice input through your browser\'s built-in speech recognition. Simply click the microphone button and speak naturally. The system will convert your speech to text and translate it instantly. This feature works with multiple languages.',
  },
  {
    question: 'How does Text-to-Speech work?',
    answer:
      'After translating your text, you can click the speaker icon to hear the translation read aloud. This uses your browser\'s speech synthesis engine and supports multiple languages, helping you learn pronunciation and communicate verbally.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      'Absolutely. Your privacy is our priority. Translation history and favorites are stored locally on your device using browser storage. We do not store your translations on our servers or share them with third parties.',
  },
  {
    question: 'Can I access my translation history?',
    answer:
      'Yes, LinguaReply AI saves your last 50 translations locally. You can access them through the history panel, search through past translations, bookmark favorites, and delete entries you no longer need.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-4">
            <HelpCircle className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Everything you need to know about LinguaReply AI
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 overflow-hidden hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-medium text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
