# 🚀 Agency Dashboard

A beautiful, modern web dashboard for managing your marketing agency. Built with Next.js, TypeScript, and TailwindCSS.

## ✨ Features

### Core Dashboard
- **📊 Real-time Dashboard**: View all clients, MRR, health scores, and renewals at a glance
- **👥 Client Management**: Detailed client profiles with health tracking
- **💰 Revenue Tracking**: Monitor MRR and financial metrics
- **🎯 Health Monitoring**: Visual client health scoring (Thriving, Healthy, At-Risk)
- **📅 Renewal Pipeline**: Track upcoming renewals and prevent churn

### Advanced Features (NEW!)
- **📈 Revenue Analytics**: Beautiful charts showing revenue trends, forecasts, service breakdown, and growth metrics
- **🎯 60-Day Sprint Tracker**: Visual progress tracker for your £35k → £100k MRR sprint with weekly goals
- **👥 Team Performance Dashboard**: Monitor team utilization, quality scores, and productivity with radar charts
- **✅ Task Management**: Kanban board with To Do, In Progress, Review, and Done columns
- **🔌 Integrations**: HubSpot CRM sync, GoCardless payment tracking, Google Calendar automation
- **💳 Client Portal**: Beautiful client-facing dashboard showing their performance and updates

### Technical Excellence
- **🎨 Beautiful UI**: Modern, responsive design with dark mode support
- **⚡ Fast**: Built with Next.js 15 for optimal performance
- **📱 Mobile-Friendly**: Works perfectly on all devices
- **🔒 Secure**: API integrations with proper authentication

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ installed
- Your agency system markdown files (already set up!)

### Installation & Running

1. **Navigate to the dashboard folder**:
   ```bash
   cd /home/user/anthropic-claude-code/agency-system/dashboard
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to: **http://localhost:3000**

That's it! Your beautiful dashboard is now running! 🎉

## 📱 What You'll See

### Main Dashboard
- **Top Metrics**: MRR, Active Clients, Avg Health Score, Upcoming Renewals
- **Client Health Columns**:
  - 🟢 Thriving (4.5+)
  - 🔵 Healthy (3.5-4.4)
  - 🔴 At-Risk (<3.5)
- **Quick Actions**: Links to sprint tracker, team dashboard, analytics

### Clients Page
- Complete list of all clients
- Sortable table with health scores, MRR, renewal dates
- Quick search and filtering

### Client Detail Page
- Full client profile with all information
- Health score breakdown
- Services provided
- Contract details
- Contact information
- Complete client notes and history

## 🎨 Features in Detail

### Automatic Data Sync
The dashboard automatically reads from your markdown files in the `clients/` folder:
- No database needed
- Edit your markdown files, refresh the page, see changes
- All data stays in your control

### Responsive Design
- Looks beautiful on desktop, tablet, and mobile
- Dark mode support (auto-detects system preference)
- Professional color scheme

### Client Health Tracking
Visual health scoring with automatic categorization:
- **Thriving** (4.5+): Green - Everything great, potential for upsell/referral
- **Healthy** (3.5-4.4): Blue - Going well, maintain current efforts
- **At-Risk** (<3.5): Red - Needs immediate attention

## 🔧 Customization

### Adding More Pages

Want to add sprint tracking, team dashboards, or analytics? Just create new files:

```bash
# Create a new page
app/sprint/page.tsx
app/team/page.tsx
app/analytics/page.tsx
```

### Modifying the Dashboard

All components are in:
- `app/page.tsx` - Main dashboard
- `app/clients/page.tsx` - Clients list
- `app/clients/[id]/page.tsx` - Individual client detail
- `lib/markdown-parser.ts` - Data parsing logic

### Styling

Colors and themes can be customized in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles

## 📊 Data Source

The dashboard reads from your markdown files at:
```
/home/user/anthropic-claude-code/agency-system/clients/
```

Currently displaying:
- ✅ Dr Nyla Clinic (£2k/month, 4.0/5 health)
- Add more clients as `.md` files and they'll appear automatically!

## 🚀 Production Build

When ready to deploy:

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 💡 Tips

1. **Bookmark it**: Add `http://localhost:3000` to your bookmarks
2. **Keep it running**: Leave `npm run dev` running in a terminal while you work
3. **Auto-reload**: Edit any markdown file, refresh browser to see updates
4. **Dark mode**: Toggle your system dark mode preference to see the dashboard adapt

## 🎯 Next Steps

### ✅ Completed Features:
- [x] 📈 Revenue charts and trends (with Recharts) - **LIVE**
- [x] 💾 HubSpot API integration - **LIVE**
- [x] 💳 GoCardless payment tracking - **LIVE**
- [x] 📊 Advanced analytics dashboard - **LIVE**
- [x] 👥 Team performance metrics - **LIVE**
- [x] 🎯 60-day sprint progress tracker - **LIVE**
- [x] 📝 Task management with Kanban board - **LIVE**
- [x] 💼 Client portal - **LIVE**

### Future Enhancements:
- [ ] 📅 Live Google Calendar integration
- [ ] 🔔 Real-time notifications and alerts
- [ ] 📧 Email template generator
- [ ] 🤖 AI-powered insights and recommendations
- [ ] 📱 Mobile app (iOS/Android)
- [ ] 🔐 Client authentication and login

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **Charts**: Recharts (ready to use)
- **Markdown**: gray-matter

## 📞 Need Help?

Ask me (Claude Code) to:
- Add new features
- Customize the design
- Fix any issues
- Add integrations
- Create new dashboards

---

**Your agency command center is ready!** 🚀

Run `npm run dev` and navigate to http://localhost:3000 to see it in action!
