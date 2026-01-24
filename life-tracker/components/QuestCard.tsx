'use client';

import { motion } from 'framer-motion';
import { Scroll, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { DailyQuest, Habit } from '@/lib/gameState';

interface QuestCardProps {
  quest: DailyQuest;
  habits: Habit[];
  index: number;
}

export default function QuestCard({ quest, habits, index }: QuestCardProps) {
  const questHabits = quest.habits.map(id => habits.find(h => h.id === id)).filter(Boolean) as Habit[];
  const completedCount = questHabits.filter(h => h.completed).length;
  const totalCount = questHabits.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`
        p-4 rounded-xl border transition-all duration-300
        ${
          quest.completed
            ? 'border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-600/5'
            : 'border-white/5 bg-white/[0.02] hover:border-white/10'
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Quest Icon */}
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${
              quest.completed
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-indigo-500/10 text-indigo-400'
            }
          `}
        >
          {quest.completed ? (
            <Sparkles className="w-6 h-6" />
          ) : (
            <Scroll className="w-6 h-6" />
          )}
        </div>

        {/* Quest Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`font-semibold ${
                quest.completed ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {quest.name}
            </h4>
            {quest.completed && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-sm text-white/40">{quest.description}</p>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-2">
            {questHabits.map(habit => (
              <div
                key={habit.id}
                className={`w-2 h-2 rounded-full ${
                  habit.completed ? 'bg-emerald-400' : 'bg-white/20'
                }`}
                title={habit.name}
              />
            ))}
            <span className="text-xs text-white/30 ml-1">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>

        {/* XP Reward */}
        <div
          className={`
            px-3 py-1 rounded-lg text-sm font-bold
            ${
              quest.completed
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-violet-500/10 text-violet-400'
            }
          `}
        >
          +{quest.xpReward} XP
        </div>
      </div>
    </motion.div>
  );
}
