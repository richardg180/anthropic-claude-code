/**
 * HubSpot CRM Integration
 *
 * Setup Instructions:
 * 1. Get your HubSpot API key from Settings > Integrations > API Key
 * 2. Set HUBSPOT_API_KEY in your .env.local file
 * 3. Install: npm install @hubspot/api-client
 */

export interface HubSpotContact {
  id: string;
  properties: {
    email: string;
    firstname: string;
    lastname: string;
    phone?: string;
    company?: string;
  };
}

export interface HubSpotDeal {
  id: string;
  properties: {
    dealname: string;
    amount: string;
    dealstage: string;
    closedate: string;
  };
}

export class HubSpotClient {
  private apiKey: string;
  private baseUrl = 'https://api.hubapi.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Sync client to HubSpot as a contact and deal
   */
  async syncClient(client: {
    name: string;
    email: string;
    phone?: string;
    contractValue: number;
    healthScore: number;
    renewalDate: string;
  }) {
    try {
      // Create or update contact
      const contact = await this.upsertContact({
        email: client.email,
        firstname: client.name.split(' ')[0],
        lastname: client.name.split(' ').slice(1).join(' '),
        phone: client.phone,
        company: client.name,
      });

      // Create or update deal
      const deal = await this.upsertDeal({
        dealname: `${client.name} - Monthly Retainer`,
        amount: client.contractValue.toString(),
        dealstage: 'closedwon',
        closedate: new Date().toISOString(),
        client_health_score: client.healthScore.toString(),
        renewal_date: client.renewalDate,
      });

      return { contact, deal };
    } catch (error) {
      console.error('Error syncing to HubSpot:', error);
      throw error;
    }
  }

  /**
   * Update client health score in HubSpot
   */
  async updateHealthScore(clientEmail: string, healthScore: number) {
    try {
      const response = await fetch(
        `${this.baseUrl}/crm/v3/objects/contacts/${clientEmail}?idProperty=email`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              client_health_score: healthScore.toString(),
              health_status: this.getHealthStatus(healthScore),
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating health score:', error);
      throw error;
    }
  }

  /**
   * Log activity to HubSpot timeline
   */
  async logActivity(contactId: string, activity: {
    type: string;
    title: string;
    description: string;
  }) {
    try {
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            hs_note_body: `**${activity.title}**\n\n${activity.description}`,
            hs_timestamp: new Date().toISOString(),
          },
          associations: [
            {
              to: { id: contactId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error logging activity:', error);
      throw error;
    }
  }

  private async upsertContact(properties: Record<string, any>) {
    // Implementation would use HubSpot's upsert API
    return { id: 'mock-contact-id', properties };
  }

  private async upsertDeal(properties: Record<string, any>) {
    // Implementation would use HubSpot's upsert API
    return { id: 'mock-deal-id', properties };
  }

  private getHealthStatus(score: number): string {
    if (score >= 4.5) return 'Thriving';
    if (score >= 3.5) return 'Healthy';
    if (score >= 2.5) return 'At-Risk';
    return 'Critical';
  }
}

/**
 * Example usage:
 *
 * const hubspot = new HubSpotClient(process.env.HUBSPOT_API_KEY!);
 *
 * // Sync a client
 * await hubspot.syncClient({
 *   name: 'Dr Nyla Clinic',
 *   email: 'emma@drnyla.com',
 *   contractValue: 2000,
 *   healthScore: 4.0,
 *   renewalDate: '2026-04-22'
 * });
 *
 * // Update health score
 * await hubspot.updateHealthScore('emma@drnyla.com', 4.2);
 *
 * // Log activity
 * await hubspot.logActivity('contact-id', {
 *   type: 'meeting',
 *   title: 'Kickoff Call',
 *   description: 'Discussed campaign strategy and goals'
 * });
 */
