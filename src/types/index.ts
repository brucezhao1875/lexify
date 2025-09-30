// 用户水平类型
export type UserLevel = 'cet4' | 'cet6' | 'toefl' | 'ielts' | 'gre' | 'advanced';

// 导入D3类型（仅用于类型定义）
import * as d3 from 'd3';

// 用户配置
export interface UserConfig {
  level: UserLevel;
  targetWords: number;
  maxDepth: number; // 词根网络最大深度，默认3
}

// 词根信息
export interface RootInfo {
  root: string;
  meaning: string;
  origin: 'latin' | 'greek' | 'germanic' | 'french' | 'other';
  examples: string[];
}

// 例句信息
export interface Example {
  sentence: string;
  translation: string;
  source?: string;
}

// 单词信息
export interface WordInfo {
  word: string;
  pronunciation?: string;
  meaning: string;
  level: UserLevel;
  roots: string[]; // 包含的词根
  relatedWords: string[]; // 相关单词
  examples?: Example[]; // 例句（可选）
}

// 词根网络节点
export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  type: 'word' | 'root';
  label: string;
  data: WordInfo | RootInfo;
  level: number; // 在词根网络中的层级
}

// 词根网络边
export interface GraphEdge {
  source: string;
  target: string;
  type: 'contains' | 'derived_from' | 'related_to';
}

// 词根网络图
export interface WordGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  centerWord: string;
  maxDepth: number;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 发音信息
export interface Pronunciation {
  phonetic: string; // 音标
  audio: string; // 音频URL
  accent: 'us' | 'uk'; // 口音：美式或英式
}

// 扩展WordInfo接口
export interface EnhancedWordInfo extends WordInfo {
  pronunciation_us?: Pronunciation; // 美式发音
  pronunciation_uk?: Pronunciation; // 英式发音
}

// 词根分析结果
export interface RootAnalysisResult {
  word: string;
  roots: RootInfo[];
  relatedWords: WordInfo[];
  graph: WordGraph;
}

// 学习进度相关类型
export interface WordProgress {
  word: string;
  learnedAt: Date; // 学习时间
  lastReviewed: Date; // 最后复习时间
  reviewCount: number; // 复习次数
  masteryLevel: number; // 掌握程度 0-100
  difficulty: 'easy' | 'medium' | 'hard'; // 难度感受
  context: string; // 学习时的上下文（哪个词根分析）
}

export interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  wordsStudied: string[]; // 学习的单词列表
  rootsLearned: string[]; // 学习的词根列表
  sessionDuration: number; // 学习时长（分钟）
  focusLevel: number; // 专注度评分 1-5
  notes?: string; // 学习笔记
}

export interface LearningStats {
  totalWordsLearned: number;
  totalRootsLearned: number;
  totalStudyTime: number; // 总学习时间（分钟）
  averageMastery: number; // 平均掌握程度
  streak: number; // 连续学习天数
  longestStreak: number; // 最长连续天数
  lastStudyDate: Date; // 最后学习日期
  weeklyGoal: number; // 每周目标单词数
  weeklyProgress: number; // 本周已完成单词数
}

// 每日学习计划类型
export interface DailyPlan {
  date: Date; // 计划日期
  coreWords: string[]; // 核心词汇列表
  extendedWords: string[]; // 扩展词汇列表
  reviewWords: string[]; // 复习词汇列表
  difficulty: 'easy' | 'medium' | 'hard'; // 难度等级
  estimatedTime: number; // 预估学习时间（分钟）
  progress: 'not_started' | 'in_progress' | 'completed'; // 进度状态
  completedWords: string[]; // 已完成的单词
  notes?: string; // 学习笔记
}

// 学习目标类型
export interface LearningGoal {
  targetDate: Date; // 目标日期
  targetWords: number; // 目标词汇数量
  targetRoots: number; // 目标词根数量
  currentWords: number; // 当前已学单词数
  currentRoots: number; // 当前已学词根数
  progress: number; // 完成进度 0-100
  status: 'active' | 'completed' | 'paused'; // 目标状态
  plan: 'cet4' | 'cet6' | 'toefl' | 'ielts' | 'gre' | 'custom'; // 学习计划类型
  dailyTarget: number; // 每日目标单词数
}