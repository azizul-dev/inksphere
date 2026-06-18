'use server'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createNewBook = async (newBookData) =>{
    const res = await fetch(`${baseUrl}/api/books`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookData),
    });
    return res.json();
};