'use client';

import { motion } from 'framer-motion';
import { Heart, Coins, Users } from 'lucide-react';
import ProgressRing from './ProgressRing';
import HabitCard from './HabitCard';
import { Habit, getXPForLevel } from '@/lib/gameState';
import { Category } from '@/lib/gameState';

interface CategoryCardProps {
  category: Category;
  habits: Habit[];
  level: number;
  xp: number;
  onToggleHabit: (id: string) => void;
}

const categoryConfig = {
  health: {
    title: 'Health',
    icon: Heart,
    color: '#10b981',
    lightColor: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/10 to-teal-600/5',
  },
  wealth: {
    title: 'Wealth',
    icon: Coins,
    color: '#f59e0b',
    lightColor: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-orange-600/5',
  },
  relationships: {
    title: 'Relationships',
    icon: Users,
    color: '#ec4899',
    lightColor: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-500/10 to-rose-600/5',
  },
};

export default function CategoryCard({
  category,
  habits,
  level,
  xp,
  onToggleHabit,
}: CategoryCardProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const xpForNextLevel = getXPForLevel(level);
  const currentLevelXP = xp % xpForNextLevel;
  const levelProgress = (currentLevelXP / xpForNextLevel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        rounded-2xl border border-white/5 overflow-hidden
        bg-gradient-to-br ${config.bgGradient}
        backdrop-blur-sm
      `}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
          {/* Title & Icon */}
          <div className="flex items-center gap-4">
            <div
              className={`
                w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient}
                flex items-center justify-center shadow-lg
              `}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{config.title}</h2>
              <p className="text-sm text-white/50">
                {completedCount}/{totalCount} completed
              </p>
            </div>
          </div>

          {/* Level Ring */}
          <ProgressRing
            progress={levelProgress}
            size={70}
            strokeWidth={5}
            color={config.color}
          >
            <div className="text-center">
              <div className="text-lg font-bold text-white">Lv.{level}</div>
            </div>
          </ProgressRing>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>Progress</span>
            <span>{Math.round(completionPercent)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
            />
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="p-4 space-y-2">
        {habits.map((habit, index) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={onToggleHabit}
            colorClass={category}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
