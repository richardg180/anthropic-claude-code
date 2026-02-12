'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Clock,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// ── Sample Data ──────────────────────────────────────────────────────────────

const onboardingData = [
  { name: 'Contacted', value: 56, color: '#F97066' },
  { name: 'Proposal Sent', value: 24, color: '#FDB022' },
  { name: 'Contract Signed', value: 32, color: '#6366F1' },
  { name: 'Onboarded', value: 20, color: '#22C55E' },
];

const churnTrendData = [
  { month: 'Jan', value: 12 },
  { month: 'Feb', value: 10.5 },
  { month: 'Mar', value: 11.2 },
  { month: 'Apr', value: 9.8 },
  { month: 'May', value: 8.5 },
  { month: 'Jun', value: 9.02 },
  { month: 'Jul', value: 10.1 },
  { month: 'Aug', value: 9.5 },
  { month: 'Sep', value: 8.2 },
  { month: 'Oct', value: 7.8 },
];

const engagementData = [
  { day: '21', churn: 45, crs: 52 },
  { day: '22', churn: 42, crs: 48 },
  { day: '23', churn: 50, crs: 55 },
  { day: '24', churn: 55, crs: 60 },
  { day: '25', churn: 48, crs: 52 },
  { day: '26', churn: 52, crs: 58 },
  { day: '27', churn: 60, crs: 65 },
  { day: '28', churn: 65, crs: 72 },
];

const notifications = [
  {
    name: 'Rory',
    detail: 'Low health',
    detailColor: 'text-red-500',
    avatar: 'R',
    avatarBg: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'Mitch S.',
    detail: 'Expiration in 12days',
    detailColor: 'text-slate-500',
    avatar: 'M',
    avatarBg: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Kelly J.',
    detail: '12 tasks completed',
    detailColor: 'text-slate-500',
    avatar: 'K',
    avatarBg: 'bg-purple-100 text-purple-700',
  },
];

// ── Navigation ───────────────────────────────────────────────────────────────

const navItems = ['Dashboard', 'Clients', 'Calls', 'Surveys', 'Reports', 'Admin'];

// ── Page Component ───────────────────────────────────────────────────────────

