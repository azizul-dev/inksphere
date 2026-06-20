import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { createPurchase } from "@/lib/api/purchases";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  if (!session_id) return redirect("/");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.status === "open") return redirect("/");

  if (session.payment_status === "paid") {
    const { bookId, userId, writerId } = session.metadata;
    await createPurchase({
      userId,
      bookId,
      writerId,
      price: session.amount_total / 100,
      transactionId: session.payment_intent?.id || session.id,
    });
  }

  const customerEmail = session.customer_details?.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_20px_80px_rgba(249,115,22,0.15)]">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-10 text-center text-white">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-5xl backdrop-blur">
              ✅
            </div>

            <h1 className="mt-6 text-3xl font-black">Payment Successful 🎉</h1>

            <p className="mt-3 text-orange-50">
              Your ebook purchase has been completed successfully.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            <div className="rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">Confirmation sent to</p>

              <p className="mt-2 break-all text-lg font-bold text-slate-800">
                {customerEmail}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <h3 className="font-bold text-emerald-700">Purchase Completed</h3>

              <ul className="mt-3 space-y-2 text-sm text-emerald-700">
                <li>✅ Payment verified successfully</li>
                <li>✅ Ebook unlocked</li>
                <li>✅ Purchase saved to your account</li>
                <li>✅ Confirmation email sent</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard/bookmark"
                className="flex h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                My Library
              </Link>

              <Link
                href="/"
                className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-white shadow-lg"
              >
                Explore More Books
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Thank you for supporting writers on InkSphere ❤️
        </p>
      </div>
    </div>
  );
}
