const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getWriterBooks = async (writerId, status = 'draft') => {
    const res = await fetch(`${baseUrl}/api/books?writerId=${writerId}&status=${status}`);
    return res.json();
}