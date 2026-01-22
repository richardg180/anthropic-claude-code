'use client';

import { ArrowLeft, Check, X, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  logo: string;
  setupInstructions: string[];
}

export default function SettingsPage() {
  const [integrations] = useState<Integration[]>([
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      description: 'Sync client data, health scores, and activities to your CRM',
      status: 'disconnected',
      logo: '🔷',
      setupInstructions: [
        'Get your HubSpot API key from Settings > Integrations > API Key',
        'Create a .env.local file in the dashboard folder',
        'Add: HUBSPOT_API_KEY=your_api_key_here',
        'Restart the dashboard server',
        'Test the connection below'
      ]
    },
    {
      id: 'gocardless',
      name: 'GoCardless',
      description: 'Track payments, subscriptions, and automate financial health updates',
      status: 'disconnected',
      logo: '💳',
      setupInstructions: [
        'Get your GoCardless access token from your dashboard',
        'Add to .env.local: GOCARDLESS_ACCESS_TOKEN=your_token_here',
        'Set up webhook endpoint: https://yourdomain.com/api/webhooks/gocardless',
        'Add webhook URL in GoCardless dashboard',
        'Test the connection below'
      ]
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Auto-create events for deliverables, meetings, and renewals',
      status: 'disconnected',
      logo: '📅',
      setupInstructions: [
        'Enable Google Calendar API in Google Cloud Console',
        'Create OAuth 2.0 credentials',
        'Add credentials to .env.local',
        'Authorize the application',
        'Configure calendar sync settings'
      ]
    }
  ]);

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
                Settings & Integrations
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Connect your tools to automate your agency
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Integrations */}
        <div className="space-y-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{integration.logo}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                        {integration.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={integration.status} />
                </div>

                {/* Setup Instructions */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-3">
                    Setup Instructions:
                  </h4>
                  <ol className="space-y-2">
                    {integration.setupInstructions.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="font-medium text-blue-600 dark:text-blue-400 flex-shrink-0">
                          {idx + 1}.
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {integration.status === 'disconnected' ? (
                    <>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        Connect {integration.name}
                      </button>
                      <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors">
                        View Documentation
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors">
                        Disconnect
                      </button>
                      <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Test Connection
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">
                  What gets automated:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {getFeatures(integration.id).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Environment Variables Template */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            .env.local Template
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Create this file in your dashboard folder with your API keys:
          </p>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
            <pre>{`# HubSpot Integration
HUBSPOT_API_KEY=your_hubspot_api_key_here

# GoCardless Integration
GOCARDLESS_ACCESS_TOKEN=your_gocardless_token_here
GOCARDLESS_ENVIRONMENT=sandbox  # or 'live'

# Google Calendar Integration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Webhook Secret (for security)
WEBHOOK_SECRET=your_random_secret_here`}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    connected: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      icon: <Check className="w-4 h-4" />
    },
    disconnected: {
      bg: 'bg-slate-100 dark:bg-slate-700',
      text: 'text-slate-700 dark:text-slate-300',
      icon: <X className="w-4 h-4" />
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      icon: <X className="w-4 h-4" />
    }
  };

  const style = styles[status as keyof typeof styles] || styles.disconnected;

  return (
    <div className={`${style.bg} ${style.text} px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium`}>
      {style.icon}
      <span className="capitalize">{status}</span>
    </div>
  );
}

function getFeatures(integrationId: string): string[] {
  const features: Record<string, string[]> = {
    hubspot: [
      'Auto-sync client health scores',
      'Log all client interactions',
      'Create deals for new clients',
      'Update contact properties',
      'Track renewal pipeline',
      'Automated activity logging'
    ],
    gocardless: [
      'Real-time payment notifications',
      'Failed payment alerts',
      'MRR calculation',
      'Subscription status tracking',
      'Payment history',
      'Automatic health score updates'
    ],
    calendar: [
      'Auto-create deliverable deadlines',
      'Renewal countdown reminders',
      'Meeting scheduling automation',
      'Team availability sync',
      'Client meeting logs',
      'Time blocking for tasks'
    ]
  };

  return features[integrationId] || [];
}
