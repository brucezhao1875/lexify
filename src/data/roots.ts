import { RootInfo, WordInfo } from '@/types';

// 常见英语词根数据
export const ROOT_DATABASE: Record<string, RootInfo> = {
  // 教育相关词根
  'educ': {
    root: 'educ',
    meaning: '引导，教育',
    origin: 'latin',
    examples: ['education', 'educate', 'educator', 'educational']
  },
  'duct': {
    root: 'duct',
    meaning: '引导，带领',
    origin: 'latin',
    examples: ['conduct', 'deduct', 'induce', 'produce', 'reduce']
  },
  'struct': {
    root: 'struct',
    meaning: '建造，构造',
    origin: 'latin',
    examples: ['construct', 'structure', 'destruct', 'instruct', 'obstruct']
  },
  'spect': {
    root: 'spect',
    meaning: '看，观察',
    origin: 'latin',
    examples: ['inspect', 'respect', 'suspect', 'prospect', 'retrospect']
  },
  'port': {
    root: 'port',
    meaning: '携带，运输',
    origin: 'latin',
    examples: ['transport', 'import', 'export', 'support', 'report']
  },
  'form': {
    root: 'form',
    meaning: '形状，形式',
    origin: 'latin',
    examples: ['transform', 'inform', 'perform', 'reform', 'conform']
  },
  'ject': {
    root: 'ject',
    meaning: '投掷，扔',
    origin: 'latin',
    examples: ['project', 'reject', 'inject', 'object', 'subject']
  },
  'mit': {
    root: 'mit',
    meaning: '发送，派遣',
    origin: 'latin',
    examples: ['submit', 'permit', 'commit', 'transmit', 'emit']
  },
  'press': {
    root: 'press',
    meaning: '压，按',
    origin: 'latin',
    examples: ['express', 'impress', 'compress', 'depress', 'suppress']
  },
  'tract': {
    root: 'tract',
    meaning: '拉，拖',
    origin: 'latin',
    examples: ['attract', 'extract', 'contract', 'distract', 'subtract']
  }
};

// 单词数据库
export const WORD_DATABASE: Record<string, WordInfo> = {
  'education': {
    word: 'education',
    meaning: '教育',
    level: 'cet4',
    roots: ['educ', 'duct'],
    relatedWords: ['educate', 'educator', 'educational', 'conduct', 'deduct']
  },
  'educate': {
    word: 'educate',
    meaning: '教育，培养',
    level: 'cet4',
    roots: ['educ', 'duct'],
    relatedWords: ['education', 'educator', 'educational', 'conduct', 'deduct']
  },
  'construct': {
    word: 'construct',
    meaning: '建造，构造',
    level: 'cet6',
    roots: ['struct'],
    relatedWords: ['construction', 'structure', 'destruct', 'instruct', 'obstruct']
  },
  'inspect': {
    word: 'inspect',
    meaning: '检查，视察',
    level: 'cet6',
    roots: ['spect'],
    relatedWords: ['inspection', 'respect', 'suspect', 'prospect', 'retrospect']
  },
  'transport': {
    word: 'transport',
    meaning: '运输，运送',
    level: 'cet4',
    roots: ['port'],
    relatedWords: ['transportation', 'import', 'export', 'support', 'report']
  },
  'transform': {
    word: 'transform',
    meaning: '改变，转换',
    level: 'cet6',
    roots: ['form'],
    relatedWords: ['transformation', 'inform', 'perform', 'reform', 'conform']
  },
  'project': {
    word: 'project',
    meaning: '项目，计划',
    level: 'cet4',
    roots: ['ject'],
    relatedWords: ['projection', 'reject', 'inject', 'object', 'subject']
  },
  'submit': {
    word: 'submit',
    meaning: '提交，屈服',
    level: 'cet6',
    roots: ['mit'],
    relatedWords: ['submission', 'permit', 'commit', 'transmit', 'emit']
  },
  'express': {
    word: 'express',
    meaning: '表达，快递',
    level: 'cet4',
    roots: ['press'],
    relatedWords: ['expression', 'impress', 'compress', 'depress', 'suppress']
  },
  'attract': {
    word: 'attract',
    meaning: '吸引',
    level: 'cet4',
    roots: ['tract'],
    relatedWords: ['attraction', 'extract', 'contract', 'distract', 'subtract']
  }
};

// 词根分析函数
export function analyzeWordRoots(word: string): string[] {
  const normalizedWord = word.toLowerCase();
  const foundRoots: string[] = [];
  
  // 遍历所有词根，查找匹配
  for (const [root, rootInfo] of Object.entries(ROOT_DATABASE)) {
    if (normalizedWord.includes(root)) {
      foundRoots.push(root);
    }
  }
  
  return foundRoots;
}

// 获取词根的相关单词
export function getRelatedWords(root: string): WordInfo[] {
  const relatedWords: WordInfo[] = [];
  
  for (const [word, wordInfo] of Object.entries(WORD_DATABASE)) {
    if (wordInfo.roots.includes(root)) {
      relatedWords.push(wordInfo);
    }
  }
  
  return relatedWords;
}

// 根据用户水平过滤单词
export function filterWordsByUserLevel(words: WordInfo[], userLevel: string): WordInfo[] {
  const levelHierarchy = ['cet4', 'cet6', 'toefl', 'ielts', 'gre', 'advanced'];
  const userLevelIndex = levelHierarchy.indexOf(userLevel);
  
  return words.filter(word => {
    const wordLevelIndex = levelHierarchy.indexOf(word.level);
    return wordLevelIndex <= userLevelIndex;
  });
}