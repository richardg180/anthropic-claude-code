# Automation Workflows

**Purpose**: Pre-built automation sequences that tie together HubSpot, Calendar, GoCardless, and your markdown system.

---

## 🤖 Complete Automation Workflows

### 🌅 Workflow 1: Perfect Morning Routine

**Trigger**: Every weekday at 8:00 AM

**What Happens Automatically**:

1. **GoCardless Check** (2 min)
   - Pull payment events from last 24 hours
   - Update financial health scores
   - Alert on any failed payments
   - Calculate updated MRR

2. **Calendar Sync** (1 min)
   - Pull today's meetings and context
   - Show deliverables due today
   - Display upcoming deadlines this week
   - Prep meeting briefs

3. **HubSpot Sync** (2 min)
   - Pull overnight activities
   - Update client files with new interactions
   - Check for any deal stage changes
   - Sync health scores

4. **Morning Briefing** (1 min)
   - Generate daily summary
   - Flag urgent items
   - Create prioritized task list
   - Send to you via Slack/Email

**Total Time**: 6 minutes automated

**Your Morning Email**:
```
☀️ GOOD MORNING! Here's your Tuesday, January 16

💰 PAYMENTS (Last 24h):
✅ 4 successful ($18,000)
❌ 1 failed: ClientY ($4,000) - Needs immediate attention
⏳ 2 pending today ($5,500)

📅 TODAY'S SCHEDULE:
• 10:00 AM - Monthly Review: Acme Corp
  Health: 4.5 (Thriving) | Recent: Great campaign results
  Prep: Show Q4 ROI, discuss Q1 strategy

• 2:00 PM - Check-in: Widget Inc
  Health: 3.2 (At-Risk) | Recent: Concerns about cost
  Prep: Address concerns, show value, recovery plan

📦 DELIVERABLES DUE:
• Campaign Report for TechStart (5 PM) - 80% complete
• Social content for ClientX (EOD) - Ready for review

🚨 URGENT ACTIONS:
1. Call ClientY about failed payment (Top Priority)
2. Send weekly updates to all clients (Draft ready)
3. Start renewal prep for ClientZ (90 days out)

🎯 WEEKLY GOALS PROGRESS:
• Client health updates: 7/12 complete
• Weekly communications: 8/12 sent
• Referral asks: 1/3 complete

Have a great day! 🚀
```

---

### 🔄 Workflow 2: Failed Payment Response

**Trigger**: Payment fails in GoCardless (real-time webhook)

**What Happens Automatically** (within 5 minutes):

1. **Update Client File** (30 sec)
   - Log failed payment with details
   - Update payment history
   - Add note about failure reason

2. **Recalculate Health Score** (30 sec)
   - Financial health drops to 2
   - Overall health recalculated
   - Client moved to "At-Risk" if needed

3. **Sync to HubSpot** (1 min)
   - Update financial health property
   - Create high-priority task
   - Add timeline note
   - Add to "Payment Issues" list

4. **Create Calendar Event** (30 sec)
   - Today: "URGENT: Contact [Client] about failed payment"
   - High priority reminder
   - Include client contact info

5. **Draft Communication** (1 min)
   - Generate empathetic email
   - Prepare Slack message
   - Include action options

6. **Send Alert** (30 sec)
   - Slack notification with all details
   - Email to you and billing team
   - Include draft communication

7. **Schedule Follow-Up** (30 sec)
   - If not resolved in 24h, escalate
   - Calendar reminder for 3 days (retry date)
   - Task to check resolution

**Total Time**: 5 minutes automated

**What You Do**:
- Call client (priority)
- Send email (draft ready)
- Offer payment plan if needed
- Log conversation

---

### 📊 Workflow 3: Weekly Client Success Routine

**Trigger**: Every Monday at 9:00 AM

**What Happens Automatically**:

1. **Pull All Data** (5 min)
   - Last week's GoCardless payments
   - Last week's calendar activities
   - Last week's HubSpot interactions
   - Last week's deliverable completions

2. **Update All Health Scores** (3 min)
   - Recalculate 5 categories for each client
   - Flag any that dropped significantly
   - Identify thriving clients (4.5+)
   - Identify at-risk clients (<3.5)

3. **Generate Weekly Updates** (5 min)
   - Draft personalized email for each client
   - Include: wins, metrics, insights, next steps
   - Add proactive recommendations
   - Ready for your review

4. **Update Dashboards** (2 min)
   - Refresh client-success-dashboard.md
   - Update active-projects.md
   - Update renewal-management-system.md
   - Update deliverables-tracker.md

5. **Sync to HubSpot** (3 min)
   - Push all health score updates
   - Update custom properties
   - Create tasks for at-risk clients
   - Log weekly review activity

6. **Create Action Plan** (2 min)
   - List clients needing attention
   - Flag urgent deliverables
   - Identify referral opportunities
   - Highlight renewal prep needed

