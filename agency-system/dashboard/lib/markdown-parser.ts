import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Client {
  id: string;
  name: string;
  status: string;
  accountOwner: string;
  startDate: string;
  contractValue: number;
  services: string[];
  healthScore: number;
  healthStatus: string;
  renewalDate: string;
  primaryContact: string;
  content: string;
}

export interface DashboardMetrics {
  totalMRR: number;
  totalClients: number;
  healthyClients: number;
  atRiskClients: number;
  avgHealthScore: number;
  upcomingRenewals: number;
}

const CLIENTS_DIR = path.join(process.cwd(), '..', 'clients');

export function getAllClients(): Client[] {
  try {
    const files = fs.readdirSync(CLIENTS_DIR);
    const clients: Client[] = [];

    files.forEach((filename) => {
      if (filename.endsWith('.md') && filename !== 'README.md' && !filename.includes('template') && !filename.includes('dashboard') && !filename.includes('active-clients')) {
        const filePath = path.join(CLIENTS_DIR, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Parse the markdown content to extract information
        const client = parseClientFile(filename, content);
        if (client) {
          clients.push(client);
        }
      }
    });

    return clients;
  } catch (error) {
    console.error('Error reading clients:', error);
    return [];
  }
}

function parseClientFile(filename: string, content: string): Client | null {
  try {
    const id = filename.replace('.md', '');

    // Extract client name from first heading
    const nameMatch = content.match(/# Client Profile: (.+)/);
    const name = nameMatch ? nameMatch[1] : id.replace(/-/g, ' ');

    // Extract key information using regex
    const statusMatch = content.match(/\*\*Status\*\*: (.+)/);
    const ownerMatch = content.match(/\*\*Account Owner\*\*: (.+)/);
    const startDateMatch = content.match(/\*\*Start Date\*\*: (.+)/);
    const contractValueMatch = content.match(/\*\*Contract Value\*\*: £(.+?)\/month/);
    const renewalDateMatch = content.match(/\*\*Renewal Date\*\*: (.+)/);
    const healthScoreMatch = content.match(/\*\*Overall Health\*\*: (.+?)\/5/);
    const contactMatch = content.match(/- \*\*Name\*\*: (.+)/);

    // Extract services
    const services: string[] = [];
    const servicesSection = content.match(/### Services Provided([\s\S]*?)###/);
    if (servicesSection) {
      const serviceMatches = servicesSection[1].matchAll(/- \[x\] (.+)/g);
      for (const match of serviceMatches) {
        services.push(match[1]);
      }
    }

    const healthScore = healthScoreMatch ? parseFloat(healthScoreMatch[1]) : 0;
    let healthStatus = 'Unknown';
    if (healthScore >= 4.5) healthStatus = 'Thriving';
    else if (healthScore >= 3.5) healthStatus = 'Healthy';
    else if (healthScore >= 2.5) healthStatus = 'At-Risk';
    else if (healthScore > 0) healthStatus = 'Critical';

    return {
      id,
      name,
      status: statusMatch ? statusMatch[1] : 'Unknown',
      accountOwner: ownerMatch ? ownerMatch[1] : 'Unknown',
      startDate: startDateMatch ? startDateMatch[1] : 'Unknown',
      contractValue: contractValueMatch ? parseFloat(contractValueMatch[1].replace(/,/g, '')) : 0,
      services,
      healthScore,
      healthStatus,
      renewalDate: renewalDateMatch ? renewalDateMatch[1] : 'Unknown',
      primaryContact: contactMatch ? contactMatch[1] : 'Unknown',
      content
    };
  } catch (error) {
    console.error(`Error parsing client file ${filename}:`, error);
    return null;
  }
}

export function getClientById(id: string): Client | null {
  const clients = getAllClients();
  return clients.find(client => client.id === id) || null;
}

export function getDashboardMetrics(): DashboardMetrics {
  const clients = getAllClients();
  const activeClients = clients.filter(c => c.status === 'Active');

  const totalMRR = activeClients.reduce((sum, client) => sum + client.contractValue, 0);
  const healthyClients = activeClients.filter(c => c.healthScore >= 3.5).length;
  const atRiskClients = activeClients.filter(c => c.healthScore < 3.5 && c.healthScore > 0).length;

  const avgHealthScore = activeClients.length > 0
    ? activeClients.reduce((sum, c) => sum + c.healthScore, 0) / activeClients.length
    : 0;

  // Count renewals in next 90 days
  const now = new Date();
  const in90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const upcomingRenewals = activeClients.filter(c => {
    if (c.renewalDate === 'Unknown') return false;
    const renewalDate = new Date(c.renewalDate);
    return renewalDate >= now && renewalDate <= in90Days;
  }).length;

  return {
    totalMRR,
    totalClients: activeClients.length,
    healthyClients,
    atRiskClients,
    avgHealthScore,
    upcomingRenewals
  };
}
