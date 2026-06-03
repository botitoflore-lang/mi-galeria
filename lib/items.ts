import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const itemsDirectory = path.join(process.cwd(), 'items');

export type Item = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  content: string;
  tags?: string[];
};

// Type guard para eliminar nulls
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function getAllItems(): Item[] {
  if (!fs.existsSync(itemsDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(itemsDirectory);

  const items = folders
    .map((folder) => {
      const fullPath = path.join(itemsDirectory, folder);

      // Solo procesar carpetas
      if (!fs.statSync(fullPath).isDirectory()) return null;

      const detailsPath = path.join(fullPath, 'details.md');
      if (!fs.existsSync(detailsPath)) return null;

      const fileContents = fs.readFileSync(detailsPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Buscar archivo de portada (cover.png, cover.gif, cover.jpg, etc.)
      const filesInFolder = fs.readdirSync(fullPath);
      const coverFile = filesInFolder.find(file => 
        file.startsWith('cover.')
      );

      if (!coverFile) return null;

      return {
        slug: folder,
        title: (data.title as string) || folder.replace(/-/g, ' '),
        date: (data.date as string) || '',
        tags: (data.tags as string[]) || [],
        cover: `/items/\( {folder}/ \){coverFile}`,
        content: content.trim(),
      };
    })
    .filter(isNotNull);   // ← Esto arregla el error de tipos

  // Ordenar por fecha (más nuevo primero)
  return items.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getItemBySlug(slug: string): Item | null {
  const items = getAllItems();
  return items.find(item => item.slug === slug) || null;
}
