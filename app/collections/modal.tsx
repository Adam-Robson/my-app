'use client';

import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import "./collections.css";

export default function CollectionModal({
  album,
  onClose,
}: {
  album: { title: string; cover: string; description: string; tracks: Array<{ id: number; title: string; duration: string }> };
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-3xl w-full p-4 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
          aria-label="Close"
        >
          <FiX />
        </button>
        <Image
          src={album.cover}
          alt={album.title}
          width={500}
          height={500}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-3xl font-bold mb-4">{album.title}</h2>
        <p className="text-gray-700 mb-4">{album.description}</p>
        <ul className="space-y-2">
          {album.tracks.map((track) => (
            <li
              key={track.id}
              className="flex justify-between items-center rounded p-2"
            >
              <span>{track.title}</span>
              <span className="text-gray-500">{track.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
