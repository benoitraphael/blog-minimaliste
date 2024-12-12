'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  // Fonction de récupération des articles
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Articles récupérés:", data);
        setPosts(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  // Chargement des articles au montage du composant
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fonction de suppression
  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPosts(); // Recharge la liste après suppression
      }
    }
  };

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl">Administration</h1>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Déconnexion
        </button>
      </header>

      <button 
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        onClick={() => router.push('/admin/new')}
      >
        Nouvel article
      </button>

      <div className="mt-8">
        <h2 className="text-xl mb-4">Articles ({posts.length})</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="border rounded p-4">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(post.date).toLocaleDateString('fr-FR')}
              </p>
              {post.tags && (
                <p className="text-sm text-gray-500 mt-1">{post.tags}</p>
              )}
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => router.push(`/admin/edit/${post.id}`)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}