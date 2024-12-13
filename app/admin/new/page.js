'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Tentative d'envoi de l'article:", { title, content, tags, date });
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          tags,
          date: new Date(date).toISOString(),
        }),
      });
  
      console.log("Statut de la réponse:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de l\'article');
      }
  
      const data = await response.json();
      console.log("Article créé avec succès:", data);
      
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error('Erreur détaillée:', error);
      alert('Erreur lors de la création de l\'article: ' + error.message);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl">Nouvel article</h1>
        <button 
          onClick={() => router.push('/admin')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Retour
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Tags (séparés par des espaces : #tag1 #tag2)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="#tag1 #tag2"
          />
        </div>

        <div>
          <label className="block mb-2">Contenu (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded font-mono h-96"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  );
}