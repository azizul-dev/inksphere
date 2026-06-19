import { requireRole } from '@/lib/core/session';


const WriterLayoutPage = async ({children}) => {
    await requireRole('writer')
    return children;
};

export default WriterLayoutPage;