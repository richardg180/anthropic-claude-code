'use client';

import { TrendingUp, DollarSign, Users, Calendar, FileText, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock client portal data - would come from authenticated session
const clientData = {
  name: 'Dr Nyla Clinic',
  contactName: 'Emma',
  accountManager: 'Your Account Manager',
  contractStart: '2026-01-22',
  monthlyValue: 2000,
  services: ['Paid Advertising', 'Social Media Management'],
};

const performanceData = [
  { month: 'Week 1', leads: 12, engagement: 850, spend: 450 },
  { month: 'Week 2', leads: 18, engagement: 1200, spend: 480 },
  { month: 'Week 3', leads: 25, engagement: 1600, spend: 500 },
  { month: 'Week 4', leads: 31, engagement: 2100, spend: 520 },
];

const upcomingDeliverables = [
  { name: 'Monthly Performance Report', dueDate: '2026-02-05', status: 'in-progress' },
  { name: 'Social Media Content Calendar', dueDate: '2026-02-01', status: 'completed' },
  { name: 'Weekly Check-in Call', dueDate: '2026-01-28', status: 'scheduled' },
];

const recentUpdates = [
  {
    date: '2026-01-22',
    title: 'Campaign Launched Successfully',
    description: 'Your paid advertising campaigns are now live on Google and Meta. Initial performance looks promising with 12 leads in the first 3 days.'
  },
  {
    date: '2026-01-23',
    title: 'Social Media Strategy Approved',
    description: 'Content calendar for February has been finalized. We'll be posting 5x per week focusing on before/after results and treatment education.'
  },
  {
    date: '2026-01-24',
    title: 'Website Analytics Setup Complete',
    description: 'Google Analytics 4 and conversion tracking are now properly configured to measure campaign performance.'
  },
];

export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, {clientData.contactName}!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {clientData.name} Performance Dashboard
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors">
                Download Report
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Schedule Meeting
              </button>
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
            label="Total Leads (This Month)"
            value="86"
            change="+42%"
            changeType="positive"
          />
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Cost Per Lead"
            value="£22.50"
            change="-18%"
            changeType="positive"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Social Engagement"
            value="5,750"
            change="+65%"
            changeType="positive"
          />
          <MetricCard
            icon={<BarChart3 className="w-6 h-6" />}
            label="Campaign Performance"
            value="4.2/5"
            change="Excellent"
            changeType="neutral"
          />
        </div>

        {/* Performance Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Campaign Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
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
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Leads Generated"
                dot={{ fill: '#3b82f6', r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#8b5cf6"
                strokeWidth={3}
                name="Social Engagement"
                dot={{ fill: '#8b5cf6', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Updates */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Recent Updates
            </h3>
            <div className="space-y-4">
              {recentUpdates.map((update, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {update.title}
                    </h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(update.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {update.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deliverables */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Upcoming Deliverables
            </h3>
            <div className="space-y-3">
              {upcomingDeliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Due: {new Date(item.dueDate).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services & Account Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Your Services
            </h3>
            <div className="space-y-3">
              {clientData.services.map((service, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <p className="font-medium text-blue-900 dark:text-blue-100">{service}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Account Information
            </h3>
            <div className="space-y-3">
              <InfoRow label="Account Manager" value={clientData.accountManager} />
              <InfoRow label="Contract Start" value={new Date(clientData.contractStart).toLocaleDateString('en-GB')} />
              <InfoRow label="Monthly Investment" value={`£${clientData.monthlyValue.toLocaleString()}`} />
              <InfoRow label="Next Review" value="February 5, 2026" />
            </div>
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    scheduled: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
      <span className="text-slate-600 dark:text-slate-400">{label}</span>
      <span className="font-medium text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}
