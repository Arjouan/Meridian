import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maritime Logistics Platform',
  description: 'Open, real-time container visibility & vessel emissions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
