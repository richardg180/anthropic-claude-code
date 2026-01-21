# HubSpot CRM Integration

**Purpose**: Sync your client data, health scores, and activities between markdown files and HubSpot CRM.

---

## 🎯 What Gets Synced

### From Markdown → HubSpot
- Client health scores (custom property)
- Client profile information
- Meeting notes and interactions
- Deliverables and milestones
- Renewal dates and pipeline
- Referrals and upsell opportunities
- Client satisfaction scores (NPS)

### From HubSpot → Markdown
- Contact information updates
- Deal stage changes
- Recent activities and notes
- Task completions
- Email communications
- Meeting scheduled/completed

---

## 🔧 Setup Guide

### Step 1: Get Your HubSpot API Key

1. Log into HubSpot
2. Go to Settings (⚙️) → Integrations → API Key
3. Click "Create API Key" or "Show" if one exists
4. Copy the key

### Step 2: Store API Key Securely

```bash
# Add to .env file (create if doesn't exist)
echo "HUBSPOT_API_KEY=your_api_key_here" >> .env

# Make sure .env is in .gitignore
echo ".env" >> .gitignore
```

### Step 3: Set Up Custom Properties in HubSpot

Go to Settings → Properties → Create custom properties for Contacts/Companies:

**Required Custom Properties**:
- `client_health_score` (Number, 0-5)
- `client_health_status` (Single select: Thriving/Healthy/At-Risk/Critical)
- `renewal_date` (Date)
- `renewal_confidence` (Single select: High/Medium/Low)
- `nps_score` (Number, 0-10)
- `client_tier` (Single select: Enterprise/Mid-Market/Small Business)
- `last_business_review` (Date)
- `next_business_review` (Date)
- `deliverables_on_time_rate` (Number, percentage)
- `referrals_given` (Number)
- `mrr` (Currency)

### Step 4: Map Your Clients

Create a mapping file to connect markdown files to HubSpot records:

```bash
# Tell Claude to help:
"Create a HubSpot mapping for all my active clients"
```

This creates `hubspot-mapping.json`:
```json
{
  "clients": [
    {
      "markdown_file": "clients/acme-corp.md",
      "hubspot_contact_id": "123456",
      "hubspot_company_id": "789012"
    }
  ]
}
```

---

## 🔄 Sync Workflows

### Manual Sync Commands

#### Sync Single Client to HubSpot
```
"Sync [Client Name] data to HubSpot"
```

**What it does**:
1. Read client file
2. Calculate health score
3. Update HubSpot contact/company properties
4. Log sync activity

#### Sync All Clients to HubSpot
```
"Sync all client health scores to HubSpot"
```

**What it does**:
1. Read all client files
2. Calculate all health scores
3. Batch update HubSpot properties
4. Generate sync report

#### Pull HubSpot Updates
```
"Pull recent HubSpot activities for [Client Name]"
"Update client files from HubSpot data"
```

**What it does**:
1. Fetch recent activities from HubSpot
2. Update client markdown files
3. Flag any important changes

---

### Automated Sync Schedule

#### Daily Sync (9 AM every day)

**Script**: `integrations/hubspot-daily-sync.sh`

```bash
#!/bin/bash
# Daily HubSpot sync

echo "Starting daily HubSpot sync..."

# 1. Pull overnight HubSpot activities
echo "Pulling HubSpot activities..."
# API call to get activities since yesterday

# 2. Update client health scores
echo "Updating health scores..."
# Calculate from markdown files

# 3. Push health scores to HubSpot
echo "Syncing to HubSpot..."
# Batch update API call

# 4. Check for any deal stage changes
echo "Checking deals..."
# Pull renewal pipeline updates

echo "Daily sync complete!"
```

**Set up with cron**:
```bash
# Run daily at 9 AM
0 9 * * * /path/to/agency-system/integrations/hubspot-daily-sync.sh
```

**Or ask Claude Code**:
```
"Set up daily HubSpot sync to run at 9 AM"
```

---

