"use client";

export default function PurchaseButton({ isOwner, price }) {
  if (isOwner) {
    return (
      <button
        disabled
        title="You can't buy your own book"
        className="flex items-center gap-2 rounded-2xl bg-slate-200 px-6 py-3 font-semibold text-slate-500 cursor-not-allowed"
      >
        You can not buy your own book
      </button>
    );
  }

  return (
    <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-md transition-opacity hover:opacity-90">
      Buy for ${price}
    </button>
  );
}