import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import Link from 'next/link'
import { fetchBooks } from '@/_services/books'
import './books.css'

export const dynamic = "force-static"

export default async function BooksPage() {
  const books = await fetchBooks();

  if (!books || books.length === 0) {
    return <div>No books currently available.</div>
  }
  
  return (
    <div className="page min-h-screen p-4">
      <Link href="/" className="back-link">
        <FiChevronLeft />
      </Link>
      <h1 className="text-3xl text-center mb-6">Books List</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
            <div
              key={book.id.toString()}
              className="book-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"  
            >
              <h2 className="book-title text-xl font-semibold mb-2">{book.title}</h2>
              <p className="book-author">by {book.author}</p>
              <Link href={`/books/${book.id.toString()}`} className="book-link">
                View Details
              </Link>
            </div>
        ))}
      </div>
    </div>
  )
}

