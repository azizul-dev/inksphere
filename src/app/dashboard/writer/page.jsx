'use client'
import DashboardHomePage from '@/components/dashboard/DashboardHomePage';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const WriterPage = () => {
    const {data: session, isPending} = useSession();
    if(isPending){
        return <div>Loading...</div>
    }
    const user = session?.user;
    return (
        <div>
            <DashboardHomePage/>
        </div>
    );
};

export default WriterPage;