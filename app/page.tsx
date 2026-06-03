import { getAllItems } from '@/lib/items';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const items = getAllItems();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mi Galería</h1>
          <p className="text-zinc-400 text-sm">{items.length} items</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-zinc-500">No hay items aún</p>
            <p className="text-zinc-600 mt-2">Añade carpetas en /items/</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Link 
                key={item.slug} 
                href={`/${item.slug}`}
                className="group"
              >
                <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  
                  {/* Imagen */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <Image 
                      src={item.cover} 
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="p-5">
                    <h2 className="text-xl font-semibold leading-tight mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h2>
                    
                    {item.date && (
                      <p className="text-xs text-zinc-500 mb-3">
                        {new Date(item.date).toLocaleDateString('es-ES')}
                      </p>
                    )}

                    <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                      {item.content.substring(0, 140)}{item.content.length > 140 ? '...' : ''}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="text-[10px] px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
