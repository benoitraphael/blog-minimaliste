import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Récupération des articles...");
    const posts = await prisma.post.findMany({
      orderBy: {
        date: 'desc'
      }
    });
    console.log("Articles récupérés avec succès:", posts.length);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log("Vérification de la session...");
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.log("Tentative d'accès non autorisé");
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    console.log("Session valide, traitement de la requête...");
    const data = await request.json();
    console.log("Données reçues:", data);

    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags,
        date: new Date(data.date),
        published: true
      },
    });

    console.log("Article créé avec succès:", post);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    return NextResponse.json(
      { error: `Erreur lors de la création: ${error.message}` },
      { status: 500 }
    );
  }
}