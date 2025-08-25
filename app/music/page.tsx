'use client';

import Image from 'next/image';
import { useState } from 'react';
import { albums } from '@/data/albums';
import { useAudio } from '@/contexts/audio-provider';
import { AlbumType } from '@/types/album';

export default function AlbumsPage() {
  const { setTrack, setPlaylist, currentTrack } = useAudio();
  const [openId, setOpenId] = useState<string | null>(null); // for touch/mobile toggle

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-light mb-8">Albums</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {albums.map((album: AlbumType) => {
          const isOpen = openId === album.id;

          return (
            <article
              key={album.id}
              className="rounded-xl border border-black/10 overflow-hidden bg-[var(--secondary)]/5"
            >
              <div
                className={`
                  group relative isolate
                  focus-within:ring-2 focus-within:ring-black/30 rounded-xl
                `}
              >
                {/* Cover */}
                <div className="relative w-full h-64 sm:h-72">
                  <Image
                    src={album.cover}
                    alt={`${album.title} cover`}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>

                {/* Overlay: appears on hover / focus-within (desktop) or when toggled (mobile) */}
                <div
                  className={[
                    'absolute inset-0 z-10 flex flex-col',
                    'bg-gradient-to-t from-black/70 via-black/50 to-black/20',
                    'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
                    isOpen ? 'opacity-100' : '',
                    'transition-opacity duration-300',
                  ].join(' ')}
                  aria-hidden={!(isOpen)}
                >
                  {/* Header row */}
                  <header className="p-3 flex items-baseline justify-between gap-3 text-white">
                    <div>
                      <h2 className="text-lg font-medium">{album.title}</h2>
                      <span className="text-xs opacity-80">{album.year}</span>
                    </div>

                    {/* Mobile/touch toggle button (visible always) */}
                    <button
                      type="button"
                      className="rounded-md px-2 py-1 text-xs bg-white/15 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40"
                      onClick={() => setOpenId(isOpen ? null : album.id)}
                      aria-expanded={isOpen}
                      aria-controls={`tracks-${album.id}`}
                    >
                      {isOpen ? 'Hide tracks' : 'Show tracks'}
                    </button>
                  </header>

                  {/* Track list */}
                  <ul
                    id={`tracks-${album.id}`}
                    className="mt-auto max-h-48 overflow-y-auto p-3 space-y-1"
                  >
                    {album.songs.map((t, idx) => {
                      const isCurrent = currentTrack?.src === t.src;
                      return (
                        <li key={t.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setPlaylist(album.songs);
                              setTrack(t);
                              setOpenId(null);
                            }}
                            className={[
                              'w-full text-left rounded px-2 py-1 text-sm',
                              'bg-white/0 hover:bg-white/10 focus:bg-white/15',
                              'text-white transition-colors',
                              isCurrent ? 'text-[var(--accent)] font-medium' : '',
                            ].join(' ')}
                            title={`Play ${t.title}`}
                          >
                            <span className="tabular-nums mr-2 opacity-80">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            {t.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Title bar under the image (visible when overlay hidden) */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-base font-medium">{album.title}</div>
                  <div className="text-xs opacity-70">{album.year}</div>
                </div>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-xs border border-black/10 hover:bg-black/5"
                  onClick={() => setOpenId(isOpen ? null : album.id)}
                  aria-expanded={isOpen}
                  aria-controls={`tracks-${album.id}`}
                >
                  {isOpen ? 'Hide tracks' : 'Tracks'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
