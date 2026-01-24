'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Achievement } from '@/lib/gameState';

interface AchievementBadgeProps {
  achievement: Achievement;
  index: number;
}

export default function AchievementBadge({ achievement, index }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`
        relative p-4 rounded-xl border text-center
        ${
          achievement.unlocked
            ? 'border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-600/5'
            : 'border-white/5 bg-white/[0.02]'
        }
      `}
    >
      {/* Badge shine effect for unlocked achievements */}
      {achievement.unlocked && (
        <div className="absolute inset-0 rounded-xl badge-shine overflow-hidden" />
      )}

      {/* Icon */}
      <div className="relative mb-2">
        {achievement.unlocked ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="text-4xl inline-block"
          >
            {achievement.icon}
          </motion.span>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center">
            <Lock className="w-5 h-5 text-white/20" />
          </div>
        )}
      </div>

      {/* Name & Description */}
      <h4
        className={`font-semibold text-sm mb-1 ${
          achievement.unlocked ? 'text-white' : 'text-white/30'
        }`}
      >
        {achievement.name}
      </h4>
      <p
        className={`text-xs ${
          achievement.unlocked ? 'text-white/50' : 'text-white/20'
        }`}
      >
        {achievement.description}
      </p>

      {/* Unlocked date */}
      {achievement.unlocked && achievement.unlockedAt && (
        <div className="text-xs text-violet-400 mt-2">
          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
        </div>
      )}
    </motion.div>
  );
}
