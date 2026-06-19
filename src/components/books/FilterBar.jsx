"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Magnifier, ChevronDown, ArrowRotateLeft } from "@gravity-ui/icons";

const genres = [
  "All Genres",
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Mystery",
  "Biography",
  "Self-Help",
  "Poetry",
];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "All Genres");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  const updateParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "All Genres") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({ search });
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenre(value);
    updateParams({ genre: value });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    updateParams({ sort: value });
  };

  const handlePriceApply = () => {
    updateParams({ minPrice, maxPrice });
  };

  const handleReset = () => {
    setSearch("");
    setGenre("All Genres");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    router.push(pathname);
  };

  const hasActiveFilters =
    search || genre !== "All Genres" || minPrice || maxPrice || sort !== "newest";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {/* Search — সব সাইজেই পুরো রো জুড়ে */}
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Magnifier className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or writer..."
            className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Genre */}
        <div className="relative">
          <select
            value={genre}
            onChange={handleGenreChange}
            className="w-full appearance-none rounded-2xl border border-slate-200 px-4 py-3 pr-9 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Min/Max Price */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full min-w-0 rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
          <span className="shrink-0 text-slate-400">–</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full min-w-0 rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={handleSortChange}
            className="w-full appearance-none rounded-2xl border border-slate-200 px-4 py-3 pr-9 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Apply + Reset */}
        <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
          <button
            onClick={handlePriceApply}
            className="flex-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Apply
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              title="Reset all filters"
              className="flex shrink-0 items-center justify-center rounded-2xl border border-slate-200 p-3 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <ArrowRotateLeft className="size-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}