import React from 'react'
import Image from 'next/image'
import { client } from '@/_services/client'
import Link from 'next/link'
import { FiChevronLeft } from 'react-icons/fi'

export async function generateStaticParams() {
    const { data: books, error } = await client.from('books-table').select('id');
    if (error) {
      console.error('Error fetching book IDs', error);
      return [];
    }
    return books.map((book) => ({
      id: book.id.toString(),
    }));
}

export default async function BookPage({ params }: { params: { id: string }}) {
  const { id } = params;
  const { data: book, error } = await client
    .from('books-table')
    .select('*')
    .eq('id', parseInt(id))
    .single();

    if (error || !book) {
      console.error('Error fetching book', error);
      return;
    }
  
    if (!book) {
      return (
        <div className="max-w-2xl mx-auto p-6">
          <p className="text-xl">Book not found</p>
        </div>
      )
    }

    return (
      <div className="page min-h-screen p-6">
        <Link href="/books" className="back-link">
          <FiChevronLeft size={32} />
        </Link>
        <div className="max-w-3xl mx-auto rounded-lg shadow-md p-6">
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-lg mb-4">By {book.author}</p>
          <div className="text-sm space-y-2">
            <p><span className="page-text font-semibold">Published by: </span>{book.publisher}</p>
            <p><span className="page-text font-semibold">Year: </span>{book.year}</p>
            <p><span className="page-text font-semibold">Pages: </span>{book.pages}</p>
            <Image 
              src={book.svg_image} 
              alt={book.title} 
              height={300} 
              width={200}
              className="rounded-lg shadow-lg"
            />
          </div>
          <Link
            href="/books"
            className="link inline-block mt-6 px-6 py-2 font-medium rounded-lg hover:shadow-sm transition"
            >Back to Books List
          </Link>
        </div>
      </div>
    )
  }
