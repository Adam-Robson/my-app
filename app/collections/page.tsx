'use client';

import { useState } from 'react';
import CollectionsCard from '@/collections/collections-card';
import CollectionModal from '@/collections/modal';
import { collections } from '@/_data/collections';
import { ICollection } from '@/_types/collections';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';
import "./collections.css";


export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<ICollection | null>(null);

  return (
    <div className="min-h-screen p-6">
      <Link href="/" className="back-link">
        <FiChevronLeft />
      </Link>
      <h1 className="text-3xl font-bold text-center mb-8">Albums</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionsCard
            key={collection.id}
            collection={collection}
            onClick={() => setSelectedCollection(collection)}
          />
        ))}
      </div>
      {selectedCollection && (
        <CollectionModal
          album={selectedCollection}
          onClose={() => setSelectedCollection(null)}
        />
      )}
      
    </div>
  );
}
