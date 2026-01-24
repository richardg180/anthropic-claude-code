'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Award, Scroll, Settings, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import StatsBar from '@/components/StatsBar';
import CategoryCard from '@/components/CategoryCard';
import AchievementBadge from '@/components/AchievementBadge';
import QuestCard from '@/components/QuestCard';
import {
  GameState,
  getInitialGameState,
  checkAndResetForNewDay,
  completeHabit,
  uncompleteHabit,
  saveState,
  loadState,
} from '@/lib/gameState';

type TabType = 'habits' | 'quests' | 'achievements';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('habits');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize game state
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      const updated = checkAndResetForNewDay(saved);
      setGameState(updated);
      if (updated !== saved) {
        saveState(updated);
      }
    } else {
      const initial = getInitialGameState();
      setGameState(initial);
      saveState(initial);
    }
  }, []);

  // Play sound effect
  const playSound = useCallback((type: 'complete' | 'levelup' | 'achievement') => {
    if (!soundEnabled) return;
    // Sound effects can be added here with Web Audio API
  }, [soundEnabled]);

  // Handle habit toggle
  const handleToggleHabit = useCallback((habitId: string) => {
    if (!gameState) return;

    const habit = gameState.habits.find(h => h.id === habitId);
    if (!habit) return;

    const previousLevel = gameState.player.level;
    let newState: GameState;

    if (habit.completed) {
      newState = uncompleteHabit(gameState, habitId);
    } else {
      newState = completeHabit(gameState, habitId);
      playSound('complete');

      // Check for level up
      if (newState.player.level > previousLevel) {
        setLevelUpLevel(newState.player.level);
        setShowLevelUp(true);
        playSound('levelup');
        setTimeout(() => setShowLevelUp(false), 2500);
      }

      // Check for new achievements
      const newAchievements = newState.achievements.filter(
        (a, i) => a.unlocked && !gameState.achievements[i].unlocked
      );
      if (newAchievements.length > 0) {
        playSound('achievement');
      }
    }

    setGameState(newState);
    saveState(newState);
  }, [gameState, playSound]);

  // Reset data (for testing)
  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      const initial = getInitialGameState();
      setGameState(initial);
      saveState(initial);
    }
  }, []);

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const healthHabits = gameState.habits.filter(h => h.category === 'health');
  const wealthHabits = gameState.habits.filter(h => h.category === 'wealth');
  const relationshipHabits = gameState.habits.filter(h => h.category === 'relationships');

  const completedToday = gameState.habits.filter(h => h.completed).length;
  const totalHabits = gameState.habits.length;

  const unlockedAchievements = gameState.achievements.filter(a => a.unlocked);
  const lockedAchievements = gameState.achievements.filter(a => !a.unlocked);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Level Up Celebration */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-8xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-2">LEVEL UP!</h2>
              <div className="text-6xl font-black bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Level {levelUpLevel}
              </div>
              <p className="text-white/50 mt-4">Keep grinding!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Life Quest</h1>
              <p className="text-sm text-white/50">Level up your life</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-white/50" />
              ) : (
                <VolumeX className="w-5 h-5 text-white/30" />
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              title="Reset Progress"
            >
              <RefreshCw className="w-5 h-5 text-white/50" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <StatsBar
          player={gameState.player}
          totalHabitsToday={totalHabits}
          completedHabitsToday={completedToday}
        />
      </header>

      {/* Tab Navigation */}
      <nav className="flex gap-2 mb-6">
        {[
          { id: 'habits' as TabType, label: 'Habits', icon: Gamepad2 },
          { id: 'quests' as TabType, label: 'Quests', icon: Scroll },
          { id: 'achievements' as TabType, label: 'Achievements', icon: Award },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
              ${
                activeTab === tab.id
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                  : 'bg-white/5 text-white/50 border border-transparent hover:text-white/70'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.id === 'achievements' && (
              <span className="text-xs bg-violet-500/30 px-2 py-0.5 rounded-full">
                {unlockedAchievements.length}/{gameState.achievements.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'habits' && (
          <motion.div
            key="habits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <CategoryCard
              category="health"
              habits={healthHabits}
              level={gameState.player.healthLevel}
              xp={gameState.player.healthXP}
              onToggleHabit={handleToggleHabit}
            />
            <CategoryCard
              category="wealth"
              habits={wealthHabits}
              level={gameState.player.wealthLevel}
              xp={gameState.player.wealthXP}
              onToggleHabit={handleToggleHabit}
            />
            <CategoryCard
              category="relationships"
              habits={relationshipHabits}
              level={gameState.player.relationshipsLevel}
              xp={gameState.player.relationshipsXP}
              onToggleHabit={handleToggleHabit}
            />
          </motion.div>
        )}

        {activeTab === 'quests' && (
          <motion.div
            key="quests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-1">Daily Quests</h2>
              <p className="text-white/50 text-sm">Complete quests for bonus XP rewards</p>
            </div>
            <div className="space-y-3">
              {gameState.dailyQuests.map((quest, index) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  habits={gameState.habits}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Unlocked ({unlockedAchievements.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {unlockedAchievements.map((achievement, index) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Locked Achievements */}
            <div>
              <h2 className="text-xl font-bold text-white/50 mb-4">
                Locked ({lockedAchievements.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {lockedAchievements.map((achievement, index) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-12 text-center text-white/30 text-sm">
        <p>Life Quest - Transform your habits into adventures</p>
      </footer>
    </main>
  );
}
