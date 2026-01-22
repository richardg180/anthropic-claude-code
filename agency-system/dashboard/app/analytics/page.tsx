'use client';

import { ArrowLeft, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Mock data - in production this would come from the analytics lib
const revenueData = [
  { month: 'Aug', mrr: 35000, target: 35000 },
  { month: 'Sep', mrr: 38000, target: 45000 },
  { month: 'Oct', mrr: 42000, target: 55000 },
  { month: 'Nov', mrr: 48000, target: 65000 },
  { month: 'Dec', mrr: 55000, target: 75000 },
  { month: 'Jan', mrr: 62000, target: 85000 },
];

const forecastData = [
  { month: 'Jan', actual: 62000, projected: 62000, target: 100000 },
  { month: 'Feb', actual: null, projected: 72000, target: 100000 },
  { month: 'Mar', actual: null, projected: 85000, target: 100000 },
  { month: 'Apr', actual: null, projected: 95000, target: 100000 },
  { month: 'May', actual: null, projected: 100000, target: 100000 },
];

const serviceBreakdown = [
  { service: 'Paid Advertising', value: 45, revenue: 28000 },
  { service: 'Social Media', value: 25, revenue: 15500 },
  { service: 'SEO', value: 15, revenue: 9300 },
  { service: 'Content Marketing', value: 10, revenue: 6200 },
  { service: 'Email Marketing', value: 5, revenue: 3000 },
];

const clientGrowth = [
  { month: 'Aug', clients: 12, new: 2, churned: 1 },
  { month: 'Sep', clients: 13, new: 3, churned: 2 },
  { month: 'Oct', clients: 14, new: 2, churned: 1 },
  { month: 'Nov', clients: 15, new: 3, churned: 2 },
  { month: 'Dec', clients: 16, new: 2, churned: 1 },
  { month: 'Jan', clients: 17, new: 2, churned: 1 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsPage() {
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
                Revenue Analytics
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Deep dive into your financial performance
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
            icon={<DollarSign className="w-6 h-6" />}
            label="Current MRR"
            value="£62,000"
            change="+12.7%"
            changeType="positive"
          />
          <MetricCard
            icon={<Target className="w-6 h-6" />}
            label="Target MRR"
            value="£100,000"
            change="38% to goal"
            changeType="neutral"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Growth Rate"
            value="12.7%"
            change="MoM"
            changeType="positive"
          />
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            label="Revenue per Client"
            value="£3,647"
            change="+8.2%"
            changeType="positive"
          />
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Revenue Growth (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [`£${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                name="MRR"
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

        {/* Forecast Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Revenue Forecast (Next 4 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [`£${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Actual"
                dot={{ fill: '#3b82f6', r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="#8b5cf6"
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Projected"
                dot={{ fill: '#8b5cf6', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="3 3"
                name="£100k Target"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Service Revenue Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Revenue by Service
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ service, value }) => `${service.split(' ')[0]} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `£${props.payload.revenue.toLocaleString()} (${value}%)`,
                    ''
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {serviceBreakdown.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-slate-700 dark:text-slate-300">{service.service}</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">
                    £{service.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Growth */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Client Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="new" fill="#10b981" name="New Clients" />
                <Bar dataKey="churned" fill="#ef4444" name="Churned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InsightCard
              title="Revenue Momentum"
              value="Strong"
              description="12.7% MoM growth puts you on track for £100k by May"
              color="green"
            />
            <InsightCard
              title="Client Retention"
              value="94.1%"
              description="Low churn rate indicates strong client satisfaction"
              color="blue"
            />
            <InsightCard
              title="Service Mix"
              value="Diversified"
              description="Paid Advertising dominates but good service distribution"
              color="purple"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  change,
  changeType
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}) {
  const changeColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-slate-600 dark:text-slate-400'
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-500 p-3 rounded-lg text-white">{icon}</div>
        <span className={`text-sm font-medium ${changeColors[changeType]}`}>{change}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

function InsightCard({
  title,
  value,
  description,
  color
}: {
  title: string;
  value: string;
  description: string;
  color: 'green' | 'blue' | 'purple';
}) {
  const colors = {
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
  };

  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h4>
      <p className={`text-2xl font-bold mb-2 ${colors[color]}`}>{value}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
