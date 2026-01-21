# Team Collaboration & Access Control

**Purpose**: Enable your team to use the agency system while maintaining security and appropriate access levels.

---

## 🎯 Team Access Philosophy

**Your system, your team's power**: Give everyone what they need to succeed, protect what they don't need to see.

**Role-Based Access**: Different team members see and edit different parts based on their role.

---

## 👥 Team Roles & Access Levels

### 🔴 Owner/Founder (You) - Full Access
**Access**: Everything
- All client files and financials
- All strategic documents
- Integration credentials
- Financial data (MRR, contracts)
- Client health scores
- Team performance data

**Responsibilities**:
- Strategic planning
- Client relationships (key accounts)
- Renewals and contracts
- Team management
- System administration

---

### 🟠 Account Manager - Client Focus
**Access**:
- ✅ Their assigned client files
- ✅ Client deliverables tracker
- ✅ Project files for their clients
- ✅ Campaign performance data
- ✅ Meeting templates
- ✅ Communication templates
- ✅ Content calendar
- ❌ Financial details (contracts, pricing)
- ❌ Other team's clients
- ❌ Integration credentials
- ❌ Strategic planning docs

**Responsibilities**:
- Day-to-day client communication
- Deliverable tracking
- Health score monitoring
- Weekly client updates
- Meeting coordination

**Their View**:
```
agency-system/
├── clients/
│   ├── acme-corp.md ✅ (their client)
│   ├── widget-inc.md ✅ (their client)
│   ├── techstart.md ❌ (not their client)
├── projects/ ✅ (their projects only)
├── campaigns/ ✅ (their campaigns only)
├── content/ ✅ (shared)
├── meetings/ ✅ (templates only)
└── processes/ ✅ (read-only)
```

---

### 🟡 Project Manager - Execution Focus
**Access**:
- ✅ All project files
- ✅ Deliverables tracker (all clients)
- ✅ Content calendar
- ✅ Campaign files
- ✅ Resource planning
- ✅ Team capacity tracking
- ❌ Client financials
- ❌ Strategic planning
- ❌ Renewal negotiations

**Responsibilities**:
- Project delivery
- Resource allocation
- Deadline management
- Quality control
- Team coordination

---

### 🟢 Specialist (Designer, Writer, Developer) - Task Focus
**Access**:
- ✅ Content briefs
- ✅ Campaign materials
- ✅ Asset repository
- ✅ Brand guidelines
- ✅ Their assigned tasks
- ❌ Client files (except public info)
- ❌ Strategic docs
- ❌ Financial information
- ❌ Client health scores

**Responsibilities**:
- Execute assigned tasks
- Meet quality standards
- Hit deadlines
- Collaborate with team

---

### 🔵 Contractor/Freelancer - Limited Access
**Access**:
- ✅ Specific project brief
- ✅ Relevant assets only
- ✅ Communication channel
- ❌ Client files
- ❌ Other projects
- ❌ System docs
- ❌ Any financial data

**Responsibilities**:
- Complete assigned work
- Meet specifications
- Hit deadlines

---

## 🔐 Setting Up Team Access

### Option 1: GitHub Repository with Permissions

**Set up repo with branch protection**:

```bash
# You (Owner) set up main repository
git remote add origin [your-repo-url]
git push -u origin main

# Create team branches
git checkout -b team/account-managers
git checkout -b team/project-managers
git checkout -b team/specialists

# Set up branch protection rules in GitHub
```

**GitHub Team Access**:
1. Go to GitHub → Settings → Manage Access
2. Create teams: "Account Managers", "Project Managers", "Specialists"
3. Set permissions:
   - **Owner**: Admin access to all branches
   - **Account Managers**: Write access to specific client folders only
   - **Project Managers**: Write access to projects, campaigns, content
   - **Specialists**: Read access, write to assigned tasks only

---

### Option 2: Folder-Based Access (Shared Drive)

**Structure with access controls**:

