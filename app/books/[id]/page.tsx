import React from 'react'
import { fetchBooks, fetchBook } from '@/_services/books'
import { TBook } from '@/_types/books'
import Image from 'next/image'

export async function generateStaticParams() {
  const books = await fetchBooks()
  return (
    books.map((book: TBook) => ({
      book: book.id.toString()
    }))
  )
}

export default async function BookPage({ params }: { params: { id: string }}) {
  const book = await fetchBook(parseInt(params.id)) as unknown as TBook
  
  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex gap-8">
        <div className="flex-shrink-0">
          <Image 
            src={book.svg_image} 
            alt={book.title} 
            height={300} 
            width={200}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-xl text-gray-600">By {book.author}</p>
          <div className="space-y-2 text-gray-600">
            <p>Published by {book.publisher}</p>
            <p>Year: {book.year}</p>
            <p>Pages: {book.pages}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 60
