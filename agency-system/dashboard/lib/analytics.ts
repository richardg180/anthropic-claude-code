import { getAllClients } from './markdown-parser';

export interface RevenueDataPoint {
  month: string;
  mrr: number;
  newClients: number;
  churnedClients: number;
  netMRR: number;
}

export interface ClientGrowthData {
  month: string;
  totalClients: number;
  newClients: number;
  churned: number;
}

export interface ServiceBreakdown {
  service: string;
  clients: number;
  revenue: number;
}

export function getRevenueHistory(): RevenueDataPoint[] {
  // Mock historical data - in real world, this would come from database
  const clients = getAllClients();
  const currentMRR = clients.reduce((sum, c) => sum + c.contractValue, 0);

  // Generate 6 months of historical data
  const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  const baseRevenue = 35000; // Starting point from user's £30-40k mention

  return months.map((month, idx) => {
    const growth = idx * 5000; // Simulate growth
    const mrr = baseRevenue + growth + (idx === 5 ? currentMRR - baseRevenue - growth : 0);

    return {
      month,
      mrr,
      newClients: idx === 0 ? 0 : Math.floor(Math.random() * 3) + 1,
      churnedClients: Math.floor(Math.random() * 2),
      netMRR: idx === 0 ? baseRevenue : growth
    };
  });
}

export function getClientGrowthHistory(): ClientGrowthData[] {
  const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  let totalClients = 12; // Starting point

  return months.map((month, idx) => {
    const newClients = idx === 0 ? 0 : Math.floor(Math.random() * 3) + 1;
    const churned = Math.floor(Math.random() * 2);
    totalClients = totalClients + newClients - churned;

    return {
      month,
      totalClients,
      newClients,
      churned
    };
  });
}

export function getServiceBreakdown(): ServiceBreakdown[] {
  const clients = getAllClients();
  const serviceMap = new Map<string, { clients: number; revenue: number }>();

  clients.forEach(client => {
    client.services.forEach(service => {
      const current = serviceMap.get(service) || { clients: 0, revenue: 0 };
      serviceMap.set(service, {
        clients: current.clients + 1,
        revenue: current.revenue + client.contractValue / client.services.length
      });
    });
  });

  return Array.from(serviceMap.entries()).map(([service, data]) => ({
    service,
    clients: data.clients,
    revenue: Math.round(data.revenue)
  }));
}

export function getHealthTrend(): { month: string; avgHealth: number }[] {
  const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

  return months.map((month, idx) => ({
    month,
    avgHealth: 3.5 + (idx * 0.1) // Simulate improving health
  }));
}

export function getRevenueForecast(): { month: string; projected: number; target: number }[] {
  const clients = getAllClients();
  const currentMRR = clients.reduce((sum, c) => sum + c.contractValue, 0);

  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return months.map((month, idx) => ({
    month,
    projected: currentMRR + (idx + 1) * 15000, // Growth projection
    target: 100000 // £100k target from 60-day sprint
  }));
}
