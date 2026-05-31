import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TranslationHistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: number;
  isFavorite: boolean;
}

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Translation
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  swapLanguages: () => void;

  // Translation state
  sourceText: string;
  translatedText: string;
  isTranslating: boolean;
  detectedLanguage: string;
  setSourceText: (text: string) => void;
  setTranslatedText: (text: string) => void;
  setIsTranslating: (val: boolean) => void;
  setDetectedLanguage: (lang: string) => void;

  // Smart replies
  smartReplies: string[];
  setSmartReplies: (replies: string[]) => void;

  // History
  history: TranslationHistoryItem[];
  addToHistory: (item: Omit<TranslationHistoryItem, 'id' | 'timestamp' | 'isFavorite'>) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  searchHistory: (query: string) => TranslationHistoryItem[];

  // Favorites
  toggleFavorite: (id: string) => void;
  getFavorites: () => TranslationHistoryItem[];
  removeFavorite: (id: string) => void;

  // Voice
  isListening: boolean;
  setIsListening: (val: boolean) => void;
  isSpeaking: boolean;
  setIsSpeaking: (val: boolean) => void;

  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),

      // Translation languages
      sourceLanguage: 'auto',
      targetLanguage: 'es',
      setSourceLanguage: (lang) => set({ sourceLanguage: lang }),
      setTargetLanguage: (lang) => set({ targetLanguage: lang }),
      swapLanguages: () =>
        set((state) => {
          if (state.sourceLanguage === 'auto') return state;
          return {
            sourceLanguage: state.targetLanguage,
            targetLanguage: state.sourceLanguage,
            sourceText: state.translatedText,
            translatedText: state.sourceText,
          };
        }),

      // Translation state
      sourceText: '',
      translatedText: '',
      isTranslating: false,
      detectedLanguage: '',
      setSourceText: (text) => set({ sourceText: text }),
      setTranslatedText: (text) => set({ translatedText: text }),
      setIsTranslating: (val) => set({ isTranslating: val }),
      setDetectedLanguage: (lang) => set({ detectedLanguage: lang }),

      // Smart replies
      smartReplies: [],
      setSmartReplies: (replies) => set({ smartReplies: replies }),

      // History
      history: [],
      addToHistory: (item) =>
        set((state) => {
          const newItem: TranslationHistoryItem = {
            ...item,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            isFavorite: false,
          };
          const history = [newItem, ...state.history].slice(0, 50);
          return { history };
        }),
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
      searchHistory: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().history.filter(
          (item) =>
            item.sourceText.toLowerCase().includes(lowerQuery) ||
            item.translatedText.toLowerCase().includes(lowerQuery)
        );
      },

      // Favorites
      toggleFavorite: (id) =>
        set((state) => ({
          history: state.history.map((item) =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
          ),
        })),
      getFavorites: () => get().history.filter((item) => item.isFavorite),
      removeFavorite: (id) =>
        set((state) => ({
          history: state.history.map((item) =>
            item.id === id ? { ...item, isFavorite: false } : item
          ),
        })),

      // Voice
      isListening: false,
      setIsListening: (val) => set({ isListening: val }),
      isSpeaking: false,
      setIsSpeaking: (val) => set({ isSpeaking: val }),

      // Navigation
      currentPage: 'home',
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'linguareply-storage',
      partialize: (state) => ({
        theme: state.theme,
        history: state.history,
        sourceLanguage: state.sourceLanguage,
        targetLanguage: state.targetLanguage,
      }),
    }
  )
);
