import { PrismaClient } from '@prisma/client';
import { marked } from 'marked';

const prisma = new PrismaClient();

async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      date: 'desc'
    }
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    
    return {
      datetime: isoString,
      formatted: new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    };
  };

  return (
    <main className="px-8 py-12 max-w-3xl mx-auto">
      <header className="mb-16">
        <h1 className="site-title mb-2">Carnet</h1>
        <p className="site-subtitle">Benoit Raphael</p>
      </header>

      <div className="space-y-20">
        {posts.map((post, index) => {
          const date = formatDate(post.date);
          const isLastPost = index === posts.length - 1;
          
          return (
            <article 
              key={post.id} 
              className={`prose ${!isLastPost ? 'pb-20 border-b border-gray-300' : ''}`}
            >
              <header className="mb-6">
                <h2 className="article-title mb-2">{post.title}</h2>
                <time className="article-date" dateTime={date.datetime}>
                  {date.formatted}
                </time>
              </header>
              
              <div className="article-content" dangerouslySetInnerHTML={{ 
                __html: marked(post.content)
              }} />
              
              {post.tags && (
                <footer className="mt-8">
                  {post.tags.split(' ').map((tag) => (
                    <span key={tag} className="tag mr-3">
                      {tag}
                    </span>
                  ))}
                </footer>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}