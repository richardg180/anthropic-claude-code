# Calendar Integration

**Purpose**: Automate calendar management for client deliverables, meetings, and reminders using Google Calendar or Outlook.

**Supports**: Google Calendar, Outlook Calendar (Microsoft 365)

---

## 🎯 What Gets Automated

### Auto-Created Calendar Events
- **Client deliverables** - Due dates become calendar events
- **Client meetings** - From client files and schedules
- **Renewal reminders** - 90, 60, 45, 30 days before renewal
- **Weekly reviews** - Monday morning client success routine
- **Monthly business reviews** - Scheduled with each client
- **Quarterly strategic reviews** - Key account planning

### Calendar → Client Files Sync
- Meeting notes logged automatically
- Client interaction tracking
- Time tracking for projects
- Meeting attendance logged

---

## 🔧 Setup Guide

### Option 1: Google Calendar

#### Step 1: Enable Google Calendar API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google Calendar API
4. Create credentials (OAuth 2.0)
5. Download credentials JSON

#### Step 2: Authenticate

```bash
# Store credentials
mkdir -p ~/.config/agency-system
cp credentials.json ~/.config/agency-system/google-calendar-credentials.json

# First time: authenticate
"Help me authenticate with Google Calendar"
```

**Claude Code will**:
1. Open browser for Google login
2. Request calendar permissions
3. Store refresh token securely
4. Test connection

---

### Option 2: Microsoft Outlook Calendar

#### Step 1: Register App in Azure

