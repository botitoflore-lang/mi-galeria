import { getAllItems, getItemBySlug } from '@/lib/items';
import { marked } from 'marked';
import Image from 'next/image';

export async function generateStaticParams() {
  const items = getAllItems();
  return items.map(item => ({ slug: item.slug }));
}

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const item = getItemBySlug(params.slug);
  
  if (!item) return <div>Item no encontrado</div>;

  const htmlContent = marked(item.content);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Image 
        src={item.cover} 
        alt={item.title}
        width={800}
        height={450}
        className="rounded-xl mb-8"
      />
      
      <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
      
      <div 
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  );
}
