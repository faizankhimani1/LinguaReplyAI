import { Globe, Heart, ExternalLink, Share2, Link2, Mail } from 'lucide-react';
import { useStore } from '@/store/useStore';

const footerLinks = {
  Product: [
    { label: 'Translator', page: 'home' },
    { label: 'Features', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms & Conditions', page: 'terms' },
  ],
  Resources: [
    { label: 'API Documentation', page: '#' },
    { label: 'Help Center', page: '#' },
    { label: 'Blog', page: '#' },
  ],
};

export default function Footer() {
  const { setCurrentPage } = useStore();

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-100/50 dark:via-slate-900/50 dark:to-slate-950/50 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-7 h-7 text-primary-500" />
              <span className="text-lg font-bold">
                <span className="gradient-text">LinguaReply</span>
                <span className="text-slate-400 font-light ml-1">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              AI-powered translation platform that helps you communicate across
              languages with smart reply suggestions.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-slate-500 hover:text-primary-500 transition-all"
                aria-label="GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-slate-500 hover:text-primary-500 transition-all"
                aria-label="Twitter"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-slate-500 hover:text-primary-500 transition-all"
                aria-label="LinkedIn"
              >
                <Link2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-slate-500 hover:text-primary-500 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.page)}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} LinguaReply AI. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for the world
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
