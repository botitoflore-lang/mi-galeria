import { getAllItems } from '@/lib/items';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const items = getAllItems();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Mi Galería</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(item => (
          <Link key={item.slug} href={`/${item.slug}`} className="group">
            <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all">
              <div className="relative aspect-video">
                <Image 
                  src={item.cover} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                  {item.content.substring(0, 120)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
