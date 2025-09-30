'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Brain, BookOpen, Network, ArrowLeft, Loader2 } from 'lucide-react';
import { RootAnalysisResult, RootInfo, WordInfo, UserLevel } from '@/types';
import { analyzeWordRoots, getRelatedWords, filterWordsByUserLevel, ROOT_DATABASE, WORD_DATABASE } from '@/data/roots';
import { PronunciationPlayer } from '@/components/PronunciationPlayer';
import { WordExamples } from '@/components/WordExamples';
import { WordGraphVisualization } from '@/components/WordGraphVisualization';
import { LearningProgressService } from '@/lib/learningProgress';

interface WordAnalysisProps {
  word: string;
  userLevel: UserLevel;
  onBack: () => void;
}

export function WordAnalysis({ word, userLevel, onBack }: WordAnalysisProps) {
  const [analysisResult, setAnalysisResult] = useState<RootAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 开始学习会话（如果没有进行中的会话）
        LearningProgressService.startStudySession();
        
        // 模拟分析延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const result = analyzeWord(word, userLevel);
        setAnalysisResult(result);
        
        // 记录主单词的学习进度
        const context = result.roots.map(r => r.root).join(',');
        LearningProgressService.recordWordProgress(word, context);
        LearningProgressService.addWordToCurrentSession(word);
        
        // 记录学习的词根
        result.roots.forEach(root => {
          LearningProgressService.addRootToCurrentSession(root.root);
        });
        
      } catch {
        setError('分析失败，请重试');
      } finally {
        setIsLoading(false);
      }
    };

    performAnalysis();
  }, [word, userLevel]);

  const analyzeWord = useCallback((word: string, userLevel: UserLevel): RootAnalysisResult => {
    const normalizedWord = word.toLowerCase();
    
    // 1. 分析词根
    const foundRoots = analyzeWordRoots(normalizedWord);
    const rootInfos: RootInfo[] = foundRoots.map(root => ROOT_DATABASE[root]).filter(Boolean);
    
    // 2. 获取相关单词
    const allRelatedWords: WordInfo[] = [];
    foundRoots.forEach(root => {
      const related = getRelatedWords(root);
      allRelatedWords.push(...related);
    });
    
    // 3. 去重并过滤
    const uniqueRelatedWords = allRelatedWords.filter((word, index, self) => 
      index === self.findIndex(w => w.word === word.word)
    );
    const filteredWords = filterWordsByUserLevel(uniqueRelatedWords, userLevel);
    
    // 4. 构建词汇网络图
    const graph = buildWordGraph(normalizedWord, rootInfos, filteredWords);
    
    return {
      word: normalizedWord,
      roots: rootInfos,
      relatedWords: filteredWords,
      graph
    };
  }, []);

  const buildWordGraph = useCallback((centerWord: string, roots: RootInfo[], relatedWords: WordInfo[]) => {
    const nodes: Array<{id: string; type: 'word' | 'root'; label: string; data: WordInfo | RootInfo; level: number}> = [];
    const edges: Array<{source: string; target: string; type: 'contains' | 'derived_from' | 'related_to'}> = [];
    
    // 中心单词节点
    nodes.push({
      id: centerWord,
      type: 'word' as const,
      label: centerWord,
      data: WORD_DATABASE[centerWord] || {
        word: centerWord,
        meaning: '未知',
        level: userLevel,
        roots: [],
        relatedWords: []
      },
      level: 0
    });
    
    // 词根节点
    roots.forEach((root) => {
      nodes.push({
        id: root.root,
        type: 'root' as const,
        label: root.root,
        data: root,
        level: 1
      });
      
      // 连接中心单词和词根
      edges.push({
        source: centerWord,
        target: root.root,
        type: 'contains' as const
      });
    });
    
    // 相关单词节点
    relatedWords.slice(0, 10).forEach((word) => {
      if (word.word !== centerWord) {
        nodes.push({
          id: word.word,
          type: 'word' as const,
          label: word.word,
          data: word,
          level: 2
        });
        
        // 连接词根和相关单词
        word.roots.forEach(root => {
          if (roots.some(r => r.root === root)) {
            edges.push({
              source: root,
              target: word.word,
              type: 'derived_from' as const
            });
          }
        });
      }
    });
    
    return {
      nodes,
      edges,
      centerWord,
      maxDepth: 2
    };
  }, [userLevel]);

  const performAnalysis = () => {
    // 重新触发 useEffect 来重新分析
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      const result = analyzeWord(word, userLevel);
      setAnalysisResult(result);
      setIsLoading(false);
    }, 1000);
  };

  const getOriginColor = (origin: string) => {
    const colors = {
      latin: 'bg-blue-100 text-blue-800',
      greek: 'bg-green-100 text-green-800',
      germanic: 'bg-yellow-100 text-yellow-800',
      french: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[origin as keyof typeof colors] || colors.other;
  };

  const getLevelColor = (level: string) => {
    const colors = {
      cet4: 'bg-green-100 text-green-800',
      cet6: 'bg-blue-100 text-blue-800',
      toefl: 'bg-purple-100 text-purple-800',
      ielts: 'bg-purple-100 text-purple-800',
      gre: 'bg-red-100 text-red-800',
      advanced: 'bg-orange-100 text-orange-800'
    };
    return colors[level as keyof typeof colors] || colors.cet4;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">词根分析中...</h2>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">正在分析单词 &quot;{word}&quot; 的词根结构...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">分析失败</h2>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>
        
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={performAnalysis}>重试</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysisResult) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            词根分析结果
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-gray-600 dark:text-gray-300">
              单词: <span className="font-semibold text-blue-600">{analysisResult.word}</span>
            </p>
            <PronunciationPlayer word={analysisResult.word} />
          </div>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>
      </div>

      {/* 主单词例句 */}
      {WORD_DATABASE[analysisResult.word]?.examples && WORD_DATABASE[analysisResult.word].examples!.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              单词例句
            </CardTitle>
            <CardDescription>
              通过例句帮助理解单词 <span className="font-semibold text-blue-600">{analysisResult.word}</span> 的用法
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WordExamples examples={WORD_DATABASE[analysisResult.word]?.examples || []} />
          </CardContent>
        </Card>
      )}

      {/* 词根信息 */}
      {analysisResult.roots.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              发现的词根
            </CardTitle>
            <CardDescription>
              该单词包含以下词根，了解词根含义有助于记忆相关单词
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.roots.map((root) => (
                <div key={root.root} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getOriginColor(root.origin)}>
                      {root.origin.toUpperCase()}
                    </Badge>
                    <span className="font-semibold text-lg">{root.root}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{root.meaning}</p>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">相关单词:</p>
                    <div className="flex flex-wrap gap-1">
                      {root.examples.slice(0, 5).map((example) => (
                        <Badge key={example} variant="secondary" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              未找到该单词的词根信息，可能是基础单词或需要扩展词根数据库
            </p>
          </CardContent>
        </Card>
      )}

      {/* 相关单词 */}
      {analysisResult.relatedWords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-green-600" />
              相关单词
            </CardTitle>
            <CardDescription>
              基于词根分析找到的相关单词，适合你的 {userLevel.toUpperCase()} 水平
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {analysisResult.relatedWords.slice(0, 12).map((word) => (
                <div key={word.word} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{word.word}</span>
                    <Badge className={getLevelColor(word.level)} variant="secondary">
                      {word.level.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <PronunciationPlayer word={word.word} className="scale-75" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{word.meaning}</p>
                  {word.roots.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {word.roots.map((root) => (
                        <Badge key={root} variant="outline" className="text-xs">
                          {root}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <WordExamples examples={word.examples || []} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 词根图谱可视化 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-green-600" />
            词根图谱可视化
          </CardTitle>
          <CardDescription>
            交互式词汇网络图，可以拖拽节点进行探索
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WordGraphVisualization graph={analysisResult.graph} />
        </CardContent>
      </Card>

      {/* 词汇网络统计 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            词汇网络统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analysisResult.roots.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">发现词根</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{analysisResult.relatedWords.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">相关单词</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{analysisResult.graph.nodes.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">网络节点</div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{analysisResult.graph.edges.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">连接关系</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}