import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 用户水平配置
export const USER_LEVELS = {
  cet4: { name: 'CET-4', description: '大学英语四级', difficulty: 1 },
  cet6: { name: 'CET-6', description: '大学英语六级', difficulty: 2 },
  toefl: { name: 'TOEFL', description: '托福考试', difficulty: 3 },
  ielts: { name: 'IELTS', description: '雅思考试', difficulty: 3 },
  gre: { name: 'GRE', description: '研究生入学考试', difficulty: 4 },
  advanced: { name: 'Advanced', description: '高级英语', difficulty: 5 },
} as const;

// 根据用户水平过滤单词难度
export function filterWordsByLevel(words: string[], userLevel: keyof typeof USER_LEVELS): string[] {
  const levelDifficulty = USER_LEVELS[userLevel].difficulty;
  
  // 这里可以根据实际需求实现更复杂的过滤逻辑
  // 目前简单返回所有单词，后续可以基于词频、难度等指标过滤
  return words;
}

// 验证单词格式
export function isValidWord(word: string): boolean {
  return /^[a-zA-Z]+$/.test(word) && word.length >= 2 && word.length <= 50;
}

// 清理和标准化单词
export function normalizeWord(word: string): string {
  return word.toLowerCase().trim();
}

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// 计算词根网络深度
export function calculateGraphDepth(nodes: any[]): number {
  if (nodes.length === 0) return 0;
  return Math.max(...nodes.map(node => node.level || 0));
}