import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Toaster } from 'react-hot-toast';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1f1f35',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  );
}