export default function ClientSuccessTracker() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0EDF6] flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              </div>
            </div>
            {/* Nav Links */}
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Dashboard' ? '/client-success' : '#'}
                  className={`text-sm font-medium ${
                    item === 'Dashboard'
                      ? 'text-slate-900 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  } transition-colors`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <h4 className="font-semibold text-slate-900">Notifications (17)</h4>
                  </div>
                  <div className="py-2">
                    {notifications.map((n) => (
                      <div
                        key={n.name}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div
                          className={`w-9 h-9 rounded-full ${n.avatarBg} flex items-center justify-center font-semibold text-sm`}
                        >
                          {n.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{n.name}</p>
                          <p className={`text-xs ${n.detailColor}`}>{n.detail}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100">
                    <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-6">
        {/* Top Row - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {/* Client Retention Score */}
          <RetentionScoreCard />
          {/* Client Onboarding Status */}
          <OnboardingStatusCard />
          {/* Revenue Growth */}
          <RevenueGrowthCard />
          {/* Monthly Recurring Revenue */}
          <MRRCard />
        </div>

        {/* Bottom Row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Churn Percentage */}
          <ChurnPercentageCard />
          {/* Churn Forecast */}
          <ChurnForecastCard />
          {/* Client Engagement Trends */}
          <EngagementTrendsCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 mt-auto">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
            </div>
            <span className="text-sm font-semibold text-slate-700">ClientBloom</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-800 transition-colors">Help Center</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Contact Support</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Card Components ──────────────────────────────────────────────────────────

function RetentionScoreCard() {
  const score = 7.83;
  const maxScore = 10;
  const percentage = (score / maxScore) * 100;

  // Gauge arc: from 180 to 0 degrees (left to right semicircle)
  const gaugeAngle = (percentage / 100) * 180;
  const radius = 60;
  const cx = 75;
  const cy = 75;

  const polarToCartesian = (angle: number) => {
    const rad = ((180 - angle) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy - radius * Math.sin(rad),
    };
  };

  const start = polarToCartesian(0);
  const end = polarToCartesian(gaugeAngle);
  const bgEnd = polarToCartesian(180);
  const largeArc = gaugeAngle > 180 ? 1 : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-0.5">Client Retention Score</h3>
      <p className="text-xs text-slate-400 mb-3">
        Shows the average Client Retention Score across all clients.
      </p>
      <div className="flex items-center justify-center">
        <svg width="150" height="95" viewBox="0 0 150 95">
          {/* Background arc (gray) */}
          <path
            d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${bgEnd.x} ${bgEnd.y}`}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Foreground arc (green gradient) */}
          <path
            d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>
          {/* Score text */}
          <text
            x={cx}
            y={cy - 5}
            textAnchor="middle"
            className="text-2xl font-bold"
            fill="#1E293B"
            fontSize="24"
            fontWeight="bold"
          >
            {score}
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            fill="#22C55E"
            fontSize="12"
            fontWeight="600"
          >
            Great
          </text>
        </svg>
      </div>
    </div>
  );
}

function OnboardingStatusCard() {
  const total = onboardingData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-3">Client Onboarding Status</h3>
      <div className="flex items-center gap-4">
        <div className="relative">
          <PieChart width={100} height={100}>
            <Pie
              data={onboardingData}
              cx={50}
              cy={50}
              innerRadius={30}
              outerRadius={45}
              dataKey="value"
              strokeWidth={0}
            >
              {onboardingData.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-slate-900">{total}</span>
            <span className="text-[10px] text-slate-400">Client</span>
          </div>
        </div>
        <div className="space-y-1.5 text-xs">
          {onboardingData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600">
                <span className="font-semibold text-slate-800">{item.value}</span>{' '}
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RevenueGrowthCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Revenue Growth</h3>
      <p className="text-4xl font-bold text-slate-900 mb-3">32%</p>
      <div className="flex items-center gap-1.5 text-sm">
        <ArrowUpRight className="w-4 h-4 text-green-500" />
        <span className="text-green-500 font-medium">6,2%</span>
        <span className="text-slate-400">from June</span>
      </div>
    </div>
  );
}

function MRRCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-1">
        Monthly Recurring Revenue
      </h3>
      <p className="text-3xl font-bold text-slate-900 mt-3">
        $65,250
      </p>
      <p className="text-xs text-slate-400 mb-2">MRR</p>
      <div className="flex items-center gap-1.5 text-sm">
        <ArrowUpRight className="w-4 h-4 text-green-500" />
        <span className="text-green-500 font-medium">12,2%</span>
        <span className="text-slate-400">from June</span>
      </div>
    </div>
  );
}

function ChurnPercentageCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-2">Churn Percentage</h3>
      <p className="text-4xl font-bold text-slate-900 mb-1">9.02%</p>
      <div className="flex items-center gap-1.5 text-sm mb-4">
        <ArrowDownRight className="w-4 h-4 text-green-500" />
        <span className="text-green-500 font-medium">6,2%</span>
        <span className="text-slate-400">from June</span>
      </div>
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={churnTrendData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChurnForecastCard() {
  const forecastData = [
    { label: 'Good', value: 60, color: '#312E81' },
    { label: 'Fair', value: 15, color: '#4338CA' },
    { label: 'At Risk', value: 25, color: '#6366F1' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-5">Churn Forecast</h3>
      <div className="space-y-4">
        {forecastData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-sm text-slate-600 w-14">{item.label}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-700 w-10 text-right">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EngagementTrendsCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Client Engagement Trends</h3>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-slate-400 rounded" />
              <span className="text-[11px] text-slate-400">Churn %</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-indigo-500 rounded" />
              <span className="text-[11px] text-slate-400">Average CRS</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>10 May - 27 May</span>
          </div>
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={engagementData}>
          <defs>
            <linearGradient id="crsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F1F5F9"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#94A3B8' }}
          />
          <Area
            type="monotone"
            dataKey="crs"
            stroke="#6366F1"
            strokeWidth={2}
            fill="url(#crsGradient)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="churn"
            stroke="#CBD5E1"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
