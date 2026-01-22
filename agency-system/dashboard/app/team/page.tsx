'use client';

import { ArrowLeft, Users, Target, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

// Mock team data - in production would come from actual team tracking
const teamMembers = [
  {
    id: 1,
    name: 'You (Founder)',
    role: 'CEO',
    clients: 17,
    utilization: 65,
    quality: 4.8,
    tasksCompleted: 42,
    tasksPending: 8,
    hoursWeek: 25,
    performance: 'excellent'
  },
  {
    id: 2,
    name: 'Account Manager 1',
    role: 'Account Manager',
    clients: 8,
    utilization: 85,
    quality: 4.6,
    tasksCompleted: 68,
    tasksPending: 12,
    hoursWeek: 40,
    performance: 'excellent'
  },
  {
    id: 3,
    name: 'Specialist - Paid Ads',
    role: 'Paid Ads Specialist',
    clients: 10,
    utilization: 90,
    quality: 4.7,
    tasksCompleted: 95,
    tasksPending: 15,
    hoursWeek: 40,
    performance: 'excellent'
  },
  {
    id: 4,
    name: 'Specialist - Social',
    role: 'Social Media Manager',
    clients: 12,
    utilization: 82,
    quality: 4.5,
    tasksCompleted: 78,
    tasksPending: 18,
    hoursWeek: 40,
    performance: 'good'
  },
];

const performanceData = [
  { category: 'Quality', You: 96, Team: 92 },
  { category: 'Speed', You: 88, Team: 90 },
  { category: 'Client Satisfaction', You: 95, Team: 93 },
  { category: 'Innovation', You: 90, Team: 75 },
  { category: 'Communication', You: 92, Team: 88 },
];

const utilizationData = teamMembers.map(member => ({
  name: member.name.split(' ')[0],
  utilization: member.utilization,
  optimal: 85
}));

const weeklyActivity = [
  { day: 'Mon', tasks: 24, hours: 32 },
  { day: 'Tue', tasks: 28, hours: 35 },
  { day: 'Wed', tasks: 32, hours: 38 },
  { day: 'Thu', tasks: 26, hours: 34 },
  { day: 'Fri', tasks: 22, hours: 30 },
];

export default function TeamPage() {
  const totalClients = teamMembers.reduce((sum, m) => sum + m.clients, 0);
  const avgUtilization = teamMembers.reduce((sum, m) => sum + m.utilization, 0) / teamMembers.length;
  const avgQuality = teamMembers.reduce((sum, m) => sum + m.quality, 0) / teamMembers.length;
  const totalTasks = teamMembers.reduce((sum, m) => sum + m.tasksCompleted + m.tasksPending, 0);

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
                Team Performance
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Monitor team productivity and capacity
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            label="Team Size"
            value={teamMembers.length.toString()}
            subtitle="members"
            color="blue"
          />
          <MetricCard
            icon={<Target className="w-6 h-6" />}
            label="Avg Utilization"
            value={`${avgUtilization.toFixed(0)}%`}
            subtitle="target: 85%"
            color="purple"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Avg Quality Score"
            value={avgQuality.toFixed(1)}
            subtitle="/ 5.0"
            color="green"
          />
          <MetricCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="Tasks This Week"
            value={totalTasks.toString()}
            subtitle="total"
            color="orange"
          />
        </div>

        {/* Team Performance Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Performance Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                <Radar name="You" dataKey="You" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Team Avg" dataKey="Team" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Utilization Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Team Utilization
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="utilization" fill="#3b82f6" name="Utilization %" />
                <Bar dataKey="optimal" fill="#10b981" fillOpacity={0.3} name="Optimal" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Members List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Team Members</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Clients
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Utilization
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Quality
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Tasks
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Hours/Week
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                      {member.clients}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 w-20">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${member.utilization}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {member.utilization}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {member.quality.toFixed(1)}
                        </span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {member.tasksCompleted}
                        </span>
                        <span className="text-slate-400 mx-1">/</span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {member.tasksPending}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                      {member.hoursWeek}h
                    </td>
                    <td className="px-6 py-4">
                      <PerformanceBadge performance={member.performance} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            This Week's Activity
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="tasks" fill="#3b82f6" name="Tasks Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, label, value, subtitle, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}) {
  const colors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className={`${colors[color]} p-3 rounded-lg text-white mb-4 w-fit`}>
        {icon}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        <span className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
}

function PerformanceBadge({ performance }: { performance: string }) {
  const styles = {
    excellent: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    good: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    average: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    poor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[performance as keyof typeof styles]}`}>
      {performance.charAt(0).toUpperCase() + performance.slice(1)}
    </span>
  );
}