7. **Send You Briefing** (1 min)
   - Weekly summary report
   - Action items prioritized
   - Draft emails ready to send
   - Calendar for the week

**Total Time**: 21 minutes automated

**You Review & Act** (30-60 min):
- Review draft emails, personalize
- Send weekly updates
- Call at-risk clients
- Execute action plan

---

### 🎉 Workflow 4: Client Meeting Completed

**Trigger**: Calendar meeting marked complete

**What Happens Automatically**:

1. **Prompt for Notes** (immediate)
   - "Log notes for [Client] meeting?"
   - Voice or text input
   - Quick bullet points accepted

2. **Process Notes** (1 min)
   - Structure notes into format
   - Extract action items
   - Identify health score changes
   - Note next meeting date

3. **Update Client File** (30 sec)
   - Add to meeting history
   - Update last contact date
   - Log attendees and topics
   - Note any concerns raised

4. **Update Health Score** (30 sec)
   - Engagement category updated
   - Sentiment category updated
   - Overall score recalculated

5. **Create Action Items** (1 min)
   - Calendar events for follow-ups
   - Deliverables from commitments
   - HubSpot tasks created
   - Deadlines set

6. **Sync to HubSpot** (1 min)
   - Create meeting activity
   - Add notes to timeline
   - Update health score property
   - Link tasks to contact

7. **Schedule Next Meeting** (30 sec)
   - If recurring, confirm next date
   - If needed, suggest dates
   - Create calendar invite

8. **Send Follow-Up** (1 min)
   - Draft thank you email
   - Include meeting summary
   - Confirm action items
   - Ready for your review

**Total Time**: 5 minutes automated

**Example**:
```
Meeting Complete: Monthly Review - Acme Corp

MEETING LOGGED ✅
• Date: Jan 15, 2024
• Duration: 60 minutes
• Attendees: John (CMO), Sarah (CEO), You

NOTES ADDED ✅
• Reviewed Q4: 150% of goals
• Discussed Q1 strategy
• Requested additional social support
• Very happy with results

HEALTH SCORE UPDATED ✅
• Engagement: 4 → 5 (attended, engaged)
• Satisfaction: 4 → 4.5 (positive feedback)
• Overall: 4.2 → 4.5 (Thriving)

ACTION ITEMS CREATED ✅
• ☐ Send social media proposal by Friday
• ☐ Schedule Q1 kickoff meeting
• ☐ Follow up on budget approval

SYNCED TO HUBSPOT ✅
• Meeting logged to timeline
• Health score updated
• 3 tasks created

NEXT MEETING ✅
• Feb 15, 2024 (confirmed)
• Calendar invite sent

FOLLOW-UP EMAIL DRAFTED ✅
[View Draft]

Ready to review and send!
```

---

### 🔄 Workflow 5: Renewal 90-Day Countdown

**Trigger**: Client's renewal date is 90 days away

**What Happens Automatically**:

1. **Create Renewal Timeline** (2 min)
   - 6 calendar events at 90, 60, 45, 30, 15, 7 days
   - Each with specific tasks and prep
   - All linked to renewal playbook

2. **Gather Results Data** (3 min)
   - Pull all performance since contract start
   - Calculate ROI
   - Compile wins and achievements
   - Generate results summary

3. **Start Renewal File** (2 min)
   - Create renewal prep document
   - Link to client file
   - Include business case outline
   - Set up tracking checklist

4. **Update HubSpot Deal** (1 min)
   - Create or update renewal deal
   - Set close date to renewal date
   - Amount from current MRR
   - Stage: "Renewal - Prep"

5. **Alert Account Manager** (30 sec)
   - Email with renewal prep guide
   - Link to renewal timeline
   - Results summary attached
   - Next steps outlined

**Then at each milestone, automatic reminders with specific tasks.**

**Total Time**: 8 minutes automated per renewal

---

### 💝 Workflow 6: Client Hits "Thriving" Status

**Trigger**: Client health score reaches 4.5+

**What Happens Automatically**:

1. **Celebration Log** (30 sec)
   - Add to "Thriving Clients" list
   - Log achievement date
   - Calculate how long to get there

2. **Referral Prep** (2 min)
   - Generate referral request draft
   - Identify best time to ask
   - Create referral tracking entry
   - Schedule reminder to ask

3. **Testimonial Request** (1 min)
   - Draft testimonial request email
   - Prepare case study outline
   - Create task to request

4. **Upsell Analysis** (2 min)
   - Identify services they're not using
   - Calculate potential expansion value
   - Draft upsell conversation starters
   - Flag opportunity in CRM

5. **Thank You Initiative** (1 min)
   - Suggest thank you gift
   - Draft appreciation email
   - Create task to execute

