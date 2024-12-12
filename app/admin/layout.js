import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

export default async function AdminLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}