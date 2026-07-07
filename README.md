# OBI STYLE — Mode Africaine

Boutique en ligne premium. Stack: Next.js 16, **Neon (PostgreSQL)**, Tailwind CSS.

## Setup

1. Créer un projet sur [console.neon.tech](https://console.neon.tech)
2. Copier la connection string
3. Créer `.env.local` :
   ```
   DATABASE_URL=postgresql://...
   ```
4. Exécuter `schema.sql` dans la console SQL Neon
5. `npm install && npm run dev`

## Déploiement Vercel

Variable d'environnement : `DATABASE_URL` = connection string Neon