## 📊 HubSpot Workflows to Create

### Workflow 1: Health Score Alert (in HubSpot)

**Trigger**: Client Health Score drops below 3.5

**Actions**:
1. Send email alert to account manager
2. Create task: "Client at risk - schedule call"
3. Add to "At-Risk Clients" list
4. Notify via Slack (if connected)

### Workflow 2: Renewal Reminder

**Trigger**: Renewal date is 90 days away

**Actions**:
1. Create task: "Start renewal prep"
2. Send notification to account manager
3. Update deal stage to "Renewal - Prep"

### Workflow 3: Payment Issue Alert

**Trigger**: Financial health score drops to 2 or below

**Actions**:
1. Create urgent task for billing follow-up
2. Email alert to account manager
3. Add note to contact timeline

---

## 🎯 Specific Use Cases

### Use Case 1: After Client Meeting

**You do**:
```
"Log this client meeting to HubSpot:

Client: Acme Corp
Date: 2024-01-15
Type: Monthly Business Review
Attendees: John (CMO), Sarah (CEO)
Summary: Reviewed Q4 results, discussed Q1 strategy
Health Score: 4.5 (was 4.2 - improved)
Next Steps:
- Send campaign proposal by Friday
- Schedule kickoff for new initiative
Action Items:
- Follow up on budget approval
- Send case study examples
"
```

**Claude Code does**:
1. Updates `clients/acme-corp.md`
2. Creates HubSpot meeting activity
3. Updates health score property
4. Creates HubSpot tasks for action items
5. Logs notes to timeline

### Use Case 2: Weekly Health Score Update

**You do**:
```
"Update all client health scores and sync to HubSpot"
```

**Claude Code does**:
1. Calculates health scores for all clients
2. Updates markdown files
3. Batch updates HubSpot custom properties
4. Flags any clients that moved to "At-Risk"
5. Creates tasks for at-risk clients
6. Generates summary report

### Use Case 3: Renewal Pipeline Sync

**You do**:
```
"Sync renewal pipeline to HubSpot deals"
```

**Claude Code does**:
1. Reads `renewal-management-system.md`
2. For each upcoming renewal:
   - Creates or updates HubSpot deal
   - Sets deal stage based on timeline
   - Sets amount from client MRR
   - Adds renewal date
   - Links to contact/company
3. Updates deal probabilities based on health scores

---

## 📋 HubSpot API Examples

### Update Client Health Score

```bash
# Example API call Claude Code will make

curl --request PATCH \
  --url "https://api.hubapi.com/crm/v3/objects/contacts/CONTACT_ID" \
  --header "authorization: Bearer $HUBSPOT_API_KEY" \
  --header "content-type: application/json" \
  --data '{
    "properties": {
      "client_health_score": "4.5",
      "client_health_status": "Thriving",
      "last_health_update": "2024-01-15"
    }
  }'
```

### Create Timeline Activity

```bash
curl --request POST \
  --url "https://api.hubapi.com/crm/v3/objects/notes" \
  --header "authorization: Bearer $HUBSPOT_API_KEY" \
  --header "content-type: application/json" \
  --data '{
    "properties": {
      "hs_timestamp": "2024-01-15T10:00:00Z",
      "hs_note_body": "Monthly business review completed. Health score: 4.5",
      "hubspot_owner_id": "12345"
    },
    "associations": [
      {
        "to": {"id": "CONTACT_ID"},
        "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 202}]
      }
    ]
  }'
```

### Batch Update Multiple Clients

```bash
curl --request POST \
  --url "https://api.hubapi.com/crm/v3/objects/contacts/batch/update" \
  --header "authorization: Bearer $HUBSPOT_API_KEY" \
  --header "content-type: application/json" \
  --data '{
    "inputs": [
      {
        "id": "CONTACT_ID_1",
        "properties": {"client_health_score": "4.5"}
      },
      {
        "id": "CONTACT_ID_2",
        "properties": {"client_health_score": "3.2"}
      }
    ]
  }'
```

---

