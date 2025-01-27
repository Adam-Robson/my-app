import { client } from './database-client';


export async function fetchBooks() {
    const response = await client
        .from('books')
        .select('*');
    
    if (response.error) {
        throw new Error(response.error.message);
    }

    return response.data;
}

export async function fetchBook(id: number) {
    const response = await client
        .from('books')
        .select('*')
        .eq('id', id)
        .single();
    
    if (response.error) {
        throw new Error(response.error.message);
    }

    return response.data[0];
}

