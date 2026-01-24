# Life Quest - Gamified Habit Tracker

A beautiful, minimalist habit tracker that gamifies your daily routines across three life pillars: **Health**, **Wealth**, and **Relationships**.

## Features

### Gamification System
- **XP & Leveling** - Earn experience points for completing habits, level up as you progress
- **Streaks** - Track consecutive days of habit completion with fire animations
- **Daily Quests** - Bonus XP for completing category-specific and all-habits challenges
- **Achievements** - Unlock badges for milestones (streaks, levels, total habits)

### Three Life Pillars

**Health** 💚
- Morning Workout
- 8 Hours Sleep
- Healthy Meals
- Drink 3L Water
- Meditation

**Wealth** 💛
- Deep Work Session
- Learn Something New
- Side Project Work
- Review Finances
- Network/Outreach

**Relationships** 💗
- Quality Time
- Reach Out
- Active Listening
- Express Gratitude
- Help Someone

### Visual Design
- Dark mode minimalist interface
- Animated progress rings
- Category-specific color coding
- Level up celebrations
- Responsive layout

## Getting Started

```bash
# Navigate to the life-tracker directory
cd life-tracker

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start tracking!

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Lucide Icons** - UI icons
- **localStorage** - Data persistence

## How It Works

1. **Check off habits** as you complete them throughout the day
2. **Earn XP** for each completed habit
3. **Level up** your overall level and individual category levels
4. **Complete daily quests** for bonus XP
5. **Build streaks** by completing habits on consecutive days
6. **Unlock achievements** as you hit milestones

Data persists in your browser's localStorage, so your progress is saved automatically.

## Customization

Edit `lib/gameState.ts` to customize:
- Default habits for each category
- XP rewards per habit
- Achievement requirements
- Level progression curve
