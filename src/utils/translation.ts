import { getLanguageName } from './languages';

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
}

// Google Translate unofficial API — much better quality for all languages including Hindi, Gujarati, etc.
const GOOGLE_API = 'https://translate.googleapis.com/translate_a/single';

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> {
  const sl = sourceLang === 'auto' ? 'auto' : sourceLang;
  const url = `${GOOGLE_API}?client=gtx&dt=t&sl=${sl}&tl=${targetLang}&q=${encodeURIComponent(text)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Translation failed. Please try again.');
  }

  const data = await response.json();

  // Google returns an array of sentences: [[translated text, original text, ...], ...]
  let translatedText = '';
  if (data && Array.isArray(data[0])) {
    translatedText = data[0]
      .map((segment: string[]) => (segment[0] || ''))
      .join('');
  }

  // Detected language is in data[2]
  const detectedLang: string = data[2] || sourceLang;

  return {
    translatedText,
    sourceLanguage: sourceLang === 'auto' ? detectedLang : sourceLang,
    targetLanguage: targetLang,
    sourceText: text,
  };
}

export interface DetectedLanguage {
  language: string;
  name: string;
  confidence: number;
}

export function detectLanguageSimple(text: string): DetectedLanguage {
  const patterns: Record<string, RegExp> = {
    zh: /[\u4e00-\u9fff]/,
    ja: /[\u3040-\u309f\u30a0-\u30ff]/,
    ko: /[\uac00-\ud7af\u1100-\u11ff]/,
    ar: /[\u0600-\u06ff]/,
    he: /[\u0590-\u05ff]/,
    hi: /[\u0900-\u097f]/,
    bn: /[\u0980-\u09ff]/,
    pa: /[\u0a00-\u0a7f]/,
    gu: /[\u0a80-\u0aff]/,
    ta: /[\u0b80-\u0bff]/,
    te: /[\u0c00-\u0c7f]/,
    kn: /[\u0c80-\u0cff]/,
    ml: /[\u0d00-\u0d7f]/,
    or: /[\u0b00-\u0b7f]/,
    ur: /[\u0600-\u06ff]/,
    ru: /[\u0400-\u04ff]/,
    el: /[\u0370-\u03ff]/,
    th: /[\u0e00-\u0e7f]/,
    ka: /[\u10a0-\u10ff]/,
    hy: /[\u0530-\u058f]/,
    fa: /[\ufe00-\ufe0f]/,
  };

  for (const [lang, regex] of Object.entries(patterns)) {
    if (regex.test(text)) {
      return {
        language: lang,
        name: getLanguageName(lang),
        confidence: 0.9,
      };
    }
  }

  return {
    language: 'en',
    name: 'English',
    confidence: 0.5,
  };
}

export function generateSmartReplies(
  translatedText: string,
  _sourceLanguage?: string,
  _targetLanguage?: string
): string[] {
  const lowerText = translatedText.toLowerCase().trim();

  const greetingPatterns = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'hola', 'bonjour', 'ciao', 'namaste', 'namastē', 'guten tag', 'olá', 'こんにちは', '你好', '안녕', 'નમસ્તે', 'नमस्ते', 'सत श्री अकाल'];
  const questionPatterns = ['how are you', 'how do you do', 'how is it going', "what's up", 'how are things', 'how have you been', 'કેમ છો', 'કેમ છો?', 'कैसे हो', 'कैसे हो?', 'कैसे हैं आप', 'எப்படி இருக்கிறீர்கள்'];
  const thanksPatterns = ['thank', 'thanks', 'grateful', 'appreciate', 'merci', 'gracias', 'danke', 'ありがとう', 'धन्यवाद', 'આભાર', 'ધન્યવાદ'];
  const byePatterns = ['goodbye', 'bye', 'see you', 'farewell', 'take care', 'adiós', 'au revoir', 'arrivederci', 'さようなら', 'अलविदा', 'આવજો'];
  const helpPatterns = ['help', 'assist', 'support', 'can you', 'could you', 'please', 'मदद', 'મદદ'];
  const yesNoPatterns = ['do you', 'is it', 'are you', 'can we', 'will you', 'would you'];

  const replies: string[] = [];

  const isGreeting = greetingPatterns.some(p => lowerText.includes(p));
  const isQuestion = questionPatterns.some(p => lowerText.includes(p));
  const isThanks = thanksPatterns.some(p => lowerText.includes(p));
  const isBye = byePatterns.some(p => lowerText.includes(p));
  const isHelp = helpPatterns.some(p => lowerText.includes(p));
  const isYesNo = yesNoPatterns.some(p => lowerText.includes(p));

  if (isGreeting) {
    replies.push(
      'Hello! It\'s great to hear from you.',
      'Hi there! How can I help you today?',
      'Hey! Nice to connect with you.'
    );
  } else if (isQuestion) {
    replies.push(
      'I\'m doing great, thank you for asking! How about you?',
      'Everything is going well. I appreciate you checking in!',
      'I\'m fine, thanks! How are things on your end?'
    );
  } else if (isThanks) {
    replies.push(
      'You\'re welcome! Happy to help.',
      'My pleasure! Let me know if you need anything else.',
      'Glad I could assist. Don\'t hesitate to reach out anytime!'
    );
  } else if (isBye) {
    replies.push(
      'Goodbye! Have a wonderful day.',
      'See you soon! Take care.',
      'Farewell! Looking forward to our next conversation.'
    );
  } else if (isHelp) {
    replies.push(
      'Of course! I\'d be happy to help you with that.',
      'Absolutely, let me look into this for you right away.',
      'Sure thing! Could you provide me with a few more details?'
    );
  } else if (isYesNo) {
    replies.push(
      'Yes, absolutely! That works perfectly for me.',
      'I think that\'s a great idea. Let\'s go ahead with it.',
      'Let me check on that and get back to you shortly.'
    );
  }

  if (replies.length === 0) {
    replies.push(
      'Thank you for your message. I\'ll get back to you shortly.',
      'I understand. Let me review this and respond in detail.',
      'Got it! I appreciate you sharing this with me.'
    );
  }

  return replies.slice(0, 3);
}

// Map common language codes to BCP-47 for speech
function toSpeechLang(code: string): string {
  const map: Record<string, string> = {
    'zh': 'zh-CN', 'zh-TW': 'zh-TW', 'pt': 'pt-BR', 'en': 'en-US',
    'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE', 'it': 'it-IT',
    'ja': 'ja-JP', 'ko': 'ko-KR', 'ru': 'ru-RU', 'ar': 'ar-SA',
    'hi': 'hi-IN', 'bn': 'bn-IN', 'ta': 'ta-IN', 'te': 'te-IN',
    'gu': 'gu-IN', 'pa': 'pa-IN', 'mr': 'mr-IN', 'kn': 'kn-IN',
    'ml': 'ml-IN', 'ur': 'ur-PK', 'fa': 'fa-IR', 'tr': 'tr-TR',
    'vi': 'vi-VN', 'th': 'th-TH', 'pl': 'pl-PL', 'nl': 'nl-NL',
    'sv': 'sv-SE', 'da': 'da-DK', 'no': 'nb-NO', 'fi': 'fi-FI',
    'el': 'el-GR', 'he': 'he-IL', 'cs': 'cs-CZ', 'ro': 'ro-RO',
    'hu': 'hu-HU', 'uk': 'uk-UA', 'id': 'id-ID', 'ms': 'ms-MY',
  };
  return map[code] || code;
}

export function speakText(
  text: string,
  lang: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): void {
  const synth = window.speechSynthesis;

  // Always cancel any ongoing speech first
  synth.cancel();

  const langCode = toSpeechLang(lang);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to find a matching voice
  const trySpeak = () => {
    const voices = synth.getVoices();
    const match = voices.find(v => v.lang === langCode) 
      || voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (match) {
      utterance.voice = match;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = (e) => {
      // 'canceled' is normal when we call cancel(), ignore it
      if (e.error !== 'canceled') {
        onError?.();
      }
    };

    // Chrome workaround: keep synth alive for longer texts
    const resumeInterval = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(resumeInterval);
        return;
      }
      synth.pause();
      synth.resume();
    }, 10000);

    utterance.onend = () => {
      clearInterval(resumeInterval);
      onEnd?.();
    };

    synth.speak(utterance);
  };

  // Voices might already be loaded
  const voices = synth.getVoices();
  if (voices.length > 0) {
    trySpeak();
  } else {
    // Wait for voices to load (Firefox/Safari load them async)
    synth.onvoiceschanged = () => {
      synth.onvoiceschanged = null;
      trySpeak();
    };
    // Fallback timeout in case onvoiceschanged never fires
    setTimeout(() => {
      if (synth.getVoices().length > 0) {
        trySpeak();
      } else {
        // Try anyway without specific voice
        utterance.onstart = () => onStart?.();
        utterance.onend = () => onEnd?.();
        utterance.onerror = () => onError?.();
        synth.speak(utterance);
      }
    }, 1000);
  }
}
