import { WordProgress, StudySession, LearningStats } from '@/types';

export class LearningProgressService {
  private static readonly STORAGE_KEYS = {
    WORD_PROGRESS: 'lexify_word_progress',
    STUDY_SESSIONS: 'lexify_study_sessions',
    LEARNING_STATS: 'lexify_learning_stats',
    CURRENT_SESSION: 'lexify_current_session'
  };

  /**
   * 记录单词学习进度
   */
  static recordWordProgress(word: string, context: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): void {
    if (typeof window === 'undefined') return;

    const progress = this.getWordProgress();
    const now = new Date();
    
    if (progress[word]) {
      // 更新现有记录
      progress[word].lastReviewed = now;
      progress[word].reviewCount += 1;
      progress[word].difficulty = difficulty;
      
      // 根据复习次数和难度调整掌握程度
      const baseMastery = progress[word].masteryLevel;
      const difficultyBonus = difficulty === 'easy' ? 10 : difficulty === 'hard' ? -5 : 0;
      const reviewBonus = Math.min(progress[word].reviewCount * 5, 30);
      
      progress[word].masteryLevel = Math.min(100, baseMastery + difficultyBonus + reviewBonus);
    } else {
      // 创建新记录
      progress[word] = {
        word,
        learnedAt: now,
        lastReviewed: now,
        reviewCount: 1,
        masteryLevel: difficulty === 'easy' ? 70 : difficulty === 'hard' ? 40 : 55,
        difficulty,
        context
      };
    }

    localStorage.setItem(this.STORAGE_KEYS.WORD_PROGRESS, JSON.stringify(progress));
    this.updateLearningStats();
  }

  /**
   * 获取单词学习进度
   */
  static getWordProgress(): Record<string, WordProgress> {
    if (typeof window === 'undefined') return {};

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.WORD_PROGRESS);
      if (!stored) return {};

      const progress = JSON.parse(stored);
      // 转换日期字符串为Date对象
      Object.keys(progress).forEach(word => {
        progress[word].learnedAt = new Date(progress[word].learnedAt);
        progress[word].lastReviewed = new Date(progress[word].lastReviewed);
      });
      
