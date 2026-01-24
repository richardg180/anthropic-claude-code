// Types for the gamified life tracker

export type Category = 'health' | 'wealth' | 'relationships';

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: Category;
  xpReward: number;
  icon: string;
  completed: boolean;
  streak: number;
  bestStreak: number;
  lastCompleted: string | null;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: Category | 'general';
  requirement: number;
  type: 'streak' | 'total' | 'level' | 'category';
  unlocked: boolean;
  unlockedAt: string | null;
}

export interface DailyQuest {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  completed: boolean;
  habits: string[]; // habit IDs required
}

export interface PlayerStats {
  level: number;
  currentXP: number;
  totalXP: number;
  currentStreak: number; // consecutive days
  longestStreak: number;
  healthLevel: number;
  wealthLevel: number;
  relationshipsLevel: number;
  healthXP: number;
  wealthXP: number;
  relationshipsXP: number;
  totalHabitsCompleted: number;
  perfectDays: number; // days with all habits completed
  lastActiveDate: string | null;
}

export interface GameState {
  player: PlayerStats;
  habits: Habit[];
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  todayDate: string;
}

// XP required for each level (exponential growth)
export function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Get level from total XP
export function getLevelFromXP(totalXP: number): { level: number; currentXP: number; xpForNext: number } {
  let level = 1;
  let xpRemaining = totalXP;

  while (xpRemaining >= getXPForLevel(level)) {
    xpRemaining -= getXPForLevel(level);
    level++;
  }

  return {
    level,
    currentXP: xpRemaining,
    xpForNext: getXPForLevel(level),
  };
}