## 🔍 Monitoring & Validation

### Check Sync Status

```
"Show me HubSpot sync status"
```

**Claude Code checks**:
- Last sync time
- Any sync errors
- Clients with mismatched data
- API rate limit usage

### Validate Data Consistency

```
"Validate that all client health scores match between markdown and HubSpot"
```

**Claude Code does**:
1. Reads all client health scores from markdown
2. Pulls all health scores from HubSpot
3. Compares them
4. Reports any mismatches
5. Offers to fix discrepancies

---

## 🎨 HubSpot Dashboard Setup

### Create Custom Dashboard: "Client Success"

**Widgets to Add**:
1. **Average Health Score** - Custom report from client_health_score
2. **Health Score Distribution** - Pie chart (Thriving/Healthy/At-Risk/Critical)
3. **Clients At-Risk** - List of contacts where client_health_status = "At-Risk"
4. **Renewal Pipeline** - Deals in renewal stages
5. **NPS Over Time** - Trend of nps_score
6. **On-Time Delivery Rate** - Average deliverables_on_time_rate

### Create Lists

**"Thriving Clients"** - Ready for referral asks
- Filter: client_health_status = "Thriving"
- Use for: Referral campaigns, case study requests

**"At-Risk Clients"** - Need immediate attention
- Filter: client_health_status = "At-Risk" OR "Critical"
- Use for: Intervention workflows, alerts

**"Renewals Next 90 Days"**
- Filter: renewal_date is within next 90 days
- Use for: Renewal prep tasks

---

## 🚨 Troubleshooting

### Issue: Sync Failing

```
"Check HubSpot API connection"
"Test HubSpot sync with [Client Name]"
```

**Common causes**:
- API key expired or invalid
- Rate limit exceeded (100 requests per 10 seconds)
- Custom properties not created
- Invalid contact/company IDs in mapping

### Issue: Data Mismatch

```
"Compare [Client Name] data: markdown vs HubSpot"
"Re-sync [Client Name] from markdown to HubSpot"
```

### Issue: Missing Activities

```
"Pull last 30 days of HubSpot activities for [Client Name]"
"Sync recent HubSpot activities to client files"
```

---

## 💡 Pro Tips

### 1. Use HubSpot as Your Communication Hub
- Log all emails from HubSpot
- Sync meeting notes both ways
- Let HubSpot handle email sequences
- Keep markdown as your strategy/analysis layer

### 2. Automate Task Creation
When health score drops, auto-create tasks in HubSpot:
- "Schedule check-in call with [Client]"
- "Review [Client] account and create recovery plan"

### 3. Build HubSpot Reports
Create reports that use your custom health score properties to track trends over time.

### 4. Set Up Notifications
Configure HubSpot notifications for:
- Health score drops
- Renewal dates approaching
- Payment issues (from GoCardless sync)

### 5. Use HubSpot Mobile App
With data synced to HubSpot, you can check client health on-the-go.

---

## 📈 Success Metrics

Track these to measure integration effectiveness:

- **Sync Success Rate**: Target 99%+
- **Data Freshness**: Last sync time (target: <24 hours)
- **Time Saved**: Hours per week vs manual entry
- **Data Accuracy**: % matching between systems
- **Insight Generation**: Decisions made from HubSpot reports

---

## 🔐 Security Best Practices

### DO ✅
- Store API keys in .env files
- Add .env to .gitignore
- Use read-only keys where possible
- Rotate keys quarterly
- Monitor API usage
- Log all sync activities
- Validate data before syncing

### DON'T ❌
- Commit API keys to git
- Share API keys
- Use production keys for testing
- Ignore failed syncs
- Skip validation
- Over-sync (respect rate limits)

---

**Use Claude Code to**:
- "Set up HubSpot integration for the first time"
- "Sync [Client Name] to HubSpot"
- "Pull HubSpot activities and update client files"
- "Create HubSpot deal for [Client Name] renewal"
- "Fix HubSpot sync error"
- "Generate HubSpot sync report for last week"
