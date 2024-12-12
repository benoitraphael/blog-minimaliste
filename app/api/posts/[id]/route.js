import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

// Récupérer un article
export async function GET(request, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(params.id)
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article' },
      { status: 500 }
    );
  }
}

// Modifier un article
export async function PUT(request, { params }) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    const post = await prisma.post.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags,
        date: new Date(data.date)
      }
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la modification' },
      { status: 500 }
    );
  }
}

// Supprimer un article
export async function DELETE(request, { params }) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    );
  }

  try {
    await prisma.post.delete({
      where: {
        id: parseInt(params.id)
      }
    });
    return NextResponse.json({ message: 'Article supprimé' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
}