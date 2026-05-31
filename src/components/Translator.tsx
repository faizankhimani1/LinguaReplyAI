import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRightLeft,
  Copy,
  Check,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Star,
  StarOff,
  Trash2,
  History,
  Sparkles,
  ChevronDown,
  Search,
  X,
  Loader2,
  Bookmark,
  BookmarkCheck,
  Languages,
} from 'lucide-react';
import { toast } from 'sonner';
import { useStore } from '@/store/useStore';
import {
  languages,
  popularLanguages,
  getLanguageName,
  getLanguageFlag,
} from '@/utils/languages';
import {
  translateText,
  detectLanguageSimple,
  generateSmartReplies,
  speakText,
} from '@/utils/translation';

// Speech Recognition types
interface SpeechRecognitionResult {
  transcript: string;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: { isFinal: boolean; [index: number]: SpeechRecognitionResult };
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export default function Translator() {
  const {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguages,
    sourceText,
    translatedText,
    isTranslating,
    detectedLanguage,
    setSourceText,
    setTranslatedText,
    setIsTranslating,
    setDetectedLanguage,
    smartReplies,
    setSmartReplies,
    addToHistory,
    history,
    toggleFavorite,
    isListening,
    setIsListening,
    isSpeaking,
    setIsSpeaking,
  } = useStore();

  const [copiedSource, setCopiedSource] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState(false);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MAX_CHARS = 5000;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSourceDropdown(false);
        setShowTargetDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ==========================================
  // REAL-TIME AUTO-TRANSLATION (debounced)
  // ==========================================
  const doTranslate = useCallback(async (text: string, srcLang: string, tgtLang: string) => {
    if (!text.trim()) {
      setTranslatedText('');
      setSmartReplies([]);
      setDetectedLanguage('');
      return;
    }

    setIsTranslating(true);
    try {
      const result = await translateText(text, srcLang, tgtLang);
      setTranslatedText(result.translatedText);
      setDetectedLanguage(result.sourceLanguage);

      // Generate smart replies in English, then translate to target language
      const englishReplies = generateSmartReplies(result.translatedText);
      try {
        const translatedReplies = await Promise.all(
          englishReplies.map(async (reply) => {
            const r = await translateText(reply, 'en', tgtLang);
            return r.translatedText;
          })
        );
        setSmartReplies(translatedReplies);
      } catch {
        // Fallback: show English replies if translation fails
        setSmartReplies(englishReplies);
      }

      // Add to history
      addToHistory({
        sourceText: result.sourceText,
        translatedText: result.translatedText,
        sourceLanguage: result.sourceLanguage,
        targetLanguage: result.targetLanguage,
      });
    } catch {
      toast.error('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  }, [setTranslatedText, setSmartReplies, setDetectedLanguage, addToHistory, setIsTranslating]);

  // Debounced auto-translate: fires 700ms after user stops typing
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!sourceText.trim()) {
      setTranslatedText('');
      setSmartReplies([]);
      setDetectedLanguage('');
      return;
    }

    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      doTranslate(sourceText, sourceLanguage, targetLanguage);
    }, 700);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [sourceText, sourceLanguage, targetLanguage, doTranslate, setTranslatedText, setSmartReplies, setDetectedLanguage]);

  // Also translate immediately when language changes (if there's already text)
  useEffect(() => {
    if (sourceText.trim()) {
      doTranslate(sourceText, sourceLanguage, targetLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceLanguage, targetLanguage]);

  // Handle source text change
  const handleSourceChange = (text: string) => {
    setSourceText(text);
    if (sourceLanguage === 'auto' && text.trim()) {
      const detected = detectLanguageSimple(text);
      setDetectedLanguage(detected.language);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, type: 'source' | 'target') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'source') {
        setCopiedSource(true);
        setTimeout(() => setCopiedSource(false), 2000);
      } else {
        setCopiedTarget(true);
        setTimeout(() => setCopiedTarget(false), 2000);
      }
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  // Voice Input
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;
    const recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = sourceLanguage === 'auto' ? '' : sourceLanguage;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setSourceText(finalTranscript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice input failed. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    toast.info('Listening... Speak now');
  };

  // Text-to-Speech
  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!translatedText) {
      toast.error('No translation to speak');
      return;
    }

    speakText(
      translatedText,
      targetLanguage,
      () => setIsSpeaking(true),   // onStart
      () => setIsSpeaking(false),  // onEnd
      () => {                      // onError
        setIsSpeaking(false);
        toast.error('Speech failed. Your browser may not support this language.');
      }
    );
  };

  // Filter languages for dropdown
  const filteredLanguages = languages.filter(
    (l) =>
      l.code !== 'auto' &&
      (l.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
        l.nativeName.toLowerCase().includes(languageSearch.toLowerCase()))
  );

  const favorites = history.filter((item) => item.isFavorite);

  return (
    <section id="translator" className="relative py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            <Languages className="inline-block w-8 h-8 mr-2 text-primary-500" />
            Translate Instantly
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Just start typing — translation happens automatically in real-time
          </p>
        </motion.div>

        {/* Translator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden"
        >
          {/* Language Selector Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30" ref={dropdownRef}>
            {/* Source Language */}
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setShowSourceDropdown(!showSourceDropdown);
                  setShowTargetDropdown(false);
                  setLanguageSearch('');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <span>{getLanguageFlag(sourceLanguage === 'auto' ? detectedLanguage || 'en' : sourceLanguage)}</span>
                <span>{sourceLanguage === 'auto' ? (detectedLanguage ? getLanguageName(detectedLanguage) : 'Auto Detect') : getLanguageName(sourceLanguage)}</span>
                {sourceLanguage === 'auto' && (
                  <span className="text-xs px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                    Auto
                  </span>
                )}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {showSourceDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl z-50"
                  >
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search languages..."
                          value={languageSearch}
                          onChange={(e) => setLanguageSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto max-h-60 p-2">
                      <button
                        onClick={() => {
                          setSourceLanguage('auto');
                          setShowSourceDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          sourceLanguage === 'auto'
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>🌐</span>
                        <span>Auto Detect</span>
                      </button>
                      {filteredLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSourceLanguage(lang.code);
                            setShowSourceDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            sourceLanguage === lang.code
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                          <span className="text-xs text-slate-400 ml-auto">
                            {lang.nativeName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Swap Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={swapLanguages}
              className="p-2.5 mx-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-500 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
              aria-label="Swap languages"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </motion.button>

            {/* Target Language */}
            <div className="relative flex-1 flex justify-end">
              <button
                onClick={() => {
                  setShowTargetDropdown(!showTargetDropdown);
                  setShowSourceDropdown(false);
                  setLanguageSearch('');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <span>{getLanguageFlag(targetLanguage)}</span>
                <span>{getLanguageName(targetLanguage)}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {showTargetDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-72 max-h-80 overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl z-50"
                  >
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                      {/* Popular languages */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {popularLanguages.map((code) => {
                          const lang = languages.find((l) => l.code === code);
                          if (!lang) return null;
                          return (
                            <button
                              key={code}
                              onClick={() => {
                                setTargetLanguage(code);
                                setShowTargetDropdown(false);
                              }}
                              className={`text-xs px-2 py-1 rounded-md transition-colors ${
                                targetLanguage === code
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                              }`}
                            >
                              {lang.flag} {lang.name}
                            </button>
                          );
                        })}
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search languages..."
                          value={languageSearch}
                          onChange={(e) => setLanguageSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto max-h-60 p-2">
                      {filteredLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setTargetLanguage(lang.code);
                            setShowTargetDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            targetLanguage === lang.code
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                          <span className="text-xs text-slate-400 ml-auto">
                            {lang.nativeName}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Source */}
            <div className="relative p-4 sm:p-6 border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-700/50">
              <textarea
                ref={textareaRef}
                value={sourceText}
                onChange={(e) => handleSourceChange(e.target.value)}
                placeholder="Start typing to translate automatically..."
                maxLength={MAX_CHARS}
                className="w-full h-48 sm:h-56 text-base sm:text-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent resize-none focus:outline-none leading-relaxed"
                aria-label="Source text input"
              />

              {/* Source actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {sourceText.length}/{MAX_CHARS}
                  </span>
                  {detectedLanguage && sourceLanguage === 'auto' && sourceText.trim() && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center gap-1"
                    >
                      <span>{getLanguageFlag(detectedLanguage)}</span>
                      Detected: {getLanguageName(detectedLanguage)}
                    </motion.span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVoiceInput()}
                    className={`p-2 rounded-lg transition-all ${
                      isListening
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-500 animate-pulse'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                    aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(sourceText, 'source')}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
                    aria-label="Copy source text"
                  >
                    {copiedSource ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setSourceText('');
                      setTranslatedText('');
                      setSmartReplies([]);
                      setDetectedLanguage('');
                    }}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-red-500 transition-all"
                    aria-label="Clear text"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Target */}
            <div className="relative p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="relative h-48 sm:h-56">
                {isTranslating && sourceText.trim() ? (
                  <div className="space-y-3">
                    <div className="skeleton h-6 w-3/4 rounded-lg" />
                    <div className="skeleton h-6 w-1/2 rounded-lg" />
                    <div className="skeleton h-6 w-5/6 rounded-lg" />
                    <div className="skeleton h-6 w-2/3 rounded-lg" />
                  </div>
                ) : (
                  <div className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed overflow-y-auto h-full whitespace-pre-wrap">
                    {translatedText || (
                      <span className="text-slate-400 dark:text-slate-500 italic">
                        Translation will appear here automatically...
                      </span>
                    )}
                  </div>
                )}

                {/* Translating indicator */}
                {isTranslating && sourceText.trim() && (
                  <div className="absolute top-0 right-0 flex items-center gap-1.5 text-xs text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-full">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Translating...
                  </div>
                )}
              </div>

              {/* Target actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400">
                  {translatedText.length > 0 && `${translatedText.length} characters`}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleSpeech}
                    className={`p-2 rounded-lg transition-all ${
                      isSpeaking
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-500'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                    aria-label={isSpeaking ? 'Stop speaking' : 'Read translation aloud'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(translatedText, 'target')}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
                    aria-label="Copy translation"
                  >
                    {copiedTarget ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar - History & Favorites only, no translate button */}
          <div className="px-4 sm:px-6 py-3 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                Real-time AI translation — just type and watch
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowHistory(!showHistory);
                    setShowFavorites(false);
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    showHistory
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-500'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-slate-600'
                  }`}
                  aria-label="Translation history"
                >
                  <History className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowFavorites(!showFavorites);
                    setShowHistory(false);
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    showFavorites
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-slate-600'
                  }`}
                  aria-label="Favorites"
                >
                  {showFavorites ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Replies */}
        <AnimatePresence>
          {smartReplies.length > 0 && !isTranslating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white mb-4">
                <Sparkles className="w-5 h-5 text-primary-500" />
                Smart Reply Suggestions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {smartReplies.map((reply, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyToClipboard(reply, 'target')}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/10 transition-all text-left group"
                  >
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {reply}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-slate-400 group-hover:text-primary-500 transition-colors">
                      <Copy className="w-3 h-3" />
                      Click to copy
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Translation History */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                  <History className="w-5 h-5 text-primary-500" />
                  Translation History
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      useStore.getState().clearHistory();
                      toast.success('History cleared');
                    }}
                    className="text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                  No translation history yet
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {history.slice(0, 10).map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group hover:border-primary-300 dark:hover:border-primary-700 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                            {item.sourceText}
                          </p>
                          <p className="text-sm text-primary-500 mt-1 truncate">
                            → {item.translatedText}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400">
                              {getLanguageFlag(item.sourceLanguage)} {getLanguageName(item.sourceLanguage)}
                            </span>
                            <span className="text-xs text-slate-400">→</span>
                            <span className="text-xs text-slate-400">
                              {getLanguageFlag(item.targetLanguage)} {getLanguageName(item.targetLanguage)}
                            </span>
                            <span className="text-xs text-slate-300 dark:text-slate-600 ml-auto">
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                            aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {item.isFavorite ? (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            ) : (
                              <StarOff className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              useStore.getState().removeFromHistory(item.id);
                              toast.success('Removed from history');
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-400 hover:text-red-500 transition-colors"
                            aria-label="Remove from history"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favorites */}
        <AnimatePresence>
          {showFavorites && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white mb-4">
                <Bookmark className="w-5 h-5 text-yellow-500" />
                Favorites
              </h3>
              {favorites.length === 0 ? (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                  No favorites yet. Star a translation to save it here.
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {favorites.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-yellow-200 dark:border-yellow-800/50 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                            {item.sourceText}
                          </p>
                          <p className="text-sm text-primary-500 mt-1 truncate">
                            → {item.translatedText}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400">
                              {getLanguageFlag(item.sourceLanguage)} {getLanguageName(item.sourceLanguage)}
                            </span>
                            <span className="text-xs text-slate-400">→</span>
                            <span className="text-xs text-slate-400">
                              {getLanguageFlag(item.targetLanguage)} {getLanguageName(item.targetLanguage)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            toggleFavorite(item.id);
                            toast.success('Removed from favorites');
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                          aria-label="Remove from favorites"
                        >
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