1. Go to [Azure Portal](https://portal.azure.com)
2. App Registrations → New registration
3. Add redirect URI
4. API permissions → Microsoft Graph → Calendars.ReadWrite
5. Create client secret

#### Step 2: Configure

```bash
# Add to .env
echo "OUTLOOK_CLIENT_ID=your_client_id" >> .env
echo "OUTLOOK_CLIENT_SECRET=your_client_secret" >> .env
echo "OUTLOOK_TENANT_ID=your_tenant_id" >> .env

# Authenticate
"Help me authenticate with Outlook Calendar"
```

---

## 📅 Calendar Automation Workflows

### Workflow 1: Deliverable Due Dates → Calendar Events

**When you add a deliverable**:
```
"Add deliverable: Q1 Campaign Strategy for Acme Corp, due Feb 15, 2024"
```

**Claude Code automatically**:
1. Adds to `client-deliverables-tracker.md`
2. Creates calendar event on Feb 15
3. Sets reminder 2 days before (Feb 13)
4. Includes client name and deliverable details
5. Links back to deliverable tracker

**Calendar Event Created**:
- **Title**: 📦 DUE: Q1 Campaign Strategy - Acme Corp
- **Date**: Feb 15, 2024, 9:00 AM
- **Description**: Deliverable for Acme Corp. [Link to tracker]
- **Reminders**: 2 days before, 1 day before
- **Color**: Orange (deliverables)

---

### Workflow 2: Client Meetings → Automatic Logging

**When meeting completes on calendar**:

**Claude Code automatically** (daily sync):
1. Detects completed client meetings
2. Prompts: "Log notes for meeting with Acme Corp?"
3. You provide bullet points
4. Updates client file with:
   - Meeting date and attendees
   - Summary/notes
   - Action items
   - Next meeting scheduled
5. Optionally syncs to HubSpot

**Example**:
```
Meeting detected: "Monthly Review - Acme Corp" (completed yesterday)

"Log this meeting:
- Reviewed campaign performance: 150% of goal
- Discussed Q2 strategy
- Client requested additional social media support
- Action: Send proposal by Friday
- Next meeting: March 15
"

✅ Logged to clients/acme-corp.md
✅ Updated client health score (engagement improved)
✅ Created calendar event: "Send proposal" on Friday
✅ Synced to HubSpot timeline
```

---

### Workflow 3: Renewal Reminders

**When you update renewal date**:
```
"Update Acme Corp renewal date to June 30, 2024"
```

**Claude Code automatically creates 6 calendar events**:

1. **90 days before (April 1)**:
   - "🔄 Renewal Prep: Acme Corp - Start gathering results"
   - All-day event
   - Link to `renewal-management-system.md`

2. **60 days before (May 1)**:
   - "📞 Renewal Check: Acme Corp - Casual satisfaction check"
   - 30-min time block
   - Talking points in description

3. **45 days before (May 15)**:
   - "📊 Renewal Prep: Acme Corp - Results presentation"
   - 2-hour work block

4. **30 days before (May 30)**:
   - "🤝 Renewal Meeting: Acme Corp - Proposal discussion"
   - 1-hour meeting
   - Include proposal link

5. **15 days before (June 15)**:
   - "📝 Renewal Follow-up: Acme Corp - Contract send"
   - Reminder task

6. **7 days before (June 23)**:
   - "⚠️ Renewal Urgent: Acme Corp - Ensure signed"
   - High priority reminder

---

### Workflow 4: Weekly Client Success Routine

**Automatically scheduled every Monday 9-11 AM**:

**Calendar Event**: "🎯 Weekly Client Success Review"

**Time Blocks**:
- 9:00-9:30 AM: Update health scores
- 9:30-10:00 AM: Review deliverable tracker
- 10:00-10:30 AM: Check renewal pipeline
- 10:30-11:00 AM: Send weekly updates

**Includes checklist in description**:
- [ ] Update client-success-dashboard.md
- [ ] Review client-deliverables-tracker.md
- [ ] Check for at-risk clients
- [ ] Send weekly updates
- [ ] Plan proactive touchpoints

---

### Workflow 5: Monthly Business Reviews

**Auto-scheduled with each client**:
```
"Schedule monthly business reviews for all retainer clients"
```

**Claude Code creates recurring meetings**:
- Acme Corp: First Tuesday of month, 2:00 PM
- Widget Inc: Second Wednesday, 10:00 AM
- TechStart: Third Thursday, 3:00 PM

**Each meeting includes**:
- Link to client file
- Link to `monthly-report-template.md`
- Agenda in description
- Preparation reminder 2 days before
- Follow-up task for next day

---

## 🔄 Sync Schedules

### Real-Time Sync (Webhooks)

If you set up calendar webhooks:
- New meeting created → Updates client file
- Meeting cancelled → Logs cancellation
- Meeting completed → Prompts for notes

### Scheduled Syncs

#### Morning Sync (8 AM daily)
```bash
# Script: integrations/calendar-morning-sync.sh
```

**What it does**:
1. Pull today's meetings
2. Show deliverables due today
3. Show upcoming deadlines this week
4. Morning briefing: "Here's your day"

**Output**:
```
☀️ GOOD MORNING! Here's your day:

📅 TODAY'S MEETINGS:
• 10:00 AM - Monthly Review: Acme Corp (1 hour)
• 2:00 PM - Strategy Call: Widget Inc (30 min)

📦 DELIVERABLES DUE:
• Campaign Report for TechStart (Due 5 PM)
• Social content for Acme Corp (Due EOD)

⏰ UPCOMING THIS WEEK:
• Thu: Renewal prep for ClientX
• Fri: Q1 Strategy presentation (deadline in 2 days)

🎯 CLIENT SUCCESS TASKS:
• Update health scores
• Send weekly updates
• Follow up with at-risk client

Have a great day! 🚀
```

#### Evening Sync (6 PM daily)
```bash
# Script: integrations/calendar-evening-sync.sh
```

**What it does**:
1. Prompts for meeting notes if not logged
2. Updates deliverables completed today
3. Prepares tomorrow's calendar
4. End-of-day summary

---

## 📋 Calendar Event Templates

### Template: Client Meeting
```
Title: [Meeting Type] - [Client Name]
Duration: [30/60/90 minutes]
Description:
  Client: [Link to client file]
  Type: [Discovery/Review/Strategy/Check-in]

  PREP:
  - Review recent performance
  - Check deliverables status
  - Prepare talking points

  AGENDA:
  1. [Topic 1]
  2. [Topic 2]
  3. [Topic 3]

  AFTER MEETING:
  - Log notes to client file
  - Update health score
  - Create follow-up tasks
  - Send meeting summary

Reminders: 1 day before (prep), 30 min before
Color: Blue (client meetings)
```

### Template: Deliverable Due Date
```
Title: 📦 DUE: [Deliverable Name] - [Client]
Duration: All-day event
Description:
  Deliverable: [Name and details]
  Client: [Link to client file]

  QUALITY CHECKLIST:
  - [ ] Meets requirements
  - [ ] Reviewed internally
  - [ ] Formatted correctly
  - [ ] Client approved (if needed)

  DELIVERY:
  - Send to: [Contact]
  - Format: [PDF/PPT/Email/etc]
  - Include: [Additional items]

Reminders: 3 days before, 1 day before, morning of
Color: Orange (deliverables)
```

### Template: Renewal Milestone
```
Title: 🔄 [Stage]: [Client] Renewal
Duration: [Time block as needed]
Description:
  Client: [Link to client file]
  Renewal Date: [Date]
  Current MRR: $[X]
  Health Score: [X.X]

  TASKS FOR THIS STAGE:
  - [ ] [Specific task]
  - [ ] [Specific task]

  NEXT MILESTONE: [Date and stage]

  See: renewal-management-system.md

Reminders: 2 days before
Color: Green (renewals)
```

---

## 🎯 Smart Calendar Management

### Automatic Time Blocking

**For deep work**:
```
"Block time for content creation this week"
```

**Claude Code creates**:
- 2-hour blocks on Tue/Thu mornings
- Marked as "Busy" to prevent meetings
- Labeled "🎯 Focus Time: Content Creation"
- Includes task list in description

**For client work**:
```
"Block time to complete Acme Corp deliverables"
```

**Claude Code creates**:
- Time blocks based on estimated hours
- Scheduled before due date
- Includes work breakdown
- Updates as you complete tasks

---

### Meeting Optimization

**Analyze calendar**:
```
"Analyze my calendar and suggest optimizations"
```

**Claude Code reviews**:
- Meeting frequency per client
- Time spent in meetings vs execution
- Gaps that could be batched
- Conflicts with deliverable deadlines

**Suggestions**:
- "Batch all client check-ins on Tuesdays"
- "You have 3 hours of meetings on Wed when Campaign X is due"
- "No focus time blocks this week - add some?"

---

## 🔔 Smart Reminders

### Context-Aware Reminders

**Deliverable reminders include**:
- Current progress status
- What's left to complete
- Who needs to review
- Client contact info
- Quick actions

**Meeting reminders include**:
- Client health score
- Recent interactions
- Open action items
- Talking points
- Links to relevant docs

---

## 📊 Calendar Analytics

```
"Analyze my calendar for last month"
```

**Claude Code generates**:

### Time Breakdown
- Client meetings: 20 hours (35%)
- Internal work: 15 hours (26%)
- Deep work: 10 hours (17%)
- Admin: 8 hours (14%)
- Strategic planning: 5 hours (8%)

### By Client
- Acme Corp: 6 hours
- Widget Inc: 4 hours
- TechStart: 5 hours

### Meeting Stats
- Total meetings: 32
- Average meeting length: 42 minutes
- Meetings with notes logged: 28 (88%)
- On-time meeting rate: 94%

### Recommendations
- "Consider batching Widget Inc check-ins bi-weekly"
- "Acme Corp consuming 30% of time - ensure profitability"
- "Only 17% deep work time - aim for 25%"

---

## 🚨 Calendar Alerts

### Set Up Alerts For

**Deliverable at Risk**:
```
IF deliverable due in 3 days AND progress < 70%
THEN create high-priority calendar alert
```

**Client Not Met Recently**:
```
IF last client meeting > 30 days ago AND health score > 3.5
THEN create reminder: "Schedule check-in with [Client]"
```

**Renewal Approaching Without Prep**:
```
IF renewal in 90 days AND no prep calendar events
THEN create urgent alert: "Start renewal prep for [Client]"
```

---

## 💡 Pro Tips

### 1. Color Code Everything
- 🔵 Blue: Client meetings
- 🟠 Orange: Deliverable due dates
- 🟢 Green: Renewals and growth
- 🔴 Red: Urgent/at-risk items
- 🟣 Purple: Internal/admin

### 2. Use Calendar Descriptions as Mini-Docs
Include everything needed in event description:
- Links to files
- Checklists
- Context
- Next steps

### 3. Set Realistic Time Blocks
Account for:
- Prep time before meetings
- Follow-up time after meetings
- Buffer between meetings
- Email and Slack time

### 4. Batch Similar Activities
- All client calls on specific days
- All content creation in morning blocks
- All admin on Friday afternoons

### 5. Weekly Calendar Review
```
"Review my calendar for next week and optimize"
```

Claude Code checks for:
- Overbooked days
- Missing prep time
- Conflicting priorities
- No deep work blocks

---

## 🔐 Privacy & Permissions

### Google Calendar
- Only reads/writes events you create
- Won't access personal calendar (unless specified)
- You control sharing permissions

### Outlook Calendar
- Scoped to work calendar only
- Respects your privacy settings
- Syncs only agency-related events

---

## 🛠️ Troubleshooting

### Issue: Events Not Syncing
```
"Check calendar sync status"
"Re-authenticate calendar connection"
```

### Issue: Duplicate Events
```
"Find and remove duplicate calendar events"
"Clean up calendar for [date range]"
```

### Issue: Wrong Timezone
```
"Fix timezone for all calendar events"
```

---

**Use Claude Code to**:
- "Set up calendar integration"
- "Create calendar events for all deliverables this month"
- "Schedule monthly business reviews with all clients"
- "Set up renewal reminders for [Client Name]"
- "Show me today's calendar with client context"
- "Analyze my calendar and optimize my time"
- "Log yesterday's meetings to client files"
- "Block focus time for [project] this week"
