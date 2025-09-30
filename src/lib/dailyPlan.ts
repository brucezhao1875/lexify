import { DailyPlan, LearningGoal, UserLevel } from '@/types';
import { LearningProgressService } from '@/lib/learningProgress';
import { WORD_DATABASE } from '@/data/roots';

export class DailyPlanService {
  private static readonly STORAGE_KEYS = {
    DAILY_PLANS: 'lexify_daily_plans',
    LEARNING_GOAL: 'lexify_learning_goal',
    LAST_PLAN_GENERATION: 'lexify_last_plan_generation'
  };

  /**
   * 设置学习目标
   */
  static setLearningGoal(
    planType: 'cet4' | 'cet6' | 'toefl' | 'ielts' | 'gre' | 'custom',
    targetDate: Date,
    dailyTarget: number = 10
  ): void {
    if (typeof window === 'undefined') return;

    const targetWords = this.calculateTargetWords(planType);
    const targetRoots = Math.floor(targetWords * 0.3); // 词根数量约为单词数量的30%

    const goal: LearningGoal = {
      targetDate,
      targetWords,
      targetRoots,
      currentWords: 0,
      currentRoots: 0,
      progress: 0,
      status: 'active',
      plan: planType,
      dailyTarget
    };

    localStorage.setItem(this.STORAGE_KEYS.LEARNING_GOAL, JSON.stringify(goal));
  }

