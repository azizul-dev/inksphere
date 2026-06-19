import { requireRole } from '@/lib/core/session';


const ReaderLayoutPage = async ({children}) => {
    await requireRole('reader')
    return children;
};

export default ReaderLayoutPage;