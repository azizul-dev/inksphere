import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const BookingPage = async ({params}) => {
    const {id} = await params;
    const user = await getUserSession();

    if(!user){
        redirect(`/auth/signin?redirect=/books/${id}/booking`);
    }
  
    return (
        <div>
            <h2>Booking Page</h2>
        </div>
    );
};

export default BookingPage;