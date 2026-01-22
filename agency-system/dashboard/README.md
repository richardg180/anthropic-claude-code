# 🚀 Agency Dashboard

A beautiful, modern web dashboard for managing your marketing agency. Built with Next.js, TypeScript, and TailwindCSS.

## ✨ Features

- **📊 Real-time Dashboard**: View all clients, MRR, health scores, and renewals at a glance
- **👥 Client Management**: Detailed client profiles with health tracking
- **💰 Revenue Tracking**: Monitor MRR and financial metrics
- **🎯 Health Monitoring**: Visual client health scoring (Thriving, Healthy, At-Risk)
- **📅 Renewal Pipeline**: Track upcoming renewals and prevent churn
- **🎨 Beautiful UI**: Modern, responsive design with dark mode support
- **⚡ Fast**: Built with Next.js 15 for optimal performance

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

### Planned Features (Ask me to build these!):
- [ ] 📈 Revenue charts and trends (using Recharts)
- [ ] 📅 Calendar integration for renewal reminders
- [ ] 🔔 Real-time notifications for at-risk clients
- [ ] 💾 HubSpot API integration
- [ ] 💳 GoCardless payment tracking
- [ ] 📊 Advanced analytics dashboard
- [ ] 👥 Team performance metrics
- [ ] 🎯 60-day sprint progress tracker
- [ ] 📝 Task management integration
- [ ] 📧 Email template generator

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
