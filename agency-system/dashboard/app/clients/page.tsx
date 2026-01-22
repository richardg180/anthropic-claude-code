import { getAllClients } from '@/lib/markdown-parser';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
  const clients = getAllClients();

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
                All Clients
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {clients.length} active client{clients.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    MRR
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Health
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Renewal
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Services
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/clients/${client.id}`}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {client.primaryContact}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      £{client.contractValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getHealthColor(client.healthScore)}`} />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {client.healthScore.toFixed(1)}/5.0
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          ({client.healthStatus})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {client.renewalDate !== 'Unknown'
                        ? new Date(client.renewalDate).toLocaleDateString('en-GB')
                        : 'TBD'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {client.services.slice(0, 2).map((service, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {clients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">
              No clients found. Add your first client to get started!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function getHealthColor(score: number): string {
  if (score >= 4.5) return 'bg-green-500';
  if (score >= 3.5) return 'bg-blue-500';
  if (score >= 2.5) return 'bg-yellow-500';
  if (score > 0) return 'bg-red-500';
  return 'bg-slate-300';
}
