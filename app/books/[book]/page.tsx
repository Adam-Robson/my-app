import React from 'react'
import { fetchBooks, fetchBook } from '@/_services/fetch'
import { TBook } from '@/_types/books'
import { Metadata } from 'next'
import Image from 'next/image'

export async function getStaticParams() {
  const books = await fetchBooks()
  return (
    books.map((book: TBook) => ({
       id: book.id 
      })
    )
  )
}

export async function generateMetadata({ params }: { params: { id: number }}): Promise<Metadata> {
  const book = await fetchBook(params.id)
  return {
    title: book.title,
    description: book.description
  }
}

export default async function Book({ params }: { params: { id: number }}) {
  const book = await fetchBook(params.id)
  
  if (!book) {
    return <div>Book not found</div>
  }


  return (
    <div>
      <Image src={book.png_image} alt={book.title} height={200} width={100}/>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <h3>{book.publisher}</h3>
      <h4>{book.year}</h4>
      <h5>{book.pages}</h5>
    </div>
  )
}
