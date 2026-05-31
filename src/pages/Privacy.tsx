import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  {
    icon: Database,
    title: '1. Data Collection & Usage',
    content: [
      'LinguaReply AI is designed with privacy as a core principle. We collect minimal data necessary to provide our translation services.',
      'Translation history and favorites are stored locally on your device using your browser\'s local storage. This data never leaves your device and is not transmitted to our servers.',
      'We do not collect personal identification information unless you voluntarily provide it through our contact form.',
      'Text submitted for translation is processed through our translation API partners and is not stored permanently on any servers.',
    ],
  },
  {
    icon: Lock,
    title: '2. Cookies & Local Storage',
    content: [
      'We use browser local storage to save your preferences including theme settings, language preferences, and translation history.',
      'No tracking cookies are used. We do not use analytics cookies, advertising cookies, or any third-party tracking technologies.',
      'You can clear your stored data at any time by clearing your browser\'s local storage or using the clear history feature within the app.',
    ],
  },
  {
    icon: Eye,
    title: '3. Third-Party Services',
    content: [
      'We use third-party translation APIs to process your translations. These services have their own privacy policies regarding data handling.',
      'Text submitted for translation is sent securely over HTTPS to our API partners.',
      'We do not share your personal information with third parties for marketing or advertising purposes.',
      'Voice input is processed locally by your browser\'s built-in speech recognition engine when available.',
    ],
  },
  {
    icon: UserCheck,
    title: '4. Your Rights',
    content: [
      'You have full control over your data. All translation history and favorites can be deleted at any time from within the application.',
      'You can request information about what data is stored on your device through the application settings.',
      'Since we do not store personal data on our servers, there is minimal risk of data breaches affecting your personal information.',
      'You have the right to stop using the service at any time, and all locally stored data will remain on your device until you clear your browser data.',
    ],
  },
  {
    icon: Shield,
    title: '5. Security',
    content: [
      'All communications between your browser and our services are encrypted using HTTPS/TLS protocols.',
      'We implement industry-standard security measures to protect against unauthorized access.',
      'Translation data is processed in real-time and is not permanently stored on our servers.',
      'We regularly review and update our security practices to ensure the highest level of protection.',
    ],
  },
  {
    icon: Mail,
    title: '6. Contact Information',
    content: [
      'If you have questions about this Privacy Policy or your data, please contact us at hello@linguareply.ai.',
      'We will respond to privacy-related inquiries within 30 business days.',
      'You can also reach us through our Contact page for any concerns regarding data privacy.',
    ],
  },
];

export default function Privacy() {
  return (
    <main className="pt-24 pb-12">
      {/* Hero */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb w-72 h-72 bg-primary-400 top-0 left-1/4" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
              <Shield className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Legal
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-10 p-6 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
          >
            <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">
              At LinguaReply AI, we take your privacy seriously. This Privacy Policy
              explains how we handle your data when you use our translation
              platform. Our core principle is simple: your data belongs to you,
              and we minimize the data we collect.
            </p>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.05 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                    <section.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-3 pl-11">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              This Privacy Policy may be updated from time to time. We will notify
              users of any significant changes by updating the &quot;Last updated&quot;
              date at the top of this page. Your continued use of the service
              after any changes constitutes your acceptance of the updated policy.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
