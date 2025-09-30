'use client';

import { useState, useEffect } from 'react';
import { UserLevelSelector } from '@/components/UserLevelSelector';
import { WordInput } from '@/components/WordInput';
import { WordAnalysis } from '@/components/WordAnalysis';
import { LearningStatsComponent } from '@/components/LearningStats';
import { DailyPlanComponent } from '@/components/DailyPlan';
import { LearningProgressService } from '@/lib/learningProgress';
import { BookOpen, Brain, Network, Calendar } from 'lucide-react';
import { UserLevel } from '@/types';

export default function Home() {
  const [userLevel, setUserLevel] = useState<UserLevel | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentWord, setCurrentWord] = useState<string | null>(null);

  const handleLevelSelect = (level: UserLevel) => {
    setUserLevel(level);
  };

  const handleWordSubmit = async (word: string) => {
    setIsAnalyzing(true);
    setCurrentWord(word);
    
    // 模拟分析过程
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleBackToInput = () => {
    setCurrentWord(null);
    setIsAnalyzing(false);
  };

  // 页面卸载时结束学习会话
  useEffect(() => {
    const handleBeforeUnload = () => {
      LearningProgressService.endStudySession(4); // 默认专注度4
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      LearningProgressService.endStudySession(4);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Lexify
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            通过词根分析构建你的英语词汇网络，系统性扩展词汇量
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {!userLevel ? (
            <UserLevelSelector onLevelSelect={handleLevelSelect} />
          ) : currentWord ? (
            <WordAnalysis 
              word={currentWord} 
              userLevel={userLevel} 
              onBack={handleBackToInput}
            />
          ) : (
            <div className="space-y-8">
              {/* Level Display */}
              <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  当前水平: <span className="font-semibold text-blue-600">{userLevel.toUpperCase()}</span>
                </p>
                <button
                  onClick={() => setUserLevel(undefined)}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mt-2"
                >
                  重新选择水平
                </button>
              </div>

              {/* Word Input */}
              <WordInput onWordSubmit={handleWordSubmit} isLoading={isAnalyzing} />

              {/* Learning Stats */}
              <LearningStatsComponent />

              {/* Daily Plan */}
              <DailyPlanComponent userLevel={userLevel} />

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">智能词根分析</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    自动识别单词的词根、前缀、后缀，提供详细的词根解释
                  </p>
                </div>
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Network className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">词汇网络构建</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    以输入词为中心，构建3层深度的词根关系图谱
                  </p>
                </div>
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">每日学习计划</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    智能生成每日学习计划，包含核心词汇、扩展词汇和复习内容
                  </p>
                </div>
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <BookOpen className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">进度跟踪</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    详细记录学习进度，提供统计数据和成就系统
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p>© 2024 Lexify - 让英语学习更系统</p>
        </footer>
      </div>
    </div>
  );
}