6. **Update Dashboards** (1 min)
   - Move to "Thriving" section
   - Update success metrics
   - Celebrate internally

**Total Time**: 7 minutes automated

**You Follow Through**:
- Send appreciation message
- Ask for referral (when timing right)
- Request testimonial
- Explore upsell

---

### 🚨 Workflow 7: Client Becomes At-Risk

**Trigger**: Client health score drops below 3.5

**What Happens Automatically**:

1. **Immediate Alert** (30 sec)
   - High-priority notification
   - Shows score drop details
   - Flags specific problem areas

2. **Create Recovery Plan** (3 min)
   - Analyze what's wrong
   - Generate action plan template
   - Identify quick wins
   - Set recovery goals

3. **Schedule Intervention** (1 min)
   - Calendar: "Urgent - Recovery call with [Client]"
   - Within 48 hours
   - Prep notes included

4. **Update All Systems** (2 min)
   - HubSpot: Add to "At-Risk" list
   - HubSpot: Create urgent task
   - Client file: Add at-risk flag
   - Dashboard: Move to at-risk section

5. **Escalation Path** (1 min)
   - Notify senior leadership if critical
   - Create daily check-in reminders
   - Set 30-day recovery timeline

6. **Prepare Recovery Resources** (2 min)
   - Draft recovery conversation script
   - Compile recent issues
   - Generate win-back offers
   - Create monitoring checklist

**Total Time**: 9 minutes automated

**You Act Immediately**:
- Call client within 24h
- Use recovery plan
- Document everything
- Daily monitoring

---

## ⚙️ Setting Up Automation

### Option 1: Claude Code Scheduled Tasks

```
"Set up all automation workflows for me"
```

Claude Code will:
1. Create bash scripts for each workflow
2. Set up cron jobs for schedules
3. Configure webhook listeners
4. Test all integrations
5. Provide monitoring dashboard

### Option 2: Manual Setup

1. **Install dependencies**:
```bash
cd agency-system/integrations
chmod +x *.sh
```

2. **Set up cron jobs**:
```bash
# Edit crontab
crontab -e

# Add these lines:
0 8 * * 1-5 ~/agency-system/integrations/morning-routine.sh
0 9 * * 1 ~/agency-system/integrations/weekly-sync.sh
0 0 * * * ~/agency-system/integrations/daily-sync.sh
```

3. **Configure webhooks**: Set up in each service's dashboard

---

## 📊 Monitoring Automations

### Automation Dashboard

```
"Show me automation status"
```

**Claude Code displays**:
```
🤖 AUTOMATION STATUS

✅ WORKING PERFECTLY (5):
• Morning Routine: Last run 6 min ago, success
• Calendar Sync: Running continuously, no errors
• Payment Monitoring: Last check 2 min ago, 1 alert sent
• HubSpot Sync: Last run 1 hour ago, 12 updates
• Health Score Auto-calc: Running daily, up to date

⚠️ NEEDS ATTENTION (1):
• Weekly Client Updates: Failed yesterday (API timeout)
  Action: Retry now? [Yes] [No]

🔕 DISABLED (0):
None

RECENT ACTIVITY (Last 24h):
• 124 automated actions completed
• 3 alerts sent
• 18 client files updated
• 45 calendar events managed
• 0 errors
• 99.2% success rate

UPCOMING:
• Weekly sync in 4 hours
• Monthly report generation tomorrow
• Renewal prep for ClientX in 3 days
```

---

## 💡 Customizing Workflows

### Create Your Own Workflow

```
"Create a custom workflow:
When client hasn't been contacted in 30 days
Then send me reminder to schedule check-in"
```

Claude Code will:
1. Create the workflow logic
2. Set up monitoring
3. Configure alerts
4. Test the workflow

---

## 🚨 Troubleshooting Automations

### Workflow Failed
```
"Why did morning routine fail today?"
"Re-run morning routine now"
"Check logs for failed automation"
```

### Webhook Not Working
```
"Test GoCardless webhook"
"Re-register all webhooks"
"Check webhook delivery logs"
```

### Data Not Syncing
```
"Force sync all client data"
"Validate data consistency across systems"
"Compare markdown vs HubSpot for all clients"
```

---

## 🎯 Automation Best Practices

### DO ✅
- Start with morning routine only, add more gradually
- Monitor automation logs daily first week
- Have fallback for critical workflows
- Test thoroughly before going live
- Keep human review for important decisions
- Document custom workflows

### DON'T ❌
- Automate everything at once
- Ignore failed automations
- Skip testing after changes
- Over-complicate workflows
- Remove all human touch
- Forget to monitor

---

**Use Claude Code to**:
- "Set up all automation workflows"
- "Run morning routine manually now"
- "Show me automation status and logs"
- "Create custom workflow for [specific need]"
- "Troubleshoot failed workflow"
- "Disable automation temporarily"
- "Test all integrations"
