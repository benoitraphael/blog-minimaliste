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
      <body className="min-h-screen bg-white">
        <SessionProvider session={session}>
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <main className="prose prose-lg py-8">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
