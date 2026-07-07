import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const sql = getDb();
    const produits = await sql`SELECT * FROM produits ORDER BY created_at DESC`;
    return NextResponse.json(produits);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, prix, devise, categorie, description, image_url } = body;
    if (!nom || !prix || !categorie) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }
    const sql = getDb();
    const result = await sql`
      INSERT INTO produits (nom, prix, devise, categorie, description, image_url)
      VALUES (${nom}, ${prix}, ${devise || 'FCFA'}, ${categorie}, ${description || ''}, ${image_url || ''})
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
