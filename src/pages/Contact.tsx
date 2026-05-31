import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  ExternalLink,
  Link2,
  Share2,
  Globe,
} from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'khimanifaizan228@gmail.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Rajkot, Gujarat, India',
    description: 'Open to collaborations worldwide',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon - Fri, 9am - 6pm PST',
    description: 'Weekend support via email',
  },
];

const socialLinks = [
  { icon: ExternalLink, label: 'GitHub', href: 'https://github.com/faizankhimani1' },
  // { icon: Share2, label: 'Twitter', href: '#' },
  // { icon: Link2, label: 'LinkedIn', href: 'www.linkedin.com/in/faizan-khimani-' },
  { icon: Globe, label: 'Website', href: 'https://faizankhimani.netlify.app/' },


];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main className="pt-24 pb-12">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb w-72 h-72 bg-primary-400 top-0 right-1/4" />
          <div className="orb w-60 h-60 bg-accent-400 bottom-0 left-1/4" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
              <MessageSquare className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Contact Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Have questions, feedback, or want to collaborate? We&apos;d love to
              hear from you. Fill out the form below and we&apos;ll get back to you
              as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div
                      key={info.title}
                      className="flex items-start gap-4"
                    >
                      <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                        <info.icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {info.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {info.value}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="pt-6 border-t border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-500 hover:text-primary-500 transition-all"
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Project Info */}
              {/* <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Project Information
                </h3>
                <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <p>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Version:
                    </span>{' '}
                    1.0.0
                  </p>
                  <p>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      License:
                    </span>{' '}
                    MIT
                  </p>
                  <p>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Status:
                    </span>{' '}
                    <span className="text-green-500">Active Development</span>
                  </p>
                </div>
              </motion.div> */}
            </div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-3"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg shadow-black/5 dark:shadow-black/20">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Thank you for reaching out. We&apos;ll get back to you within
                      24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register('name', {
                            required: 'Name is required',
                          })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-900 dark:text-white transition-all"
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-900 dark:text-white transition-all"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        {...register('subject', {
                          required: 'Please select a subject',
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-900 dark:text-white transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="business">Business Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message', {
                          required: 'Message is required',
                          minLength: {
                            value: 10,
                            message:
                              'Message must be at least 10 characters',
                          },
                        })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm text-slate-900 dark:text-white transition-all resize-none"
                        placeholder="Tell us how we can help..."
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
