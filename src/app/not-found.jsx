import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      {/* Floating book illustration */}
      <div className="relative mb-8 select-none">
        {/* Book SVG */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          {/* Book spine */}
          <rect x="52" y="20" width="8" height="80" rx="2" fill="#f59e0b" />
          {/* Left cover */}
          <rect x="18" y="20" width="34" height="80" rx="3" fill="#fbbf24" />
          {/* Right cover */}
          <rect x="60" y="20" width="34" height="80" rx="3" fill="#f59e0b" />
          {/* Pages left */}
          <rect x="22" y="24" width="26" height="72" rx="1" fill="#fef9ee" />
          {/* Pages right */}
          <rect x="64" y="24" width="26" height="72" rx="1" fill="#fef3c7" />
          {/* Lines on left page */}
          <rect x="26" y="32" width="18" height="2" rx="1" fill="#d97706" opacity="0.4" />
          <rect x="26" y="38" width="14" height="2" rx="1" fill="#d97706" opacity="0.4" />
          <rect x="26" y="44" width="18" height="2" rx="1" fill="#d97706" opacity="0.4" />
          <rect x="26" y="50" width="10" height="2" rx="1" fill="#d97706" opacity="0.4" />
          {/* Lines on right page */}
          <rect x="68" y="32" width="18" height="2" rx="1" fill="#d97706" opacity="0.4" />
          <rect x="68" y="38" width="14" height="2" rx="1" fill="#d97706" opacity="0.4" />
          <rect x="68" y="44" width="18" height="2" rx="1" fill="#d97706" opacity="0.4" />
          <rect x="68" y="50" width="10" height="2" rx="1" fill="#d97706" opacity="0.4" />
          {/* Shadow */}
          <ellipse cx="60" cy="108" rx="30" ry="5" fill="#e2e8f0" />
        </svg>

        {/* 404 badge */}
        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full rotate-12">
          404
        </div>
      </div>

      {/* Text */}
      <h1 className="text-4xl sm:text-5xl font-black text-slate-800 text-center leading-tight">
        Page Not Found
      </h1>
      <p className="mt-4 text-slate-500 text-center max-w-sm text-base leading-relaxed">
        Looks like this chapter doesn&apos;t exist. The page you&apos;re looking for
        may have been moved or deleted.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors duration-200"
        >
          Go Home
        </Link>
        <Link
          href="/books"
          className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition-colors duration-200"
        >
          Browse Ebooks
        </Link>
      </div>
    </div>
  );
}