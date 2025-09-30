// 用户水平类型
export type UserLevel = 'cet4' | 'cet6' | 'toefl' | 'ielts' | 'gre' | 'advanced';

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

// 单词信息
export interface WordInfo {
  word: string;
  pronunciation?: string;
  meaning: string;
  level: UserLevel;
  roots: string[]; // 包含的词根
  relatedWords: string[]; // 相关单词
}

// 词根网络节点
export interface GraphNode {
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

// 词根分析结果
export interface RootAnalysisResult {
  word: string;
  roots: RootInfo[];
  relatedWords: WordInfo[];
  graph: WordGraph;
}