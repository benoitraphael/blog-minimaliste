import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        date: 'desc'
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    );
  }
}



// Méthode POST pour créer un article
export async function POST(request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags,
        date: new Date(data.date)
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
