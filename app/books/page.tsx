import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import Link from 'next/link'
import { fetchBooks } from '@/_services/fetch'


export const dynamic = "force-static"

export default async function BooksPage() {
  const books = await fetchBooks();

  if (!books || books.length === 0) {
    return <div>No books currently available.</div>
  }
  
  return (
    <div>
      <Link href="/">
          <FiChevronLeft />
      </Link>
      <h1>Books List</h1>
      <ul>
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Link href={`/books/${book.id}`}>
                <a>{book.title}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

