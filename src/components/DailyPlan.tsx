'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DailyPlan, UserLevel, LearningGoal } from '@/types';
import { DailyPlanService } from '@/lib/dailyPlan';
import { 
  Calendar, 
  Target, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Circle, 
  TrendingUp,
  Award,
  Brain,
  Lightbulb,
  RefreshCw
} from 'lucide-react';

interface DailyPlanProps {
  userLevel: UserLevel;
  className?: string;
}

interface LearningSuggestions {
  recommendedDailyWords: number;
  focusAreas: string[];
  nextMilestone: string;
}

export function DailyPlanComponent({ userLevel, className = '' }: DailyPlanProps) {
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(null);
  const [learningGoal, setLearningGoal] = useState<LearningGoal | null>(null);
  const [suggestions, setSuggestions] = useState<LearningSuggestions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlanData = () => {
      try {
        const plan = DailyPlanService.getTodayPlan(userLevel);
        const goal = DailyPlanService.getLearningGoal();
        const learningSuggestions = DailyPlanService.getLearningSuggestions();
        
        setDailyPlan(plan);
        setLearningGoal(goal);
        setSuggestions(learningSuggestions);
      } catch (error) {
        console.error('Failed to load daily plan:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlanData();
  }, [userLevel]);

  const handleWordClick = (word: string) => {
    // 标记单词为已完成
    DailyPlanService.markWordCompleted(word);
    
    // 重新加载计划数据
    const updatedPlan = DailyPlanService.getTodayPlan(userLevel);
    setDailyPlan(updatedPlan);
  };

  const regeneratePlan = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newPlan = DailyPlanService.generateDailyPlan(userLevel, suggestions?.recommendedDailyWords || 10);
      setDailyPlan(newPlan);
      setIsLoading(false);
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const getProgressColor = (progress: string) => {
    const colors = {
      not_started: 'text-gray-500',
      in_progress: 'text-blue-500',
      completed: 'text-green-500'
    };
    return colors[progress as keyof typeof colors] || colors.not_started;
  };

  const isWordCompleted = (word: string) => {
    return dailyPlan?.completedWords.includes(word) || false;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg mb-4 w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!dailyPlan) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            还没有今日学习计划
          </p>
          <Button onClick={regeneratePlan}>
            <RefreshCw className="h-4 w-4 mr-2" />
            生成学习计划
          </Button>
        </CardContent>
      </Card>
    );
  }

  const totalWords = dailyPlan.coreWords.length + dailyPlan.extendedWords.length + dailyPlan.reviewWords.length;
  const completedCount = dailyPlan.completedWords.length;
  const completionRate = totalWords > 0 ? Math.round((completedCount / totalWords) * 100) : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 学习目标概览 */}
      {learningGoal && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              学习目标
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{learningGoal.targetWords}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">目标词汇</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{learningGoal.currentWords}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">已学词汇</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{learningGoal.progress}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">完成进度</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${learningGoal.progress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 今日学习计划头部 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              今日学习计划
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(dailyPlan.difficulty)}>
                {dailyPlan.difficulty === 'easy' ? '简单' : 
                 dailyPlan.difficulty === 'medium' ? '中等' : '困难'}
              </Badge>
              <Button variant="outline" size="sm" onClick={regeneratePlan}>
                <RefreshCw className="h-4 w-4 mr-2" />
                重新生成
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {formatDate(dailyPlan.date)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-lg font-semibold">{dailyPlan.estimatedTime}分钟</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">预估时长</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-lg font-semibold">{totalWords}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">总词汇数</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-lg font-semibold">{completionRate}%</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">完成进度</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {dailyPlan.progress === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : dailyPlan.progress === 'in_progress' ? (
                  <Circle className="h-5 w-5 text-blue-600 mr-2" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-500 mr-2" />
                )}
                <span className={`text-lg font-semibold ${getProgressColor(dailyPlan.progress)}`}>
                  {dailyPlan.progress === 'not_started' ? '未开始' :
                   dailyPlan.progress === 'in_progress' ? '学习中' : '已完成'}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">学习状态</div>
            </div>
          </div>

          {/* 进度条 */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* 核心词汇 */}
      {dailyPlan.coreWords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-red-600" />
              核心词汇 ({dailyPlan.coreWords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dailyPlan.coreWords.map((word) => (
                <div
                  key={word}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                    isWordCompleted(word) 
                      ? 'bg-green-50 border-green-300' 
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => handleWordClick(word)}
                >
                  {isWordCompleted(word) ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={`font-medium ${isWordCompleted(word) ? 'text-green-700' : ''}`}>
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 扩展词汇 */}
      {dailyPlan.extendedWords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              扩展词汇 ({dailyPlan.extendedWords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dailyPlan.extendedWords.map((word) => (
                <div
                  key={word}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                    isWordCompleted(word) 
                      ? 'bg-green-50 border-green-300' 
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => handleWordClick(word)}
                >
                  {isWordCompleted(word) ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={`font-medium ${isWordCompleted(word) ? 'text-green-700' : ''}`}>
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 复习词汇 */}
      {dailyPlan.reviewWords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              复习词汇 ({dailyPlan.reviewWords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dailyPlan.reviewWords.map((word) => (
                <div
                  key={word}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                    isWordCompleted(word) 
                      ? 'bg-green-50 border-green-300' 
                      : 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
                  }`}
                  onClick={() => handleWordClick(word)}
                >
                  {isWordCompleted(word) ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-yellow-600" />
                  )}
                  <span className={`font-medium ${isWordCompleted(word) ? 'text-green-700' : 'text-yellow-700'}`}>
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 学习建议 */}
      {suggestions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              学习建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  推荐每日学习词汇：
                </span>
                <span className="ml-2 text-sm font-semibold text-blue-600">
                  {suggestions.recommendedDailyWords} 个
                </span>
              </div>
              
              {suggestions.focusAreas.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    聚焦领域：
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {suggestions.focusAreas.map((area: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  下一个里程碑：
                </span>
                <span className="ml-2 text-sm font-semibold text-purple-600">
                  {suggestions.nextMilestone}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}