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

export function getAllItems(): Item[] {
  const folders = fs.readdirSync(itemsDirectory);

  return folders
    .map((folder) => {
      const fullPath = path.join(itemsDirectory, folder);
      if (!fs.statSync(fullPath).isDirectory()) return null;

      const detailsPath = path.join(fullPath, 'details.md');
      if (!fs.existsSync(detailsPath)) return null;

      const fileContents = fs.readFileSync(detailsPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Buscar la imagen de portada
      const coverFile = fs.readdirSync(fullPath)
        .find(file => file.startsWith('cover.'));

      return {
        slug: folder,
        title: data.title || folder,
        date: data.date || '',
        tags: data.tags || [],
        cover: `/items/\( {folder}/ \){coverFile}`,
        content,
      };
    })
    .filter((item): item is Item => item !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getItemBySlug(slug: string): Item | null {
  // Similar lógica pero para un solo item
  // ...
           }
