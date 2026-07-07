import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

async function ensureTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS produits (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(255) NOT NULL,
      prix INTEGER NOT NULL,
      devise VARCHAR(10) DEFAULT 'FCFA',
      categorie VARCHAR(100) NOT NULL,
      description TEXT DEFAULT '',
      image_url TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL manquante dans les variables Vercel' }, { status: 500 });
    }
    await ensureTable();
    const sql = getDb();
    const produits = await sql`SELECT * FROM produits ORDER BY created_at DESC`;
    return NextResponse.json(produits);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('GET /api/produits:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL manquante dans les variables Vercel' }, { status: 500 });
    }
    const body = await req.json();
    const { nom, prix, devise, categorie, description, image_url } = body;
    if (!nom || !prix || !categorie) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }
    await ensureTable();
    const sql = getDb();
    const result = await sql`
      INSERT INTO produits (nom, prix, devise, categorie, description, image_url)
      VALUES (${nom}, ${prix}, ${devise || 'FCFA'}, ${categorie}, ${description || ''}, ${image_url || ''})
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('POST /api/produits:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
