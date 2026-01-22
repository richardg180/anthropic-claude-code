/**
 * GoCardless Payment Integration
 *
 * Setup Instructions:
 * 1. Get your GoCardless access token from your dashboard
 * 2. Set GOCARDLESS_ACCESS_TOKEN in your .env.local file
 * 3. Set up webhook endpoint for real-time payment notifications
 * 4. Install: npm install gocardless-nodejs
 */

export interface PaymentEvent {
  id: string;
  type: 'payment_confirmed' | 'payment_failed' | 'subscription_cancelled';
  clientId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  clientId: string;
  amount: number;
  currency: string;
  status: 'active' | 'cancelled' | 'paused';
  startDate: string;
  nextPaymentDate: string;
}

export class GoCardlessClient {
  private accessToken: string;
  private baseUrl = 'https://api.gocardless.com';
  private environment: 'sandbox' | 'live';

  constructor(accessToken: string, environment: 'sandbox' | 'live' = 'sandbox') {
    this.accessToken = accessToken;
    this.environment = environment;
  }

  /**
   * Get all active subscriptions
   */
  async getSubscriptions(): Promise<Subscription[]> {
    try {
      const response = await fetch(`${this.baseUrl}/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'GoCardless-Version': '2015-07-06',
        },
      });

      if (!response.ok) {
        throw new Error(`GoCardless API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.subscriptions || [];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  }

  /**
   * Get payment history for a client
   */
  async getPaymentHistory(customerId: string): Promise<PaymentEvent[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/payments?customer=${customerId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'GoCardless-Version': '2015-07-06',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GoCardless API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.payments || [];
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  }

  /**
   * Handle webhook events
   */
  async handleWebhook(event: any): Promise<void> {
    switch (event.resource_type) {
      case 'payments':
        await this.handlePaymentEvent(event);
        break;
      case 'subscriptions':
        await this.handleSubscriptionEvent(event);
        break;
      default:
        console.log('Unhandled event type:', event.resource_type);
    }
  }

  /**
   * Handle payment events (confirmed, failed, etc.)
   */
  private async handlePaymentEvent(event: any): Promise<void> {
    const payment = event.links.payment;
    const action = event.action;

    if (action === 'confirmed') {
      console.log('✅ Payment confirmed:', payment);
      // Update client financial health score
      // Send confirmation notification
    } else if (action === 'failed') {
      console.log('❌ Payment failed:', payment);
      // Alert team immediately
      // Update client health score
      // Trigger recovery workflow
    }
  }

  /**
   * Handle subscription events
   */
  private async handleSubscriptionEvent(event: any): Promise<void> {
    const subscription = event.links.subscription;
    const action = event.action;

    if (action === 'cancelled') {
      console.log('🚨 Subscription cancelled:', subscription);
      // Update client status
      // Alert team
      // Trigger retention workflow
    }
  }

  /**
   * Calculate MRR from active subscriptions
   */
  async calculateMRR(): Promise<number> {
    const subscriptions = await this.getSubscriptions();
    const activeSubscriptions = subscriptions.filter(s => s.status === 'active');

    return activeSubscriptions.reduce((total, sub) => {
      return total + sub.amount;
    }, 0);
  }

  /**
   * Get failed payments in last 30 days
   */
  async getFailedPayments(): Promise<PaymentEvent[]> {
    // Implementation would query GoCardless API for failed payments
    return [];
  }

  /**
   * Send payment reminder to client
   */
  async sendPaymentReminder(customerId: string): Promise<void> {
    console.log('Sending payment reminder to:', customerId);
    // Implementation would use GoCardless API to send reminder
  }
}

/**
 * Webhook endpoint handler (Next.js API route)
 *
 * Create this file: app/api/webhooks/gocardless/route.ts
 *
 * import { GoCardlessClient } from '@/lib/integrations/gocardless';
 *
 * export async function POST(request: Request) {
 *   const payload = await request.json();
 *   const signature = request.headers.get('webhook-signature');
 *
 *   // Verify webhook signature
 *   // Process events
 *   const client = new GoCardlessClient(process.env.GOCARDLESS_ACCESS_TOKEN!);
 *
 *   for (const event of payload.events) {
 *     await client.handleWebhook(event);
 *   }
 *
 *   return Response.json({ received: true });
 * }
 */

/**
 * Example usage:
 *
 * const gocardless = new GoCardlessClient(process.env.GOCARDLESS_ACCESS_TOKEN!);
 *
 * // Get all subscriptions
 * const subscriptions = await gocardless.getSubscriptions();
 *
 * // Calculate total MRR
 * const mrr = await gocardless.calculateMRR();
 *
 * // Get payment history for a client
 * const payments = await gocardless.getPaymentHistory('customer-id');
 *
 * // Get failed payments
 * const failed = await gocardless.getFailedPayments();
 */
