import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth/next';
import { SessionProvider } from '@/components/SessionProvider';

export const metadata = {
  title: 'Carnet',
  description: 'Benoit Raphael',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="fr">
      <body className="min-h-screen">
        <SessionProvider session={session}>
          <div className="w-full bg-white">
            <main className="max-w-3xl mx-auto p-8 prose prose-lg">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