// Default habits
export const defaultHabits: Habit[] = [
  // Health habits
  {
    id: 'h1',
    name: 'Morning Workout',
    description: '30+ minutes of exercise',
    category: 'health',
    xpReward: 50,
    icon: '💪',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'h2',
    name: '8 Hours Sleep',
    description: 'Get quality rest',
    category: 'health',
    xpReward: 40,
    icon: '😴',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'h3',
    name: 'Healthy Meals',
    description: 'Eat clean, no junk',
    category: 'health',
    xpReward: 35,
    icon: '🥗',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'h4',
    name: 'Drink 3L Water',
    description: 'Stay hydrated',
    category: 'health',
    xpReward: 25,
    icon: '💧',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'h5',
    name: 'Meditation',
    description: '10+ minutes mindfulness',
    category: 'health',
    xpReward: 30,
    icon: '🧘',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  // Wealth habits
  {
    id: 'w1',
    name: 'Deep Work Session',
    description: '2+ hours focused work',
    category: 'wealth',
    xpReward: 60,
    icon: '🎯',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'w2',
    name: 'Learn Something New',
    description: 'Read, course, or skill',
    category: 'wealth',
    xpReward: 45,
    icon: '📚',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'w3',
    name: 'Side Project Work',
    description: 'Build your empire',
    category: 'wealth',
    xpReward: 55,
    icon: '🚀',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'w4',
    name: 'Review Finances',
    description: 'Track spending/investing',
    category: 'wealth',
    xpReward: 30,
    icon: '💰',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'w5',
    name: 'Network/Outreach',
    description: 'Connect with someone new',
    category: 'wealth',
    xpReward: 40,
    icon: '🤝',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  // Relationship habits
  {
    id: 'r1',
    name: 'Quality Time',
    description: 'Meaningful time with loved ones',
    category: 'relationships',
    xpReward: 50,
    icon: '❤️',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'r2',
    name: 'Reach Out',
    description: 'Message a friend/family',
    category: 'relationships',
    xpReward: 25,
    icon: '📱',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'r3',
    name: 'Active Listening',
    description: 'Be fully present in conversations',
    category: 'relationships',
    xpReward: 35,
    icon: '👂',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'r4',
    name: 'Express Gratitude',
    description: 'Tell someone you appreciate them',
    category: 'relationships',
    xpReward: 30,
    icon: '🙏',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
  {
    id: 'r5',
    name: 'Help Someone',
    description: 'Acts of kindness',
    category: 'relationships',
    xpReward: 40,
    icon: '🌟',
    completed: false,
    streak: 0,
    bestStreak: 0,
    lastCompleted: null,
  },
];

// Achievements
export const defaultAchievements: Achievement[] = [
  // Streak achievements
  { id: 'a1', name: 'First Flame', description: '3 day streak', icon: '🔥', category: 'general', requirement: 3, type: 'streak', unlocked: false, unlockedAt: null },
  { id: 'a2', name: 'Week Warrior', description: '7 day streak', icon: '⚔️', category: 'general', requirement: 7, type: 'streak', unlocked: false, unlockedAt: null },
  { id: 'a3', name: 'Consistency King', description: '30 day streak', icon: '👑', category: 'general', requirement: 30, type: 'streak', unlocked: false, unlockedAt: null },
  { id: 'a4', name: 'Unstoppable', description: '100 day streak', icon: '💎', category: 'general', requirement: 100, type: 'streak', unlocked: false, unlockedAt: null },

  // Level achievements
  { id: 'a5', name: 'Novice', description: 'Reach level 5', icon: '🌱', category: 'general', requirement: 5, type: 'level', unlocked: false, unlockedAt: null },
  { id: 'a6', name: 'Apprentice', description: 'Reach level 10', icon: '📖', category: 'general', requirement: 10, type: 'level', unlocked: false, unlockedAt: null },
  { id: 'a7', name: 'Expert', description: 'Reach level 25', icon: '🏆', category: 'general', requirement: 25, type: 'level', unlocked: false, unlockedAt: null },
  { id: 'a8', name: 'Master', description: 'Reach level 50', icon: '🎖️', category: 'general', requirement: 50, type: 'level', unlocked: false, unlockedAt: null },
  { id: 'a9', name: 'Legend', description: 'Reach level 100', icon: '🌟', category: 'general', requirement: 100, type: 'level', unlocked: false, unlockedAt: null },

  // Total habits achievements
  { id: 'a10', name: 'Getting Started', description: 'Complete 10 habits', icon: '🎯', category: 'general', requirement: 10, type: 'total', unlocked: false, unlockedAt: null },
  { id: 'a11', name: 'Building Momentum', description: 'Complete 100 habits', icon: '🚀', category: 'general', requirement: 100, type: 'total', unlocked: false, unlockedAt: null },
  { id: 'a12', name: 'Habit Machine', description: 'Complete 500 habits', icon: '⚡', category: 'general', requirement: 500, type: 'total', unlocked: false, unlockedAt: null },
  { id: 'a13', name: 'Life Transformer', description: 'Complete 1000 habits', icon: '🦋', category: 'general', requirement: 1000, type: 'total', unlocked: false, unlockedAt: null },

  // Category achievements
  { id: 'a14', name: 'Health Enthusiast', description: 'Health level 10', icon: '💚', category: 'health', requirement: 10, type: 'category', unlocked: false, unlockedAt: null },
  { id: 'a15', name: 'Wealth Builder', description: 'Wealth level 10', icon: '💛', category: 'wealth', requirement: 10, type: 'category', unlocked: false, unlockedAt: null },
  { id: 'a16', name: 'Social Butterfly', description: 'Relationships level 10', icon: '💗', category: 'relationships', requirement: 10, type: 'category', unlocked: false, unlockedAt: null },
];

// Daily quests
export function generateDailyQuests(habits: Habit[]): DailyQuest[] {
  const healthHabits = habits.filter(h => h.category === 'health');
  const wealthHabits = habits.filter(h => h.category === 'wealth');
  const relationshipHabits = habits.filter(h => h.category === 'relationships');

  return [
    {
      id: 'dq1',
      name: 'Health Champion',
      description: 'Complete all health habits',
      xpReward: 100,
      completed: false,
      habits: healthHabits.map(h => h.id),
    },
    {
      id: 'dq2',
      name: 'Wealth Warrior',
      description: 'Complete all wealth habits',
      xpReward: 100,
      completed: false,
      habits: wealthHabits.map(h => h.id),
    },
    {
      id: 'dq3',
      name: 'Connection Master',
      description: 'Complete all relationship habits',
      xpReward: 100,
      completed: false,
      habits: relationshipHabits.map(h => h.id),
    },
    {
      id: 'dq4',
      name: 'Perfect Day',
      description: 'Complete ALL habits today',
      xpReward: 250,
      completed: false,
      habits: habits.map(h => h.id),
    },
  ];
}

// Initial game state
export function getInitialGameState(): GameState {
  const today = new Date().toISOString().split('T')[0];

  return {
    player: {
      level: 1,
      currentXP: 0,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      healthLevel: 1,
      wealthLevel: 1,
      relationshipsLevel: 1,
      healthXP: 0,
      wealthXP: 0,
      relationshipsXP: 0,
      totalHabitsCompleted: 0,
      perfectDays: 0,
      lastActiveDate: null,
    },
    habits: defaultHabits,
    achievements: defaultAchievements,
    dailyQuests: generateDailyQuests(defaultHabits),
    todayDate: today,
  };
}

// Check if it's a new day and reset habits
export function checkAndResetForNewDay(state: GameState): GameState {
  const today = new Date().toISOString().split('T')[0];

  if (state.todayDate === today) {
    return state;
  }

  const yesterday = state.todayDate;
  const completedYesterday = state.habits.filter(h => h.completed).length;
  const wasActive = completedYesterday > 0;

  // Check if streak continues
  let newStreak = state.player.currentStreak;
  if (wasActive) {
    // Check if yesterday was the day before today
    const yesterdayDate = new Date(yesterday);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - yesterdayDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak = state.player.currentStreak + 1;
    } else {
      newStreak = 0;
    }
  } else {
    newStreak = 0;
  }

  // Reset habits for new day, update streaks
  const updatedHabits = state.habits.map(habit => {
    if (habit.completed) {
      return {
        ...habit,
        completed: false,
        streak: habit.streak + 1,
        bestStreak: Math.max(habit.bestStreak, habit.streak + 1),
      };
    }
    return {
      ...habit,
      completed: false,
      streak: 0, // Reset streak if not completed
    };
  });

  // Check for perfect day
  const wasPerfectDay = state.habits.every(h => h.completed);

  return {
    ...state,
    todayDate: today,
    habits: updatedHabits,
    dailyQuests: generateDailyQuests(updatedHabits),
    player: {
      ...state.player,
      currentStreak: newStreak,
      longestStreak: Math.max(state.player.longestStreak, newStreak),
      lastActiveDate: today,
      perfectDays: wasPerfectDay ? state.player.perfectDays + 1 : state.player.perfectDays,
    },
  };
}

// Complete a habit
export function completeHabit(state: GameState, habitId: string): GameState {
  const habit = state.habits.find(h => h.id === habitId);
  if (!habit || habit.completed) return state;

  const today = new Date().toISOString().split('T')[0];

  // Update habit
  const updatedHabits = state.habits.map(h => {
    if (h.id === habitId) {
      return {
        ...h,
        completed: true,
        lastCompleted: today,
      };
    }
    return h;
  });

  // Calculate XP gains
  const xpGain = habit.xpReward;
  const newTotalXP = state.player.totalXP + xpGain;
  const levelInfo = getLevelFromXP(newTotalXP);

  // Update category XP
  let healthXP = state.player.healthXP;
  let wealthXP = state.player.wealthXP;
  let relationshipsXP = state.player.relationshipsXP;

  if (habit.category === 'health') healthXP += xpGain;
  if (habit.category === 'wealth') wealthXP += xpGain;
  if (habit.category === 'relationships') relationshipsXP += xpGain;

  // Check daily quests
  const updatedQuests = state.dailyQuests.map(quest => {
    if (quest.completed) return quest;

    const allHabitsComplete = quest.habits.every(hId => {
      const h = updatedHabits.find(habit => habit.id === hId);
      return h?.completed;
    });

    if (allHabitsComplete) {
      // Award quest XP
      const questXP = quest.xpReward;
      return { ...quest, completed: true };
    }
    return quest;
  });

  // Calculate bonus XP from completed quests
  const newlyCompletedQuests = updatedQuests.filter(
    (q, i) => q.completed && !state.dailyQuests[i].completed
  );
  const bonusXP = newlyCompletedQuests.reduce((sum, q) => sum + q.xpReward, 0);
  const finalTotalXP = newTotalXP + bonusXP;
  const finalLevelInfo = getLevelFromXP(finalTotalXP);

  // Check achievements
  const updatedAchievements = state.achievements.map(achievement => {
    if (achievement.unlocked) return achievement;

    let shouldUnlock = false;

    if (achievement.type === 'streak' && state.player.currentStreak >= achievement.requirement) {
      shouldUnlock = true;
    }
    if (achievement.type === 'level' && finalLevelInfo.level >= achievement.requirement) {
      shouldUnlock = true;
    }
    if (achievement.type === 'total' && state.player.totalHabitsCompleted + 1 >= achievement.requirement) {
      shouldUnlock = true;
    }
    if (achievement.type === 'category') {
      if (achievement.category === 'health' && getLevelFromXP(healthXP).level >= achievement.requirement) {
        shouldUnlock = true;
      }
      if (achievement.category === 'wealth' && getLevelFromXP(wealthXP).level >= achievement.requirement) {
        shouldUnlock = true;
      }
      if (achievement.category === 'relationships' && getLevelFromXP(relationshipsXP).level >= achievement.requirement) {
        shouldUnlock = true;
      }
    }

    if (shouldUnlock) {
      return { ...achievement, unlocked: true, unlockedAt: today };
    }
    return achievement;
  });

  return {
    ...state,
    habits: updatedHabits,
    dailyQuests: updatedQuests,
    achievements: updatedAchievements,
    player: {
      ...state.player,
      totalXP: finalTotalXP,
      level: finalLevelInfo.level,
      currentXP: finalLevelInfo.currentXP,
      healthXP,
      wealthXP,
      relationshipsXP,
      healthLevel: getLevelFromXP(healthXP).level,
      wealthLevel: getLevelFromXP(wealthXP).level,
      relationshipsLevel: getLevelFromXP(relationshipsXP).level,
      totalHabitsCompleted: state.player.totalHabitsCompleted + 1,
    },
  };
}

// Uncomplete a habit (toggle off)
export function uncompleteHabit(state: GameState, habitId: string): GameState {
  const habit = state.habits.find(h => h.id === habitId);
  if (!habit || !habit.completed) return state;

  // Update habit
  const updatedHabits = state.habits.map(h => {
    if (h.id === habitId) {
      return { ...h, completed: false };
    }
    return h;
  });

  // Remove XP (but don't go below 0)
  const xpLoss = habit.xpReward;
  const newTotalXP = Math.max(0, state.player.totalXP - xpLoss);
  const levelInfo = getLevelFromXP(newTotalXP);

  // Update category XP
  let healthXP = state.player.healthXP;
  let wealthXP = state.player.wealthXP;
  let relationshipsXP = state.player.relationshipsXP;

  if (habit.category === 'health') healthXP = Math.max(0, healthXP - xpLoss);
  if (habit.category === 'wealth') wealthXP = Math.max(0, wealthXP - xpLoss);
  if (habit.category === 'relationships') relationshipsXP = Math.max(0, relationshipsXP - xpLoss);

  // Update daily quests
  const updatedQuests = state.dailyQuests.map(quest => {
    if (quest.habits.includes(habitId)) {
      return { ...quest, completed: false };
    }
    return quest;
  });

  return {
    ...state,
    habits: updatedHabits,
    dailyQuests: updatedQuests,
    player: {
      ...state.player,
      totalXP: newTotalXP,
      level: levelInfo.level,
      currentXP: levelInfo.currentXP,
      healthXP,
      wealthXP,
      relationshipsXP,
      healthLevel: getLevelFromXP(healthXP).level,
      wealthLevel: getLevelFromXP(wealthXP).level,
      relationshipsLevel: getLevelFromXP(relationshipsXP).level,
      totalHabitsCompleted: Math.max(0, state.player.totalHabitsCompleted - 1),
    },
  };
}

// Storage keys
export const STORAGE_KEY = 'life-tracker-game-state';

// Save state to localStorage
export function saveState(state: GameState): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

// Load state from localStorage
export function loadState(): GameState | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
  }
  return null;
}