```
agency-system/
├── [PRIVATE - OWNER ONLY]/
│   ├── financials/
│   ├── contracts/
│   ├── strategy/
│   └── integrations/
│
├── [MANAGERS]/
│   ├── clients/
│   ├── client-success-dashboard.md
│   ├── renewal-management-system.md
│   └── client-health-scoring.md
│
├── [TEAM]/
│   ├── projects/
│   ├── campaigns/
│   ├── content/
│   ├── processes/
│   └── templates/
│
└── [PUBLIC - ALL TEAM]/
    ├── meetings/templates/
    ├── brand-guidelines/
    └── resources/
```

**Set up on Google Drive / Dropbox / OneDrive**:
- Create folders with sharing permissions
- Owner gets full access
- Team gets access to their folders only
- Use shared links for contractors

---

### Option 3: Using Claude Code with Team Access

**Set up .env for each team member**:

Each team member gets their own config:

```bash
# .env.account-manager
ROLE=account_manager
ASSIGNED_CLIENTS=acme-corp,widget-inc
ACCESS_LEVEL=client-management
HUBSPOT_ACCESS=readonly
```

```bash
# .env.project-manager
ROLE=project_manager
ACCESS_LEVEL=project-execution
HUBSPOT_ACCESS=readonly
CALENDAR_ACCESS=full
```

**Claude Code respects permissions**:
```
Account Manager: "Show me all client files"
→ Claude shows only their assigned clients

Project Manager: "Show me all projects"
→ Claude shows all projects (their role needs it)

Specialist: "Show me client financials"
→ Claude: "You don't have access to financial data"
```

---

## 📋 Team Workflows

### Morning Standup (Entire Team)

**Location**: `meetings/team-standup.md`

**Everyone can read/update**:
```
# Team Standup - [Date]

## Account Managers
- **Sarah**: Acme Corp meeting today, need creative review
- **John**: Widget Inc deliverable due, on track

## Project Managers
- **Mike**: 3 projects launching this week, capacity at 85%

## Specialists
- **Designer**: Working on Acme creative, ready by 2 PM
- **Writer**: Blog posts for 3 clients completed

## Blockers
- Need approval on Budget for ClientX
- Waiting on feedback from ClientY
```

---

### Weekly Client Review (Account Managers + You)

**Location**: `meetings/weekly-client-review.md`

**Account Managers update**:
- Their client health scores
- Deliverable status
- Any concerns or wins
- Requests for support

**You review**:
- Approve major decisions
- Flag strategic issues
- Identify growth opportunities

---

### Project Planning (Project Managers + Account Managers)

**Location**: `projects/weekly-planning.md`

**Collaborative planning**:
- Upcoming deliverables
- Resource allocation
- Dependencies
- Risk identification

---

## 🎯 Team-Specific Claude Code Commands

### Account Manager Commands
```
"Show me my assigned clients"
"Update health scores for my clients"
"Draft this week's client updates for my accounts"
"Flag any of my deliverables at risk"
"Create meeting notes for [My Client]"
"What do I need to do today for my clients?"
```

### Project Manager Commands
```
"Show all active projects and status"
"Flag projects at risk of missing deadlines"
"Show team capacity for next week"
"Create project timeline for [Campaign]"
"Identify resource conflicts"
"Generate weekly project status report"
```

### Specialist Commands
```
"Show me my assigned tasks"
"What's due for me this week?"
"Where's the brand guidelines for [Client]?"
"Upload completed work for [Project]"
"Mark [Task] as complete"
```

---

## 📊 Team Dashboards

### Account Manager Dashboard
**File**: `team/account-manager-dashboard.md`

**Each AM sees**:
- Their clients' health scores
- Their deliverables this week
- Their client meetings scheduled
- Action items for their accounts
- Performance metrics (for their clients)

### Project Manager Dashboard
**File**: `team/project-manager-dashboard.md`

**PM sees**:
- All active projects and status
- Team capacity and allocation
- Upcoming deadlines
- Resource conflicts
- Delivery performance

