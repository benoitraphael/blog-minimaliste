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
      <body>
        <SessionProvider session={session}>
          <div className="content-wrapper">
            <main>
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
