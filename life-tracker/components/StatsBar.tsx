'use client';

import { motion } from 'framer-motion';
import { Flame, Star, Trophy, Zap, Target } from 'lucide-react';
import ProgressRing from './ProgressRing';
import { PlayerStats, getXPForLevel } from '@/lib/gameState';

interface StatsBarProps {
  player: PlayerStats;
  totalHabitsToday: number;
  completedHabitsToday: number;
}

export default function StatsBar({ player, totalHabitsToday, completedHabitsToday }: StatsBarProps) {
  const xpForNextLevel = getXPForLevel(player.level);
  const levelProgress = (player.currentXP / xpForNextLevel) * 100;
  const dailyProgress = totalHabitsToday > 0
    ? (completedHabitsToday / totalHabitsToday) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/5 bg-gradient-to-br from-violet-500/10 to-purple-600/5 p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        {/* Level & XP */}
        <div className="flex items-center gap-6">
          <ProgressRing
            progress={levelProgress}
            size={100}
            strokeWidth={6}
            color="#8b5cf6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Lv.{player.level}</div>
              <div className="text-xs text-violet-400">LEVEL</div>
            </div>
          </ProgressRing>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-violet-400" />
              <span className="text-white/50 text-sm">Experience</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {player.currentXP.toLocaleString()} <span className="text-white/30">/ {xpForNextLevel.toLocaleString()}</span>
            </div>
            <div className="text-sm text-violet-400 mt-1">
              Total: {player.totalXP.toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex gap-8">
          {/* Current Streak */}
          <div className="text-center">
            <div className={`
              flex items-center justify-center gap-2 mb-1
              ${player.currentStreak > 0 ? 'text-orange-400 streak-active' : 'text-white/30'}
            `}>
              <Flame className="w-6 h-6" />
              <span className="text-3xl font-bold">{player.currentStreak}</span>
            </div>
            <div className="text-xs text-white/50">Day Streak</div>
            {player.longestStreak > 0 && (
              <div className="text-xs text-white/30 mt-1">Best: {player.longestStreak}</div>
            )}
          </div>

          {/* Perfect Days */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1 text-yellow-400">
              <Star className="w-6 h-6" />
              <span className="text-3xl font-bold">{player.perfectDays}</span>
            </div>
            <div className="text-xs text-white/50">Perfect Days</div>
          </div>

          {/* Total Habits */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1 text-emerald-400">
              <Trophy className="w-6 h-6" />
              <span className="text-3xl font-bold">{player.totalHabitsCompleted}</span>
            </div>
            <div className="text-xs text-white/50">Habits Done</div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="flex items-center gap-4">
          <ProgressRing
            progress={dailyProgress}
            size={80}
            strokeWidth={5}
            color={dailyProgress === 100 ? '#10b981' : '#6366f1'}
          >
            <div className="text-center">
              <Target className={`w-6 h-6 ${dailyProgress === 100 ? 'text-emerald-400' : 'text-indigo-400'}`} />
            </div>
          </ProgressRing>
          <div>
            <div className="text-sm text-white/50">Today</div>
            <div className="text-xl font-bold text-white">
              {completedHabitsToday}/{totalHabitsToday}
            </div>
            <div className={`text-sm font-medium ${dailyProgress === 100 ? 'text-emerald-400' : 'text-indigo-400'}`}>
              {dailyProgress === 100 ? 'Complete!' : `${Math.round(dailyProgress)}%`}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
