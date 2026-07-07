-- Run this in your Neon database console
CREATE TABLE IF NOT EXISTS produits (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prix INTEGER NOT NULL,
  devise VARCHAR(10) DEFAULT 'FCFA',
  categorie VARCHAR(100) NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Optional: Insert demo data
INSERT INTO produits (nom, prix, devise, categorie, description, image_url) VALUES
('Pagne Wax Premium', 8500, 'FCFA', 'Pagnes', 'Pagne wax 100% coton, 6 yards. Motifs colorés tendance.', 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500'),
('Pagne Kente Royal', 12000, 'FCFA', 'Pagnes', 'Tissage kente artisanal, motifs géométriques traditionnels.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500'),
('Robe Ankara Élégante', 18000, 'FCFA', 'Vêtements', 'Robe longue en tissu ankara, coupe moderne et élégante.', 'https://images.unsplash.com/photo-1594938298603-c8148c4b4a5a?w=500'),
('Ensemble Bogolan', 22000, 'FCFA', 'Vêtements', 'Ensemble haut + pantalon en tissu bogolan fait main.', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500'),
('Sac Raphia Tressé', 9500, 'FCFA', 'Sacs', 'Sac à main en raphia naturel tressé à la main, unique.', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'),
('Sac Wax Bandoulière', 11000, 'FCFA', 'Sacs', 'Sac bandoulière en tissu wax doublé, fermeture zippée.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500');
