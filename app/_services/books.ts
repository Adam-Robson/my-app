import { client } from "./client";

export async function fetchBooks() {
    const { data: books, error } = await client
        .from('books-table')
        .select('*');
        
    if (error) {
        console.error('Error fetching books', error);
        return [];
    }
    return books;
}

export async function fetchBook(id: number) {
    const { data: book, error } = await client
        .from('books-table')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !book) {
        console.error('Error fetching book', error);
        return;
    }
    return book;
}
