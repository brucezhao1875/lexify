import { Pronunciation } from '@/types';

// 使用免费的词典API获取发音信息
export class PronunciationService {
  // 使用Collins Dictionary API (免费)
  private static COLLINS_API_BASE = 'https://api.collinsdictionary.com/api/v1';
  
  // 使用Free Dictionary API (免费，无需API key)
  private static FREE_DICT_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  /**
   * 获取单词的发音信息
   */
  static async getPronunciations(word: string): Promise<{
    us?: Pronunciation;
    uk?: Pronunciation;
  }> {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') {
      return this.generateFallbackPronunciation(word);
    }

    try {
      // 首先尝试Free Dictionary API
      const response = await fetch(`${this.FREE_DICT_API}/${word}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return this.parsePronunciationData(word, data);
    } catch (error) {
      console.warn(`Failed to fetch pronunciation for ${word}:`, error);
      
      // 返回基于规则的音标作为fallback
      return this.generateFallbackPronunciation(word);
    }
  }

  /**
   * 解析API返回的发音数据
   */
  private static parsePronunciationData(word: string, data: unknown[]): {
    us?: Pronunciation;
    uk?: Pronunciation;
  } {
    const result: { us?: Pronunciation; uk?: Pronunciation } = {};

    if (!Array.isArray(data) || data.length === 0) {
      return this.generateFallbackPronunciation(word);
    }

    const firstEntry = data[0] as Record<string, unknown>;
    
    // 解析音标和音频
    const phonetics = (firstEntry.phonetics as unknown[]) || [];
    
    for (const phonetic of phonetics) {
      const phoneticObj = phonetic as Record<string, string>;
      const phoneticText = phoneticObj.text || '';
      const audioUrl = phoneticObj.audio || '';
      
      // 判断口音类型
      if (phoneticText && audioUrl) {
        if (phoneticText.includes('US') || phoneticText.includes('us')) {
          result.us = {
            phonetic: phoneticText.replace(/\[US\]/g, '').trim(),
            audio: audioUrl,
            accent: 'us'
          };
        } else if (phoneticText.includes('UK') || phoneticText.includes('uk')) {
          result.uk = {
            phonetic: phoneticText.replace(/\[UK\]/g, '').trim(),
            audio: audioUrl,
            accent: 'uk'
          };
        }
      }
    }

    // 如果没有找到特定的口音信息，使用第一个可用的音标
    if (!result.us && !result.uk && phonetics.length > 0) {
      const firstPhonetic = phonetics[0] as Record<string, string>;
      if (firstPhonetic.text) {
        const phoneticText = firstPhonetic.text.replace(/\[(US|UK)\]/g, '').trim();
        const audioUrl = firstPhonetic.audio || '';
        
        // 默认当作美式发音
        result.us = {
          phonetic: phoneticText,
          audio: audioUrl,
          accent: 'us'
        };
      }
    }

    // 如果API没有返回音频，使用TTS服务生成音频
    if (result.us && !result.us.audio) {
      result.us.audio = this.generateTTSUrl(word, 'us');
    }
    if (result.uk && !result.uk.audio) {
      result.uk.audio = this.generateTTSUrl(word, 'uk');
    }

    return result;
  }

  /**
   * 生成fallback发音信息（基于规则）
   */
  private static generateFallbackPronunciation(word: string): {
    us?: Pronunciation;
    uk?: Pronunciation;
  } {
    // 简单的音标生成规则（这里可以根据需要扩展）
    const phonetic = this.generateSimplePhonetic(word);
    
    return {
      us: {
        phonetic: phonetic,
        audio: this.generateTTSUrl(word, 'us'),
        accent: 'us'
      },
      uk: {
        phonetic: phonetic,
        audio: this.generateTTSUrl(word, 'uk'),
        accent: 'uk'
      }
    };
  }

  /**
   * 生成简单的音标（基础版本）
   */
  private static generateSimplePhonetic(word: string): string {
    // 这里只是一个非常基础的实现
    // 实际项目中可以使用更复杂的音标转换规则
    return `[${word.toLowerCase()}]`;
  }

  /**
   * 生成TTS音频URL
   */
  private static generateTTSUrl(word: string, accent: 'us' | 'uk'): string {
    // 使用Google TTS或其他TTS服务
    // 这里使用一个简单的文本转语音API
    const lang = accent === 'us' ? 'en-US' : 'en-GB';
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=${lang}&client=tw-ob`;
  }

  /**
   * 播放发音音频
   */
  static async playPronunciation(audioUrl: string): Promise<void> {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
      // 可以在这里实现fallback的音频播放方式
      this.showPronunciationError();
    }
  }

  /**
   * 显示发音错误提示
   */
  private static showPronunciationError(): void {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') {
      return;
    }

    // 使用浏览器的speechSynthesis API作为fallback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Pronunciation audio not available');
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  }

  /**
   * 缓存发音信息
   */
  private static pronunciationCache = new Map<string, {
    us?: Pronunciation;
    uk?: Pronunciation;
  }>();

  /**
   * 获取缓存的发音信息
   */
  static async getCachedPronunciation(word: string): Promise<{
    us?: Pronunciation;
    uk?: Pronunciation;
  }> {
    if (this.pronunciationCache.has(word)) {
      return this.pronunciationCache.get(word)!;
    }

    const pronunciations = await this.getPronunciations(word);
    this.pronunciationCache.set(word, pronunciations);
    return pronunciations;
  }

  /**
   * 清除缓存
   */
  static clearCache(): void {
    this.pronunciationCache.clear();
  }
}