import { getItemBySlug } from '@/lib/items';
import { marked } from 'marked';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const { getAllItems } = await import('@/lib/items');
  const items = getAllItems();
  return items.map(item => ({ slug: item.slug }));
}

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const item = getItemBySlug(params.slug);
  
  if (!item) {
    return <div className="text-center py-20 text-2xl">Item no encontrado</div>;
  }

  const htmlContent = marked(item.content);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link href="/" className="text-blue-400 hover:underline mb-8 inline-block">
          ← Volver a la galería
        </Link>

        <div className="relative rounded-3xl overflow-hidden mb-10 border border-zinc-800">
          <Image 
            src={item.cover} 
            alt={item.title}
            width={1200}
            height={675}
            className="w-full object-cover"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {item.title}
        </h1>

        {item.date && (
          <p className="text-zinc-500 mb-8">{new Date(item.date).toLocaleDateString('es-ES', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          })}</p>
        )}

        <div 
          className="prose prose-invert prose-zinc max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </div>
  );
}
