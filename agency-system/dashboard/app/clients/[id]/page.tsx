import { getClientById } from '@/lib/markdown-parser';
import { ArrowLeft, Calendar, DollarSign, Heart, User, Mail, Phone, FileText } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = getClientById(id);

  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/clients"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {client.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(client.status)}`}>
                  {client.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthBadge(client.healthScore)}`}>
                  {client.healthStatus} - {client.healthScore.toFixed(1)}/5.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Key Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Quick Stats
              </h2>
              <div className="space-y-4">
                <StatItem
                  icon={<DollarSign className="w-5 h-5" />}
                  label="Monthly Value"
                  value={`£${client.contractValue.toLocaleString()}`}
                />
                <StatItem
                  icon={<Calendar className="w-5 h-5" />}
                  label="Start Date"
                  value={new Date(client.startDate).toLocaleDateString('en-GB')}
                />
                <StatItem
                  icon={<Calendar className="w-5 h-5" />}
                  label="Renewal Date"
                  value={client.renewalDate !== 'Unknown' ? new Date(client.renewalDate).toLocaleDateString('en-GB') : 'TBD'}
                />
                <StatItem
                  icon={<Heart className="w-5 h-5" />}
                  label="Health Score"
                  value={`${client.healthScore.toFixed(1)}/5.0`}
                />
                <StatItem
                  icon={<User className="w-5 h-5" />}
                  label="Account Owner"
                  value={client.accountOwner}
                />
              </div>
            </div>

            {/* Primary Contact */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Primary Contact
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-700 dark:text-slate-300">{client.primaryContact}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Services Provided
              </h2>
              <div className="flex flex-wrap gap-2">
                {client.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Full Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(client.content) }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-blue-600 dark:text-blue-400 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
        <p className="font-medium text-slate-900 dark:text-white truncate">{value}</p>
      </div>
    </div>
  );
}

function getStatusBadge(status: string): string {
  const statusMap: Record<string, string> = {
    Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    Inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    Paused: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  };
  return statusMap[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
}

function getHealthBadge(score: number): string {
  if (score >= 4.5) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
  if (score >= 3.5) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
  if (score >= 2.5) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
  if (score > 0) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
}

function formatMarkdown(content: string): string {
  // Simple markdown to HTML conversion
  let html = content;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(new RegExp('(<li>.*<\\/li>)', 's'), '<ul>$1</ul>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[123]>)/g, '$1');
  html = html.replace(/(<\/h[123]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/---/g, '<hr />');

  return html;
}
