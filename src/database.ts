import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('mydb.db');
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);'
  );
});

/*
-- Table des projets
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

-- Table des personnages
CREATE TABLE IF NOT EXISTS characters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  stats JSON, -- JSON ou texte pour stocker les stats
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Table des boutiques (une boutique par projet, optionnelle)
CREATE TABLE IF NOT EXISTS shops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  name TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Table des objets de boutique
CREATE TABLE IF NOT EXISTS shop_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shop_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price INTEGER,
  description TEXT,
  FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
);

-- Table des règles (texte libre ou JSON)
CREATE TABLE IF NOT EXISTS rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  content TEXT, -- Peut contenir du texte, du markdown, ou du JSON
  type TEXT,    -- "combat", "général", etc. (optionnel)
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
*/