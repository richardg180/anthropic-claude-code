# GoCardless Integration

**Purpose**: Automate payment tracking, financial health monitoring, and billing workflows using GoCardless.

**What is GoCardless**: Payment platform for recurring Direct Debit payments (UK, EU, US, Australia, etc.)

---

## 🎯 What Gets Automated

### From GoCardless → Your System
- **Payment status** → Updates client financial health score
- **Subscription status** → Tracks active/cancelled subscriptions
- **Failed payments** → Immediate alerts and client health updates
- **Successful payments** → Confirms billing, updates tracking
- **MRR/ARR calculation** → Automatic revenue tracking
- **Customer info updates** → Syncs billing details
- **Payout tracking** → Cash flow monitoring

### From Your System → GoCardless
- **New client onboarding** → Create customer and subscription
- **Service changes** → Update subscription amount
- **Cancellations** → Cancel subscriptions properly
- **Manual payments** → Record one-off charges

---

## 🔧 Setup Guide

### Step 1: Get GoCardless API Access

1. Log into [GoCardless Dashboard](https://manage.gocardless.com)
2. Go to Developers → API Keys
3. Create API token (use Sandbox for testing first)
4. Copy your access token

### Step 2: Store API Key Securely

```bash
# Add to .env file
echo "GOCARDLESS_ACCESS_TOKEN=your_access_token_here" >> .env
echo "GOCARDLESS_ENVIRONMENT=sandbox" >> .env  # Change to 'live' when ready

# Make sure .env is in .gitignore
echo ".env" >> .gitignore
```

### Step 3: Map Clients to GoCardless Customers

Create mapping file:

```bash
"Create GoCardless mapping for all clients"
```

This creates `gocardless-mapping.json`:
```json
{
  "clients": [
    {
      "markdown_file": "clients/acme-corp.md",
      "gocardless_customer_id": "CU123456",
      "gocardless_subscription_id": "SB123456",
      "mrr": 5000,
      "billing_day": 1
    }
  ]
}
```

---

## 💰 Payment Tracking Workflows

### Workflow 1: Daily Payment Status Check

**Every morning at 8 AM**:

```bash
# Script: integrations/gocardless-daily-sync.sh
```

**What it does**:
1. Pull all payment events from last 24 hours
2. Update client financial health scores
3. Flag any failed payments
4. Alert on any issues
5. Update client-success-dashboard.md

**Example Output**:
```
💰 PAYMENT STATUS UPDATE

✅ SUCCESSFUL PAYMENTS (4):
• Acme Corp: $5,000 - Monthly retainer
• Widget Inc: $3,500 - Monthly retainer
• TechStart: $2,000 - Monthly retainer
• ClientX: $7,500 - Monthly retainer

❌ FAILED PAYMENTS (1):
• ClientY: $4,000 - Payment failed (insufficient funds)
  Action Required: Contact client immediately

⏳ PENDING PAYMENTS (2):
• ClientZ: $3,000 - Expected today
• CompanyA: $2,500 - Expected tomorrow

TOTAL MRR COLLECTED TODAY: $18,000
ISSUES REQUIRING ATTENTION: 1
```

---

### Workflow 2: Failed Payment Alert & Response

**When payment fails in GoCardless**:

**Automatic Actions**:
1. **Immediate Alert** (within 5 minutes):
   - Email/Slack notification
   - Shows client details and amount
   - Failure reason from GoCardless

2. **Update Client Health Score**:
   - Financial health category drops to 2 or 1
   - Overall health score recalculated
   - Client moved to "At-Risk" if not already

3. **Create Follow-Up Tasks**:
   - Calendar event: "Contact [Client] about failed payment"
   - HubSpot task (if integrated)
   - Notes added to client file

4. **Draft Communication**:
   - Pre-written email template ready
   - Professional and empathetic tone
   - Clear next steps

**Example Alert**:
```
🚨 PAYMENT FAILED: Acme Corp

Amount: $5,000
Reason: Insufficient funds
Subscription: Monthly retainer
Last successful payment: 2024-12-01

CLIENT IMPACT:
• Health score dropped: 4.5 → 3.2 (At-Risk)
• Financial health: 5 → 2
• Payment is 1 day overdue

ACTIONS TAKEN:
✅ Client marked as at-risk
✅ Task created: "Contact Acme Corp about payment"
✅ Email draft prepared (see below)
✅ Automatic retry scheduled in GoCardless (3 days)

RECOMMENDED NEXT STEPS:
1. Call client immediately (primary contact: John Smith)
2. Send payment failure email (draft ready)
3. Offer payment plan if needed
4. Document conversation in client file

📧 DRAFT EMAIL READY:
"Subject: Payment Update Needed - Acme Corp
[View draft]"
```

---

### Workflow 3: MRR/ARR Tracking

**Automatic calculation**:
```
"Calculate current MRR and ARR from GoCardless"
```

**Claude Code provides**:
```
📊 REVENUE METRICS (as of [Date])

MONTHLY RECURRING REVENUE (MRR):
• Total: $45,000
• Active subscriptions: 12
• Average per client: $3,750

GROWTH THIS MONTH:
• New MRR: +$8,000 (2 new clients)
• Expansion MRR: +$2,000 (1 upsell)
• Churned MRR: -$3,000 (1 client lost)
• Net New MRR: +$7,000 (+18.4%)

ANNUAL RECURRING REVENUE (ARR):
• Total: $540,000 (MRR × 12)
• Growth rate: 22% YoY

BY CLIENT TIER:
• Enterprise (>$10k): $25,000 (3 clients)
• Mid-Market ($5-10k): $15,000 (3 clients)
• Small Business (<$5k): $5,000 (6 clients)

PAYMENT HEALTH:
• On-time payment rate: 95%
• Average days to collect: 1.2
• Failed payment rate: 5%

CHURN RISK:
• Subscriptions at risk: 2 ($8,000 MRR)
• Expected churn next 90 days: $5,000
```

---

### Workflow 4: New Client Billing Setup

**When you onboard a new client**:
```
"Set up GoCardless billing for new client:
Company: Acme Corp
Contact: John Smith
Email: john@acme.com
Amount: $5,000/month
Start date: Feb 1, 2024
"
```

**Claude Code does**:
1. Creates customer in GoCardless
2. Sends Direct Debit mandate for signature
3. Creates subscription once mandate confirmed
4. Updates client file with billing details
5. Adds to gocardless-mapping.json
6. Creates calendar reminder for first payment
7. Sets up financial health tracking

**Output**:
```
✅ GOCARDLESS SETUP COMPLETE: Acme Corp

1. Customer Created
   • Customer ID: CU123456
   • Email: john@acme.com

2. Mandate Sent
   • Sent to: john@acme.com
   • Status: Pending signature
   • Direct Debit: UK scheme

3. Subscription Ready
   • Amount: $5,000/month
   • Start date: Feb 1, 2024
   • Billing day: 1st of month
   • Subscription ID: SB123456

4. System Updates
   ✅ Added to clients/acme-corp.md
   ✅ Added to gocardless-mapping.json
   ✅ Calendar reminder set for Feb 1
   ✅ Financial health tracking enabled

NEXT STEPS:
• Wait for John to sign mandate (sent via email)
• First payment will be collected on Feb 1, 2024
• You'll be notified when mandate is confirmed
```

---

## 📊 Financial Health Monitoring

### Automatic Health Score Updates

GoCardless payment status directly affects **Financial Health category** (15% of overall health score):

**Score 5 - Excellent**:
- Pays on time or early every month
- No failed payments in last 6 months
- Has increased budget/scope
- No billing disputes

**Score 4 - Good**:
- Pays on time consistently
- Maybe 1 late payment in last 6 months (within 5 days)
- Budget stable

**Score 3 - Acceptable**:
- Occasional late payment (5-15 days)
- 1-2 failed payment attempts in last 6 months
- Budget pressure mentioned

**Score 2 - Concerning**:
- Frequently late (15-30 days)
- Multiple failed payments
- Requested budget reduction
- Cash flow issues evident

**Score 1 - Critical**:
- 30+ days overdue
- Not responding about payment
- Subscription cancelled or suspended
- Payment plans needed

**Updates happen automatically when**:
- Payment succeeds → May improve score
- Payment fails → Score drops immediately
- Payment is X days late → Progressive score drop

---

## 🔔 GoCardless Webhooks

### Set Up Real-Time Notifications

**Configure webhooks in GoCardless Dashboard**:
1. Go to Developers → Webhooks
2. Add webhook URL: `https://your-domain.com/webhooks/gocardless`
3. Select events to receive

### Webhook Events to Monitor

#### Critical Events (Immediate Action)
- **`payment_failed`**: Payment failed
- **`payment_charged_back`**: Customer reversed payment
- **`mandate_cancelled`**: Customer cancelled Direct Debit
- **`subscription_cancelled`**: Subscription ended

**Your response**:
- Alert sent immediately
- Health score updated
- Follow-up task created
- Client marked at-risk

#### Positive Events (Track & Celebrate)
- **`payment_confirmed`**: Payment successful
- **`payment_paid_out`**: Money in your bank
- **`mandate_activated`**: New customer ready
- **`subscription_created`**: New recurring revenue

**Your response**:
- Update tracking
- Improve health score
- Send thank you (if first payment)
- Update MRR calculations

#### Informational Events (Monitor)
- **`payment_pending_submission`**: Payment being processed
- **`payment_retry_scheduled`**: Automatic retry set
- **`subscription_payment_created`**: Next payment scheduled

---

## 💬 Client Communication Templates

### Email: Payment Failed

```
Subject: Payment Update Needed - [Company Name]

Hi [Name],

I wanted to reach out quickly. We attempted to collect your payment of $[amount] on [date], but it wasn't successful.

The payment provider indicated: [reason from GoCardless]

This is completely normal and easy to fix. Here are a few ways to resolve this:

1. **Update your payment details**: [Link to GoCardless portal]
2. **Make a manual payment**: I can send you a payment link
3. **Set up alternative method**: We can use card or bank transfer

We've automatically scheduled a retry for [retry date], so if you have sufficient funds then, it'll process automatically.

Your services remain active - we just wanted to give you a heads up.

Let me know if you have any questions or if there's anything I can do to help!

Thanks,
[Your Name]

P.S. If you're experiencing any budget constraints, let's chat. We're happy to work with you on payment terms.
```

### Slack Alert: Payment Failed

```
🚨 PAYMENT FAILED

Client: Acme Corp
Amount: $5,000
Reason: Insufficient funds
Health Score: 4.5 → 3.2 (At-Risk)

Actions:
• [ ] Call client today
• [ ] Send payment email
• [ ] Update in weekly review

Auto-retry: Feb 15 (3 days)

[View Client File] [View Draft Email]
```

---

## 📈 Revenue Reporting

### Monthly Revenue Report

```
"Generate monthly revenue report from GoCardless"
```

**Claude Code creates**:
```
📊 MONTHLY REVENUE REPORT - January 2024

COLLECTIONS:
• Total Collected: $45,000
• Number of payments: 12
• Success rate: 95%
• Average payment: $3,750

GROWTH:
• New MRR: +$8,000
• Expansion: +$2,000
• Churn: -$3,000
• Net Growth: +$7,000 (+18.4%)

BY CLIENT:
• Top 3 clients: $25,000 (56% of MRR)
• Average client value: $3,750
• Clients >$5k: 6 (67% of MRR)

PAYMENT ISSUES:
• Failed payments: 2
• Late payments: 1
• Disputes: 0
• Total at-risk MRR: $8,000

NEXT MONTH FORECAST:
• Expected collections: $52,000
• New clients starting: 2 (+$10,000)
• At-risk churn: 1 (-$4,000)
• Net forecast: $48,000 MRR

CASH FLOW:
• Collected this month: $45,000
• GoCardless fees: -$225 (0.5%)
• Payout to bank: $44,775
• Expected payout date: Feb 5
```

---

## 🎯 Advanced Use Cases

### Use Case 1: Monitor Subscription Changes

```
"Show me all subscription changes in last 30 days"
```

**Claude Code reports**:
- Subscriptions created (new clients)
- Subscriptions updated (price changes)
- Subscriptions cancelled (churn)
- Impact on MRR

### Use Case 2: Churn Prediction

```
"Analyze payment patterns and predict churn risk"
```

**Claude Code analyzes**:
- Clients with recent failed payments
- Clients with decreasing payment amounts
- Clients with payment delays
- Combines with health scores for prediction

**Output**:
```
⚠️ CHURN RISK ANALYSIS

HIGH RISK (Next 30 days):
• ClientX: 75% risk
  - 2 failed payments this quarter
  - Health score: 2.8
  - Action: Immediate intervention needed

MEDIUM RISK (Next 90 days):
• ClientY: 45% risk
  - Requested discount last month
  - Payment delays increasing
  - Action: Proactive check-in

PATTERNS DETECTED:
• Failed payment + health score <3.5 = 80% churn within 60 days
• 2+ consecutive late payments = 60% churn risk
```

### Use Case 3: Revenue Forecasting

```
"Forecast next quarter revenue based on GoCardless data"
```

**Claude Code analyzes**:
- Current MRR
- Growth trends
- At-risk clients
- Pipeline deals
- Seasonality

**Forecast output**:
```
📈 Q2 2024 REVENUE FORECAST

BASELINE (Current MRR × 3):
$135,000 (current: $45,000/mo)

GROWTH FACTORS:
• New clients (pipeline): +$15,000
• Upsells (expected): +$5,000
• Price increases: +$2,000
Total Growth: +$22,000

RISK FACTORS:
• At-risk churn: -$8,000
• Expected natural churn (5%): -$6,750
Total Risk: -$14,750

NET FORECAST:
Q2 Total: $142,250
Confidence: Medium (65%)

ASSUMPTIONS:
• 80% close rate on pipeline
• 50% of at-risk clients saved
• Normal churn rate of 5%
```

---

## 🔐 Security & Compliance

### PCI Compliance
- GoCardless is PCI Level 1 compliant
- You never handle card details
- All payment data encrypted

### GDPR Compliance
- Customer data stored in GoCardless
- You control data access
- Can delete customer data on request

### Best Practices
- Store API keys in .env (never git)
- Use read-only tokens where possible
- Rotate tokens every 6 months
- Monitor API access logs
- Never log sensitive payment details

---

## 🛠️ Troubleshooting

### Issue: Payment Failed But Client Says They Have Funds

**Check**:
```
"Get payment details for [Client Name] failed payment"
```

**Common causes**:
- Bank requires authorization (client needs to approve)
- Card expired
- Bank declined (anti-fraud)
- Mandate needs renewal

**Solution**:
- Ask client to check with their bank
- Update payment method
- Re-send mandate if needed

### Issue: MRR Calculations Don't Match

**Audit**:
```
"Audit MRR calculations and compare with GoCardless"
"Show me all active subscriptions and their amounts"
```

**Fix**:
```
"Recalculate MRR from GoCardless data"
"Sync subscription amounts to client files"
```

---

## 💡 Pro Tips

### 1. Set Up Smart Collection
GoCardless Smart Retry will automatically retry failed payments at optimal times. Enable this in your GoCardless settings.

### 2. Use Instant Bank Pay for Faster Setup
Speed up onboarding with Instant Bank Pay - customers can set up mandates in seconds.

### 3. Monitor Success Rates by Bank
Some banks have higher decline rates. Track this to identify patterns.

### 4. Communicate Proactively
Send reminder emails 3 days before payment to reduce failures.

### 5. Offer Payment Plans
For clients with budget issues, split payments into smaller amounts to reduce failure rates.

---

## 📊 GoCardless Dashboard Widgets

**Create in your dashboard**:
- Today's expected payments
- Failed payment alerts
- MRR trend chart
- Payment success rate
- Average days to collect
- Client payment health distribution

---

**Use Claude Code to**:
- "Set up GoCardless integration"
- "Check payment status for all clients"
- "Alert me on any failed payments"
- "Calculate current MRR from GoCardless"
- "Set up billing for new client [Name]"
- "Generate monthly revenue report"
- "Show me at-risk clients based on payment history"
- "Forecast revenue for next quarter"
- "Update financial health scores from GoCardless data"
