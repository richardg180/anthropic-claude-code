'use client';

import { ArrowLeft, Target, TrendingUp, Users, DollarSign, Calendar, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Sprint data from the 60-day sprint plan
const sprintData = {
  startMRR: 35000,
  targetMRR: 100000,
  currentMRR: 62000,
  daysElapsed: 30,
  totalDays: 60,
  newClientsTarget: 4,
  newClientsClosed: 1,
  upsellsTarget: 3,
  upsellsClosed: 0,
  priceIncreasesTarget: 3,
  priceIncreasesDone: 0
};

const weeklyProgress = [
  { week: 'Week 1', mrr: 35000, target: 50000, activity: 'Assessment & Planning' },
  { week: 'Week 2', mrr: 48000, target: 62500, activity: 'First Closes' },
  { week: 'Week 3', mrr: 55000, target: 75000, activity: 'Momentum Building' },
  { week: 'Week 4', mrr: 62000, target: 87500, activity: 'Current Week' },
  { week: 'Week 5', mrr: 62000, target: 93750, activity: 'Push to Close' },
  { week: 'Week 6', mrr: 62000, target: 96875, activity: 'Final Sprint' },
  { week: 'Week 7', mrr: 62000, target: 98438, activity: 'Cross Finish Line' },
  { week: 'Week 8', mrr: 62000, target: 100000, activity: 'Stabilize' },
];

const paths = [
  { name: 'New Clients', target: 33000, current: 13000, progress: 39, color: 'blue' },
  { name: 'Upsells', target: 19500, current: 8000, progress: 41, color: 'purple' },
  { name: 'Price Increases', target: 13000, current: 6000, progress: 46, color: 'green' },
];

const weeklyActivities = [
  {
    week: 'Week 4 (Current)',
    status: 'in-progress',
    activities: [
      { task: 'Send 20-30 outreach messages daily', done: true },
      { task: '2-3 sales calls per day', done: true },
      { task: 'Follow up on all proposals', done: false },
      { task: 'Prepare upsell presentations', done: false },
      { task: 'Schedule renewal conversations', done: true },
    ]
  },
  {
    week: 'Week 5 (Next)',
    status: 'upcoming',
    activities: [
      { task: 'Close 2 new clients (£10-15k each)', done: false },
      { task: 'Land 1 major upsell', done: false },
      { task: 'Execute price increases', done: false },
      { task: 'Aggressive pipeline push', done: false },
    ]
  }
];

export default function SprintPage() {
  const progress = ((sprintData.currentMRR - sprintData.startMRR) / (sprintData.targetMRR - sprintData.startMRR)) * 100;
  const daysRemaining = sprintData.totalDays - sprintData.daysElapsed;
  const gapToTarget = sprintData.targetMRR - sprintData.currentMRR;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                60-Day Sprint: £35k → £100k MRR
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Day {sprintData.daysElapsed} of {sprintData.totalDays} • {daysRemaining} days remaining
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-blue-100">{progress.toFixed(1)}% of target achieved</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">£{sprintData.currentMRR.toLocaleString()}</p>
              <p className="text-blue-100">Current MRR</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-6 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500 flex items-center justify-end pr-4"
              style={{ width: `${progress}%` }}
            >
              <span className="text-sm font-bold text-blue-600">{progress.toFixed(0)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <span>£35k Start</span>
            <span className="font-bold">£{gapToTarget.toLocaleString()} to target</span>
            <span>£100k Goal</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Target className="w-6 h-6" />}
            label="Gap to Target"
            value={`£${gapToTarget.toLocaleString()}`}
            color="red"
          />
          <MetricCard
            icon={<Calendar className="w-6 h-6" />}
            label="Days Remaining"
            value={daysRemaining.toString()}
            color="orange"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Weekly Growth Needed"
            value={`£${Math.round(gapToTarget / (daysRemaining / 7)).toLocaleString()}`}
            color="blue"
          />
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            label="MRR Added So Far"
            value={`£${(sprintData.currentMRR - sprintData.startMRR).toLocaleString()}`}
            color="green"
          />
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Weekly Sprint Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number | undefined) => [`£${(value ?? 0).toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Actual MRR"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#10b981"
                strokeDasharray="5 5"
                name="Target"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Three Growth Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {paths.map((path) => (
            <div
              key={path.name}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{path.name}</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-400">Progress</span>
                  <span className="font-medium text-slate-900 dark:text-white">{path.progress}%</span>
                </div>
                <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-${path.color}-500`}
                    style={{ width: `${path.progress}%`, backgroundColor: getColor(path.color) }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    £{path.current.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">of £{path.target.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {weeklyActivities.map((week) => (
            <div
              key={week.week}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{week.week}</h3>
                {week.status === 'in-progress' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium">
                    In Progress
                  </span>
                )}
                {week.status === 'upcoming' && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-full text-sm font-medium">
                    Upcoming
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {week.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {activity.done ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : week.status === 'upcoming' ? (
                      <Circle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${activity.done ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                      {activity.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'red' | 'orange' | 'blue' | 'green';
}) {
  const colors = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500'
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className={`${colors[color]} p-3 rounded-lg text-white mb-4 w-fit`}>
        {icon}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function getColor(color: string): string {
  const colors: Record<string, string> = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
  };
  return colors[color] || '#3b82f6';
}