### Team Performance Dashboard
**File**: `team/team-dashboard.md` (You only)

**You see**:
- All client health scores
- All projects and status
- Team utilization
- Revenue metrics
- At-risk clients
- Growth opportunities

---

## 🔔 Team Notifications & Alerts

### Who Gets Alerted When

**Client At-Risk** (Health < 3.5):
- ✅ Account Manager (assigned to client)
- ✅ You (Owner)
- ❌ Other team members

**Deliverable At-Risk**:
- ✅ Account Manager
- ✅ Project Manager
- ✅ Assigned Specialist
- ✅ You

**Payment Failed**:
- ✅ You (Owner) only
- ❌ Team members (don't need to know)

**Project Milestone Hit**:
- ✅ Everyone on the project
- ✅ Account Manager
- ✅ You

**Client Thriving** (Health > 4.5):
- ✅ Account Manager (celebrate!)
- ✅ You (referral opportunity)

---

## 💬 Team Communication Guidelines

### What to Share in System
- ✅ Client interactions and notes
- ✅ Project updates and blockers
- ✅ Deliverable status
- ✅ Meeting notes
- ✅ Action items

### What to Keep in Slack/Email
- ❌ Quick questions
- ❌ Internal chat
- ❌ Urgent issues
- ❌ Informal discussions

### What to Keep Private
- ❌ Client contracts and pricing
- ❌ Individual performance reviews
- ❌ Strategic planning (until ready to share)
- ❌ Financial forecasts

---

## 🎓 Team Onboarding

### New Team Member Checklist

**Day 1**:
- [ ] Access granted to appropriate folders
- [ ] Read `processes/README.md`
- [ ] Review their role-specific guidelines
- [ ] Set up Claude Code with their permissions
- [ ] Intro meeting with team

**Week 1**:
- [ ] Shadow experienced team member
- [ ] Review 3 client files (if account manager)
- [ ] Review 3 projects (if project manager)
- [ ] Complete first assigned task (if specialist)
- [ ] First team standup participation

**Month 1**:
- [ ] Full access to their assigned work
- [ ] Comfortable with system
- [ ] Productive and contributing
- [ ] First performance review

---

## 📱 Remote Team Access

### Cloud Sync Options

**Option 1: Git + GitHub**
- Everyone clones repo
- Push/pull to sync
- Branch protection = access control
- Works offline

**Option 2: Shared Drive**
- Google Drive / Dropbox / OneDrive
- Real-time sync
- Folder permissions = access control
- Requires internet

**Option 3: Hybrid**
- Owner uses local + Git
- Team uses shared drive
- Auto-sync between them
- Best of both worlds

---

## 🔐 Security Best Practices

### DO ✅
- Use role-based access control
- Review permissions quarterly
- Revoke access when team members leave
- Use strong passwords / 2FA
- Keep sensitive data encrypted
- Log important changes
- Backup regularly

### DON'T ❌
- Give everyone full access "to make it easier"
- Share passwords or API keys
- Commit sensitive data to git
- Ignore access logs
- Let contractors keep access after project
- Store financial data in shared folders

---

## 🎯 Scaling Team Access

### As You Grow

**5-10 People**:
- Simple folder permissions work fine
- Weekly team meetings
- Owner approves all major decisions

**10-25 People**:
- Need more structure
- Department leads get expanded access
- Automated workflows reduce bottlenecks
- Consider dedicated tools (PM software, etc.)

**25+ People**:
- Formal access management system
- Multiple teams with team leads
- Department-specific systems
- Integration with HR systems

---

**Use Claude Code to**:
- "Set up team access for [Team Member] with [Role]"
- "Show me what [Team Member] can access"
- "Grant [Team Member] access to [Client] files"
- "Revoke access for [Former Team Member]"
- "Generate team performance report"
- "Show team capacity and allocation"
- "Create onboarding checklist for new [Role]"
