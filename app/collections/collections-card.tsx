import Image from "next/image";

export default function CollectionsCard({
    collection,
    onClick,
  }: {
    collection: { title: string; cover: string; releaseDate: string };
    onClick: () => void;
  }) {
    return (
      <div
        className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <Image
          src={collection.cover}
          alt={collection.title}
          height={500}
          width={500}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{collection.title}</h2>
          <p className="text-gray-600 text-sm">Released: {collection.releaseDate}</p>
        </div>
      </div>
    );
  }
