'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { LearningProgressService } from '@/lib/learningProgress';
import { LearningStats, WordProgress } from '@/types';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Calendar, 
  Target,
  Brain,
  Award,
  BarChart3
} from 'lucide-react';

interface LearningStatsProps {
  className?: string;
}

export function LearningStatsComponent({ className = '' }: LearningStatsProps) {
  const [stats, setStats] = useState<LearningStats | null>(null);
  const [reviewWords, setReviewWords] = useState<WordProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = () => {
      try {
        const learningStats = LearningProgressService.getLearningStats();
        const wordsForReview = LearningProgressService.getWordsForReview();
        
        setStats(learningStats);
        setReviewWords(wordsForReview);
      } catch (error) {
        console.error('Failed to load learning stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStreakColor = (streak: number): string => {
    if (streak >= 30) return 'text-purple-600 bg-purple-100';
    if (streak >= 14) return 'text-blue-600 bg-blue-100';
    if (streak >= 7) return 'text-green-600 bg-green-100';
    if (streak >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getMasteryColor = (level: number): string => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-blue-600';
    if (level >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins}分钟`;
    }
    return `${mins}分钟`;
  };

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            开始学习以查看统计信息
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 主要统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{stats.totalWordsLearned}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">已学单词</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Brain className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">{stats.totalRootsLearned}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">已学词根</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{Math.round(stats.totalStudyTime / 60)}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">学习小时</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center p-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
              <span className="text-2xl font-bold text-orange-600">{stats.averageMastery}%</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">平均掌握度</div>
          </CardContent>
        </Card>
      </div>

      {/* 连续学习和每周进度 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              学习连续性
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">当前连续</span>
                <Badge className={getStreakColor(stats.streak)}>
                  {stats.streak} 天
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">最长连续</span>
                <Badge variant="outline">
                  {stats.longestStreak} 天
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">最后学习</span>
                <span className="text-sm text-gray-600">
                  {formatDate(stats.lastStudyDate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              每周进度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">周目标</span>
                  <span className="text-sm text-gray-600">
                    {stats.weeklyProgress} / {stats.weeklyGoal} 词
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (stats.weeklyProgress / stats.weeklyGoal) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%
                </div>
                <div className="text-xs text-gray-600">完成度</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 复习提醒 */}
      {reviewWords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              复习提醒
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                有 {reviewWords.length} 个单词需要复习
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {reviewWords.slice(0, 6).map((wordProgress) => (
                  <div key={wordProgress.word} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-sm font-medium">{wordProgress.word}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getMasteryColor(wordProgress.masteryLevel)}`}>
                        {wordProgress.masteryLevel}%
                      </span>
                      <Badge variant="outline" className="text-xs">
                        复习{wordProgress.reviewCount}次
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {reviewWords.length > 6 && (
                <p className="text-xs text-gray-500 text-center">
                  还有 {reviewWords.length - 6} 个单词需要复习...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 成就徽章 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            学习成就
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`text-center p-3 rounded-lg ${
              stats.totalWordsLearned >= 10 ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-gray-100 border-2 border-gray-200'
            }`}>
              <Award className={`h-6 w-6 mx-auto mb-1 ${
                stats.totalWordsLearned >= 10 ? 'text-yellow-600' : 'text-gray-400'
              }`} />
              <div className="text-xs font-medium">初学者</div>
              <div className="text-xs text-gray-600">10个单词</div>
            </div>
            
            <div className={`text-center p-3 rounded-lg ${
              stats.totalWordsLearned >= 50 ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-gray-100 border-2 border-gray-200'
            }`}>
              <Award className={`h-6 w-6 mx-auto mb-1 ${
                stats.totalWordsLearned >= 50 ? 'text-yellow-600' : 'text-gray-400'
              }`} />
              <div className="text-xs font-medium">学习者</div>
              <div className="text-xs text-gray-600">50个单词</div>
            </div>
            
            <div className={`text-center p-3 rounded-lg ${
              stats.streak >= 7 ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'
            }`}>
              <Calendar className={`h-6 w-6 mx-auto mb-1 ${
                stats.streak >= 7 ? 'text-green-600' : 'text-gray-400'
              }`} />
              <div className="text-xs font-medium">坚持者</div>
              <div className="text-xs text-gray-600">连续7天</div>
            </div>
            
            <div className={`text-center p-3 rounded-lg ${
              stats.totalStudyTime >= 300 ? 'bg-purple-100 border-2 border-purple-300' : 'bg-gray-100 border-2 border-gray-200'
            }`}>
              <Clock className={`h-6 w-6 mx-auto mb-1 ${
                stats.totalStudyTime >= 300 ? 'text-purple-600' : 'text-gray-400'
              }`} />
              <div className="text-xs font-medium">专注者</div>
              <div className="text-xs text-gray-600">5小时学习</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}