  /**
   * 获取当前学习目标
   */
  static getLearningGoal(): LearningGoal | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.LEARNING_GOAL);
      if (!stored) return null;

      const goal = JSON.parse(stored);
      goal.targetDate = new Date(goal.targetDate);
      
      // 更新当前进度
      const stats = LearningProgressService.getLearningStats();
      goal.currentWords = stats.totalWordsLearned;
      goal.currentRoots = stats.totalRootsLearned;
      goal.progress = Math.min(100, Math.round((goal.currentWords / goal.targetWords) * 100));
      
      // 检查是否已完成
      if (goal.progress >= 100) {
        goal.status = 'completed';
      }
      
      return goal;
    } catch (error) {
      console.error('Failed to load learning goal:', error);
      return null;
    }
  }

  /**
   * 生成每日学习计划
   */
  static generateDailyPlan(userLevel: UserLevel, targetWords: number = 10): DailyPlan {
    if (typeof window === 'undefined') {
      return this.createEmptyPlan(targetWords);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 检查是否已生成过今天的计划
    const existingPlan = this.getDailyPlan(today);
    if (existingPlan) {
      return existingPlan;
    }

    // 获取用户学习进度
    const learnedWords = Object.keys(LearningProgressService.getWordProgress());
    const wordsForReview = LearningProgressService.getWordsForReview().map(w => w.word);

    // 获取所有符合条件的单词
    const availableWords = Object.values(WORD_DATABASE).filter(word => 
      !learnedWords.includes(word.word) && 
      word.level === userLevel
    );

    // 生成核心词汇（基于常用词根）
    const coreWords = this.selectCoreWords(availableWords, Math.ceil(targetWords * 0.6));
    
    // 生成扩展词汇
    const extendedWords = this.selectExtendedWords(
      availableWords.filter(word => !coreWords.includes(word.word)),
      Math.ceil(targetWords * 0.3)
    );

    // 生成复习词汇
    const reviewWords = wordsForReview.slice(0, Math.ceil(targetWords * 0.2));

    // 确定难度等级
    const difficulty = this.calculatePlanDifficulty(coreWords, extendedWords);

    // 计算预估时间
    const estimatedTime = this.calculateEstimatedTime(coreWords.length, extendedWords.length, reviewWords.length);

    const plan: DailyPlan = {
      date: today,
      coreWords,
      extendedWords,
      reviewWords,
      difficulty,
      estimatedTime,
      progress: 'not_started',
      completedWords: []
    };

    // 保存计划
    this.saveDailyPlan(plan);
    
    // 记录生成时间
    localStorage.setItem(this.STORAGE_KEYS.LAST_PLAN_GENERATION, today.toISOString());

    return plan;
  }

  /**
   * 获取指定日期的学习计划
   */
  static getDailyPlan(date: Date): DailyPlan | null {
    if (typeof window === 'undefined') return null;

    try {
      const plans = this.getAllDailyPlans();
      const dateStr = this.formatDate(date);
      
      return plans[dateStr] || null;
    } catch (error) {
      console.error('Failed to get daily plan:', error);
      return null;
    }
  }

  /**
   * 获取今日的学习计划
   */
  static getTodayPlan(userLevel: UserLevel, targetWords: number = 10): DailyPlan {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let plan = this.getDailyPlan(today);
    
    if (!plan) {
      plan = this.generateDailyPlan(userLevel, targetWords);
    }
    
    return plan;
  }

  /**
   * 标记单词为已完成
   */
  static markWordCompleted(word: string): void {
    if (typeof window === 'undefined') return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const plan = this.getDailyPlan(today);
    if (!plan) return;

    if (!plan.completedWords.includes(word)) {
      plan.completedWords.push(word);
      
      // 更新进度状态
      const totalWords = plan.coreWords.length + plan.extendedWords.length + plan.reviewWords.length;
      const completionRate = plan.completedWords.length / totalWords;
      
      if (completionRate === 0) {
        plan.progress = 'not_started';
      } else if (completionRate < 1) {
        plan.progress = 'in_progress';
      } else {
        plan.progress = 'completed';
      }
      
      this.saveDailyPlan(plan);
    }
  }

  /**
   * 获取本周的所有学习计划
   */
  static getWeeklyPlans(): DailyPlan[] {
    if (typeof window === 'undefined') return [];

    try {
      const plans = this.getAllDailyPlans();
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const weeklyPlans: DailyPlan[] = [];
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(weekStart);
        currentDate.setDate(weekStart.getDate() + i);
        const dateStr = this.formatDate(currentDate);
        
        if (plans[dateStr]) {
          weeklyPlans.push(plans[dateStr]);
        }
      }
      
      return weeklyPlans.sort((a, b) => a.date.getTime() - b.date.getTime());
    } catch (error) {
      console.error('Failed to get weekly plans:', error);
      return [];
    }
  }

  /**
   * 获取学习建议
   */
  static getLearningSuggestions(): {
    recommendedDailyWords: number;
    focusAreas: string[];
    nextMilestone: string;
  } {
    const stats = LearningProgressService.getLearningStats();
    
    // 推荐每日学习单词数
    let recommendedDailyWords = 10;
    if (stats.streak >= 7) recommendedDailyWords = 15;
    if (stats.streak >= 30) recommendedDailyWords = 20;
    
    // 聚焦领域
    const focusAreas: string[] = [];
    if (stats.averageMastery < 60) {
      focusAreas.push('加强已学词汇的复习');
    }
    if (stats.totalRootsLearned < 20) {
      focusAreas.push('扩展词根知识');
    }
    if (stats.streak < 7) {
      focusAreas.push('保持连续学习');
    }
    
    // 下一个里程碑
    let nextMilestone = '完成第一个单词学习';
    if (stats.totalWordsLearned >= 50) nextMilestone = '掌握100个核心词汇';
    if (stats.totalWordsLearned >= 100) nextMilestone = '成为词汇达人';
    if (stats.totalWordsLearned >= 500) nextMilestone = '词汇大师';
    
    return {
      recommendedDailyWords,
      focusAreas,
      nextMilestone
    };
  }

  // 私有方法

  private static calculateTargetWords(planType: string): number {
    const targets = {
      cet4: 4500,
      cet6: 6000,
      toefl: 8000,
      ielts: 7500,
      gre: 12000,
      custom: 5000
    };
    return targets[planType as keyof typeof targets] || targets.custom;
  }

  private static createEmptyPlan(targetWords: number): DailyPlan {
    return {
      date: new Date(),
      coreWords: [],
      extendedWords: [],
      reviewWords: [],
      difficulty: 'medium',
      estimatedTime: targetWords * 3,
      progress: 'not_started',
      completedWords: []
    };
  }

  private static selectCoreWords(availableWords: Array<{word: string; roots: string[]}>, count: number): string[] {
    // 基于词根频率选择核心词汇
    const rootFrequency = new Map<string, number>();
    
    availableWords.forEach(word => {
      word.roots.forEach((root: string) => {
        rootFrequency.set(root, (rootFrequency.get(root) || 0) + 1);
      });
    });

    // 按词根频率排序，选择高频词根的单词
    return availableWords
      .sort((a, b) => {
        const aScore = a.roots.reduce((sum: number, root: string) => sum + (rootFrequency.get(root) || 0), 0);
        const bScore = b.roots.reduce((sum: number, root: string) => sum + (rootFrequency.get(root) || 0), 0);
        return bScore - aScore;
      })
      .slice(0, count)
      .map(word => word.word);
  }

  private static selectExtendedWords(availableWords: Array<{word: string; roots: string[]}>, count: number): string[] {
    // 随机选择扩展词汇，确保词根多样性
    const selectedWords: string[] = [];
    const selectedRoots = new Set<string>();
    
    for (const word of availableWords) {
      if (selectedWords.length >= count) break;
      
      // 优先选择包含新词根的单词
      const hasNewRoot = word.roots.some((root: string) => !selectedRoots.has(root));
      
      if (hasNewRoot || Math.random() > 0.5) {
        selectedWords.push(word.word);
        word.roots.forEach((root: string) => selectedRoots.add(root));
      }
    }
    
    return selectedWords;
  }

  private static calculatePlanDifficulty(
    coreWords: string[], 
    extendedWords: string[]
  ): 'easy' | 'medium' | 'hard' {
    const totalWords = coreWords.length + extendedWords.length;
    
    if (totalWords <= 8) return 'easy';
    if (totalWords <= 15) return 'medium';
    return 'hard';
  }

  private static calculateEstimatedTime(
    coreCount: number, 
    extendedCount: number, 
    reviewCount: number
  ): number {
    // 核心词汇：3分钟/个，扩展词汇：2分钟/个，复习词汇：1分钟/个
    return coreCount * 3 + extendedCount * 2 + reviewCount * 1;
  }

  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private static getAllDailyPlans(): Record<string, DailyPlan> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.DAILY_PLANS);
      if (!stored) return {};

      const plans = JSON.parse(stored);
      
      // 转换日期字符串为Date对象
      Object.keys(plans).forEach(dateStr => {
        plans[dateStr].date = new Date(plans[dateStr].date);
      });
      
      return plans;
    } catch (error) {
      console.error('Failed to load daily plans:', error);
      return {};
    }
  }

  private static saveDailyPlan(plan: DailyPlan): void {
    try {
      const plans = this.getAllDailyPlans();
      const dateStr = this.formatDate(plan.date);
      
      plans[dateStr] = plan;
      
      localStorage.setItem(this.STORAGE_KEYS.DAILY_PLANS, JSON.stringify(plans));
    } catch (error) {
      console.error('Failed to save daily plan:', error);
    }
  }
}