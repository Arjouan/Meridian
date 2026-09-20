import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meridian — Vessel Management System',
  description: 'Vessel Management System (VMS) for maritime logistics — real-time container visibility & vessel emissions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
