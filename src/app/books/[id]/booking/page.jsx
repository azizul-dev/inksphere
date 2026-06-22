import { getUserSession, getRoleFromDB } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const BookingPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/books/${id}/booking`);
  }

  // Fetch real role from Express backend (source of truth)
  const role = await getRoleFromDB(user.email);

  if (role !== "reader") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700">
            Only readers can purchase ebooks
          </h2>
          <p className="mt-2 text-slate-500">
            This page is restricted to reader accounts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Booking Page</h2>
    </div>
  );
};

export default BookingPage;
