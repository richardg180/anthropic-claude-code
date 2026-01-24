'use client';

import { motion } from 'framer-motion';
import { Flame, Zap } from 'lucide-react';
import { Habit } from '@/lib/gameState';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  colorClass: string;
  index: number;
}

export default function HabitCard({ habit, onToggle, colorClass, index }: HabitCardProps) {
  const bgGradient = habit.completed
    ? colorClass === 'health'
      ? 'from-emerald-500/20 to-emerald-600/10'
      : colorClass === 'wealth'
        ? 'from-amber-500/20 to-amber-600/10'
        : 'from-pink-500/20 to-pink-600/10'
    : 'from-transparent to-transparent';

  const borderColor = habit.completed
    ? colorClass === 'health'
      ? 'border-emerald-500/50'
      : colorClass === 'wealth'
        ? 'border-amber-500/50'
        : 'border-pink-500/50'
    : 'border-white/5';

  const accentColor =
    colorClass === 'health'
      ? 'text-emerald-400'
      : colorClass === 'wealth'
        ? 'text-amber-400'
        : 'text-pink-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onToggle(habit.id)}
      className={`
        relative p-4 rounded-xl border cursor-pointer
        bg-gradient-to-br ${bgGradient} ${borderColor}
        hover:border-white/20 transition-all duration-300
        card-hover group
      `}
    >
      {/* Completion glow effect */}
      {habit.completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            absolute inset-0 rounded-xl opacity-30
            ${colorClass === 'health' ? 'glow-health' : colorClass === 'wealth' ? 'glow-wealth' : 'glow-relationships'}
          `}
        />
      )}

      <div className="relative flex items-center gap-4">
        {/* Checkbox */}
        <div
          className={`
            w-6 h-6 rounded-lg border-2 flex items-center justify-center
            transition-all duration-300
            ${
              habit.completed
                ? colorClass === 'health'
                  ? 'bg-emerald-500 border-emerald-500'
                  : colorClass === 'wealth'
                    ? 'bg-amber-500 border-amber-500'
                    : 'bg-pink-500 border-pink-500'
                : 'border-white/20 group-hover:border-white/40'
            }
          `}
        >
          {habit.completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </div>

        {/* Icon */}
        <span className="text-2xl">{habit.icon}</span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4
            className={`font-medium ${habit.completed ? 'text-white' : 'text-white/80'}`}
          >
            {habit.name}
          </h4>
          <p className="text-sm text-white/40 truncate">{habit.description}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          {habit.streak > 0 && (
            <div className="flex items-center gap-1 text-orange-400">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-bold">{habit.streak}</span>
            </div>
          )}

          {/* XP */}
          <div className={`flex items-center gap-1 ${accentColor}`}>
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">+{habit.xpReward}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
