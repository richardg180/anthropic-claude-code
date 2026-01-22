import { getAllClients, getDashboardMetrics } from '@/lib/markdown-parser';
import {
  TrendingUp,
  Users,
  Heart,
  AlertTriangle,
  DollarSign,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const clients = getAllClients();
  const metrics = getDashboardMetrics();

  const thrivingClients = clients.filter(c => c.healthScore >= 4.5);
  const healthyClients = clients.filter(c => c.healthScore >= 3.5 && c.healthScore < 4.5);
  const atRiskClients = clients.filter(c => c.healthScore < 3.5 && c.healthScore > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Agency Command Center
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {new Date().toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/clients"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                View All Clients
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Monthly Recurring Revenue"
            value={`£${metrics.totalMRR.toLocaleString()}`}
            change="+12.5%"
            changeType="positive"
            color="blue"
          />
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            label="Active Clients"
            value={metrics.totalClients.toString()}
            subtitle="clients"
            color="purple"
          />
          <MetricCard
            icon={<Heart className="w-6 h-6" />}
            label="Avg Health Score"
            value={metrics.avgHealthScore.toFixed(1)}
            subtitle="/ 5.0"
            color="green"
          />
          <MetricCard
            icon={<Calendar className="w-6 h-6" />}
            label="Upcoming Renewals"
            value={metrics.upcomingRenewals.toString()}
            subtitle="next 90 days"
            color="orange"
          />
        </div>

        {/* Client Health Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Thriving Clients */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  🟢 Thriving ({thrivingClients.length})
                </h3>
                <span className="text-sm text-green-600 dark:text-green-400">4.5+ score</span>
              </div>
            </div>
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {thrivingClients.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm text-center py-4">
                  No thriving clients yet
                </p>
              ) : (
                thrivingClients.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))
              )}
            </div>
          </div>

          {/* Healthy Clients */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  🔵 Healthy ({healthyClients.length})
                </h3>
                <span className="text-sm text-blue-600 dark:text-blue-400">3.5-4.4 score</span>
              </div>
            </div>
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {healthyClients.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm text-center py-4">
                  No healthy clients yet
                </p>
              ) : (
                healthyClients.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))
              )}
            </div>
          </div>

          {/* At-Risk Clients */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-red-50 dark:bg-red-900/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                  🔴 At-Risk ({atRiskClients.length})
                </h3>
                <span className="text-sm text-red-600 dark:text-red-400">&lt;3.5 score</span>
              </div>
            </div>
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {atRiskClients.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-sm text-center py-4">
                  No at-risk clients 🎉
                </p>
              ) : (
                atRiskClients.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickAction
              title="View 60-Day Sprint"
              description="Track progress to £100k/month"
              href="/sprint"
            />
            <QuickAction
              title="Team Dashboard"
              description="View team performance & capacity"
              href="/team"
            />
            <QuickAction
              title="Revenue Analytics"
              description="Deep dive into financials"
              href="/analytics"
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
  subtitle,
  change,
  changeType,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  color: 'blue' | 'purple' | 'green' | 'orange';
}) {
  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses[color]} p-3 rounded-lg text-white`}>
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        {subtitle && (
          <span className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</span>
        )}
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: any }) {
  return (
    <Link
      href={`/clients/${client.id}`}
      className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {client.name}
        </h4>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">
          £{client.contractValue.toLocaleString()}/mo
        </span>
        <span className="font-medium text-slate-900 dark:text-white">
          {client.healthScore.toFixed(1)}/5.0
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {client.services.slice(0, 2).map((service: string, idx: number) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
          >
            {service.split(' ')[0]}
          </span>
        ))}
        {client.services.length > 2 && (
          <span className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
            +{client.services.length - 2}
          </span>
        )}
      </div>
    </Link>
  );
}

function QuickAction({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
    >
      <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
        {title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </Link>
  );
}
