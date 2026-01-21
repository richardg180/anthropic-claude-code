# System Integrations

**Purpose**: Connect your agency system with HubSpot (CRM), Calendar, and GoCardless (payments) for seamless workflow automation.

---

## 🎯 Integration Philosophy

**Your markdown files are the source of truth.** Integrations sync data both ways so you can:
- Update client health scores in markdown, sync to HubSpot
- Track payments in GoCardless, update financial health automatically
- Schedule meetings from calendar, log them in client files
- Update deliverables, create calendar events automatically

---

## 🔗 Available Integrations

### 1. HubSpot CRM Integration
**What it does**:
- Sync client profiles between markdown and HubSpot
- Update client health scores as HubSpot properties
- Log activities and notes to timeline
- Track deals and renewal pipeline
- Sync contact information

### 2. Calendar Integration (Google Calendar / Outlook)
**What it does**:
- Auto-create calendar events for deliverables
- Sync client meetings to client files
- Set renewal reminders 90 days out
- Weekly review and standup reminders
- Log meeting notes back to client profiles

### 3. GoCardless Integration
**What it does**:
- Track payment status automatically
- Update client financial health scores
- Alert on late payments
- Calculate MRR and ARR automatically
- Monitor subscription status

---

## 📋 Quick Setup Guide

### Prerequisites
1. API keys for your tools:
   - HubSpot: Settings → Integrations → API Key
   - Google Calendar: Google Cloud Console → Enable Calendar API
   - GoCardless: Dashboard → Developers → API Keys

2. Store API keys securely:
```bash
# Create .env file (never commit this!)
echo "HUBSPOT_API_KEY=your_key_here" > .env
echo "GOOGLE_CALENDAR_KEY=your_key_here" >> .env
echo "GOCARDLESS_API_KEY=your_key_here" >> .env
echo ".env" >> .gitignore
```

---

## 🔧 Integration Workflows

See detailed setup guides:
- [`hubspot-integration.md`](hubspot-integration.md) - CRM sync workflows
- [`calendar-integration.md`](calendar-integration.md) - Calendar automation
- [`gocardless-integration.md`](gocardless-integration.md) - Payment tracking
- [`automation-workflows.md`](automation-workflows.md) - Automated sync jobs

---

## 🤖 Using Claude Code for Integrations

### HubSpot Commands
```
"Sync client health scores to HubSpot"
"Update [Client Name] profile in HubSpot with latest data"
"Pull recent HubSpot activities for [Client Name]"
"Create a deal in HubSpot for [Client Name] renewal"
"Log this meeting to [Client Name]'s HubSpot timeline"
```

### Calendar Commands
```
"Create calendar events for this week's deliverables"
"Add renewal reminder for [Client Name] 90 days before [date]"
"Sync this week's client meetings to their profiles"
"Block time for weekly client success review on Mondays"
"Schedule monthly business review with [Client Name]"
```

### GoCardless Commands
```
"Check payment status for all clients"
"Update financial health scores based on GoCardless data"
"Alert me on any late payments"
"Calculate total MRR from GoCardless subscriptions"
"Show clients with failed payment attempts"
```

### Combined Workflows
```
"Do my full Monday morning sync: update health scores, check payments, sync calendar"
"When client pays late in GoCardless, update their health score and create a follow-up task"
"After client meeting, log notes to HubSpot and update health score"
"Create end-of-month client success report using data from all systems"
```

---

## 🔄 Automated Sync Jobs

### Daily Sync (Runs every morning)
```bash
# Run: ./integrations/daily-sync.sh
```
- Pull payment status from GoCardless → Update financial health
- Sync today's calendar events → Update client files
- Check for overdue deliverables → Create calendar reminders
- Update HubSpot with any health score changes

### Weekly Sync (Runs every Monday)
```bash
# Run: ./integrations/weekly-sync.sh
```
- Full client health score calculation
- Sync all health scores to HubSpot
- Update renewal pipeline in HubSpot deals
- Generate weekly review data
- Create calendar events for upcoming deliverables

### Monthly Sync (Runs first of month)
```bash
# Run: ./integrations/monthly-sync.sh
```
- Calculate MRR/ARR from GoCardless
- Generate monthly reports
- Update client lifetime value in HubSpot
- Sync referral data
- Archive completed projects

---

## 📊 Integration Dashboard

Track integration health in `integration-status.md`:
- Last sync time for each system
- Any sync errors or issues
- Data consistency checks
- API rate limit status

---

## 🚨 Webhook Setup (Real-Time Updates)

### GoCardless Webhooks
Receive instant notifications for:
- Payment succeeded
- Payment failed
- Subscription cancelled
- Customer updated

**Action**: Update client financial health score immediately

### HubSpot Webhooks
Receive notifications for:
- Deal stage changed
- Contact updated
- Task completed
- Note added

**Action**: Update relevant client files

### Calendar Webhooks
Receive notifications for:
- Meeting scheduled
- Meeting cancelled
- Meeting completed

**Action**: Update client interaction logs

---

## 🛠️ Troubleshooting

### Sync Issues
```
"Check integration status for all systems"
"Re-sync [Client Name] data from HubSpot"
"Fix financial health scores from GoCardless data"
"Validate calendar sync for this week"
```

### Data Conflicts
```
"Compare [Client Name] data between markdown and HubSpot"
"Show me clients where health score doesn't match HubSpot"
"Audit all payment statuses against GoCardless"
```

---

## 💡 Integration Best Practices

### DO ✅
- Keep markdown files as source of truth
- Sync regularly (at least daily)
- Validate data after each sync
- Set up webhook alerts for critical events
- Monitor API rate limits
- Log all sync activities
- Test integrations in non-production first

### DON'T ❌
- Manually edit same data in multiple places
- Ignore sync errors
- Commit API keys to git
- Over-sync (respect rate limits)
- Skip validation after syncs
- Assume syncs worked without checking

---

## 🎯 Next Steps

1. **Choose your integrations**: Start with the one you use most
2. **Set up API keys**: Follow security best practices
3. **Run initial sync**: Use Claude Code to sync existing data
4. **Set up automation**: Schedule daily/weekly syncs
5. **Configure webhooks**: Get real-time updates
6. **Monitor and refine**: Check integration dashboard regularly

---

**Use Claude Code to**:
- "Help me set up HubSpot integration"
- "Create sync scripts for all my integrations"
- "Run a test sync with HubSpot"
- "Show me integration status"
- "Fix sync errors from last run"
