import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Life Quest - Gamified Habit Tracker',
  description: 'Level up your life with Health, Wealth & Relationships',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0f0f0f]">{children}</body>
    </html>
  );
}