      return progress;
    } catch (error) {
      console.error('Failed to load word progress:', error);
      return {};
    }
  }

  /**
   * 开始学习会话
   */
  static startStudySession(): string {
    if (typeof window === 'undefined') return '';

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: StudySession = {
      id: sessionId,
      startTime: new Date(),
      wordsStudied: [],
      rootsLearned: [],
      sessionDuration: 0,
      focusLevel: 3
    };

    localStorage.setItem(this.STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
    return sessionId;
  }

  /**
   * 结束学习会话
   */
  static endStudySession(focusLevel: number = 3, notes?: string): void {
    if (typeof window === 'undefined') return;

    try {
      const currentSessionData = localStorage.getItem(this.STORAGE_KEYS.CURRENT_SESSION);
      if (!currentSessionData) return;

      const session: StudySession = JSON.parse(currentSessionData);
      session.endTime = new Date();
      session.sessionDuration = Math.round((session.endTime.getTime() - new Date(session.startTime).getTime()) / 60000);
      session.focusLevel = focusLevel;
      if (notes) session.notes = notes;

      const sessions = this.getStudySessions();
      sessions.push(session);
      localStorage.setItem(this.STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));
      localStorage.removeItem(this.STORAGE_KEYS.CURRENT_SESSION);
      
      this.updateLearningStats();
    } catch (error) {
      console.error('Failed to end study session:', error);
    }
  }

  /**
   * 在当前会话中添加学习的单词
   */
  static addWordToCurrentSession(word: string): void {
    if (typeof window === 'undefined') return;

    try {
      const currentSessionData = localStorage.getItem(this.STORAGE_KEYS.CURRENT_SESSION);
      if (!currentSessionData) return;

      const session: StudySession = JSON.parse(currentSessionData);
      if (!session.wordsStudied.includes(word)) {
        session.wordsStudied.push(word);
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
      }
    } catch (error) {
      console.error('Failed to add word to current session:', error);
    }
  }

  /**
   * 在当前会话中添加学习的词根
   */
  static addRootToCurrentSession(root: string): void {
    if (typeof window === 'undefined') return;

    try {
      const currentSessionData = localStorage.getItem(this.STORAGE_KEYS.CURRENT_SESSION);
      if (!currentSessionData) return;

      const session: StudySession = JSON.parse(currentSessionData);
      if (!session.rootsLearned.includes(root)) {
        session.rootsLearned.push(root);
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
      }
    } catch (error) {
      console.error('Failed to add root to current session:', error);
    }
  }

  /**
   * 获取学习会话历史
   */
  static getStudySessions(): StudySession[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.STUDY_SESSIONS);
      if (!stored) return [];

      const sessions = JSON.parse(stored);
      // 转换日期字符串为Date对象
      sessions.forEach((session: StudySession) => {
        session.startTime = new Date(session.startTime);
        if (session.endTime) {
          session.endTime = new Date(session.endTime);
        }
      });
      
      return sessions.sort((a: StudySession, b: StudySession) => b.startTime.getTime() - a.startTime.getTime());
    } catch (error) {
      console.error('Failed to load study sessions:', error);
      return [];
    }
  }

  /**
   * 获取学习统计信息
   */
  static getLearningStats(): LearningStats {
    if (typeof window === 'undefined') {
      return this.getDefaultStats();
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.LEARNING_STATS);
      if (!stored) return this.getDefaultStats();

      const stats = JSON.parse(stored);
      stats.lastStudyDate = new Date(stats.lastStudyDate);
      return stats;
    } catch (error) {
      console.error('Failed to load learning stats:', error);
      return this.getDefaultStats();
    }
  }

  /**
   * 更新学习统计信息
   */
  private static updateLearningStats(): void {
    if (typeof window === 'undefined') return;

    const progress = this.getWordProgress();
    const sessions = this.getStudySessions();
    
    // 计算统计数据
    const totalWordsLearned = Object.keys(progress).length;
    const totalRootsLearned = new Set(
      Object.values(progress).flatMap(p => p.context.split(','))
    ).size;
    
    const totalStudyTime = sessions.reduce((sum, session) => sum + session.sessionDuration, 0);
    
    const averageMastery = totalWordsLearned > 0 
      ? Object.values(progress).reduce((sum, p) => sum + p.masteryLevel, 0) / totalWordsLearned 
      : 0;

    // 计算连续学习天数
    const streak = this.calculateStreak(sessions);
    const longestStreak = this.calculateLongestStreak(sessions);
    
    const lastStudyDate = sessions.length > 0 ? sessions[0].startTime : new Date();
    
    // 计算本周进度
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // 本周开始（周日）
    weekStart.setHours(0, 0, 0, 0);
    
    const weeklyProgress = sessions
      .filter(session => new Date(session.startTime) >= weekStart)
      .reduce((sum, session) => sum + session.wordsStudied.length, 0);

    const stats: LearningStats = {
      totalWordsLearned,
      totalRootsLearned,
      totalStudyTime,
      averageMastery: Math.round(averageMastery),
      streak,
      longestStreak,
      lastStudyDate,
      weeklyGoal: 50, // 默认每周50个单词
      weeklyProgress
    };

    localStorage.setItem(this.STORAGE_KEYS.LEARNING_STATS, JSON.stringify(stats));
  }

  /**
   * 计算连续学习天数
   */
  private static calculateStreak(sessions: StudySession[]): number {
    if (sessions.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const studyDates = new Set(
      sessions.map(session => {
        const date = new Date(session.startTime);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
    );

    let streak = 0;
    let currentDate = today.getTime();
    
    while (studyDates.has(currentDate)) {
      streak++;
      currentDate -= 24 * 60 * 60 * 1000; // 减去一天
    }
    
    return streak;
  }

  /**
   * 计算最长连续天数
   */
  private static calculateLongestStreak(sessions: StudySession[]): number {
    if (sessions.length === 0) return 0;

    const studyDates = Array.from(new Set(
      sessions.map(session => {
        const date = new Date(session.startTime);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
    )).sort((a, b) => a - b);

    let longestStreak = 0;
    let currentStreak = 0;
    let lastDate = 0;

    for (const date of studyDates) {
      if (date === lastDate + 24 * 60 * 60 * 1000) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
      longestStreak = Math.max(longestStreak, currentStreak);
      lastDate = date;
    }

    return longestStreak;
  }

  /**
   * 获取默认统计信息
   */
  private static getDefaultStats(): LearningStats {
    return {
      totalWordsLearned: 0,
      totalRootsLearned: 0,
      totalStudyTime: 0,
      averageMastery: 0,
      streak: 0,
      longestStreak: 0,
      lastStudyDate: new Date(),
      weeklyGoal: 50,
      weeklyProgress: 0
    };
  }

  /**
   * 清除所有学习数据
   */
  static clearAllData(): void {
    if (typeof window === 'undefined') return;

    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * 获取需要复习的单词
   */
  static getWordsForReview(): WordProgress[] {
    const progress = this.getWordProgress();
    const now = new Date();
    
    return Object.values(progress)
      .filter(wordProgress => {
        // 根据遗忘曲线算法计算是否需要复习
        const daysSinceLastReview = (now.getTime() - wordProgress.lastReviewed.getTime()) / (1000 * 60 * 60 * 24);
        const reviewInterval = this.calculateReviewInterval(wordProgress.reviewCount, wordProgress.masteryLevel);
        
        return daysSinceLastReview >= reviewInterval;
      })
      .sort((a, b) => {
        // 优先复习掌握程度低的
        if (a.masteryLevel !== b.masteryLevel) {
          return a.masteryLevel - b.masteryLevel;
        }
        // 其次按最后复习时间
        return a.lastReviewed.getTime() - b.lastReviewed.getTime();
      });
  }

  /**
   * 计算复习间隔（基于遗忘曲线）
   */
  private static calculateReviewInterval(reviewCount: number, masteryLevel: number): number {
    // 基础间隔根据复习次数递增
    const baseInterval = Math.pow(2, reviewCount - 1);
    
    // 根据掌握程度调整间隔
    const masteryMultiplier = masteryLevel / 50; // 50为掌握程度基准
    
    return Math.max(1, Math.round(baseInterval * masteryMultiplier));
  }
}