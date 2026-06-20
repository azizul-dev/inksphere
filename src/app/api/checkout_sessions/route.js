import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { getSingleBook } from "@/lib/api/books";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const bookId = formData.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Login না থাকলে Login Page এ পাঠাবে
    if (!session?.user) {
      return NextResponse.redirect(
        `${origin}/auth/signin?redirect=/books/${bookId}`,
        303
      );
    }

    const book = await getSingleBook(bookId);

    if (!book) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: session.user.email,

      metadata: {
        bookId: String(book._id),
        userId: String(session.user.id),
        writerId: String(book.writerId),
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: book.title,
            },
            unit_amount: Number(book.price) * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/books/${bookId}`,
    });

    return NextResponse.redirect(checkoutSession.url, 303);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}