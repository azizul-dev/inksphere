"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";

export default function AddNewBooks() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    price: "",
    coverImage: "",
    shortDescription: "",
    content: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, genre, price, coverImage, shortDescription, content } =
      formData;

    if (
      !title.trim() ||
      !genre.trim() ||
      !price ||
      !coverImage.trim() ||
      !shortDescription.trim() ||
      !content.trim()
    ) {
      toast.error("All fields are required ❌");
      return;
    }

    console.log("BOOK DATA:", formData);

    toast.success("Book Published Successfully 🚀");

    setFormData({
      title: "",
      genre: "",
      price: "",
      coverImage: "",
      shortDescription: "",
      content: "",
      status: "draft",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}

        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-1.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(249,115,22,0.25)]">
            Writer Studio
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(249,115,22,0.35)]">
            Publish New Ebook
          </h1>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Share your stories with readers around the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Book Information */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
            <h2 className="mb-6 text-xl font-bold">Book Information</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Book Title
                </label>

                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="The Last Ember of Valtheria"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Genre
                  </label>

                  <input
                    required
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Fantasy"
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Price ($)
                  </label>

                  <input
                    required
                    type="number"
                    min="1"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="9.99"
                    className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Cover Image URL
                </label>

                <input
                  required
                  type="text"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {formData.coverImage && (
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <Image
                    src={formData.coverImage}
                    alt="Cover Preview"
                    width={500}
                    height={350}
                    className="h-64 w-full object-cover rounded-2xl"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Short Description
                </label>

                <textarea
                  required
                  rows={4}
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Write a compelling summary of your ebook..."
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>

          {/* Content */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-bold">Ebook Content</h2>

              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
                {formData.content.length} Characters
              </div>
            </div>

            <textarea
              required
              rows={18}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Start writing your ebook content..."
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          {/* Publishing Settings */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
            <h2 className="mb-6 text-xl font-bold">Publishing Settings</h2>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            >
              <option value="draft">Save as Draft</option>

              <option value="published">Publish Now</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="h-14 rounded-2xl border border-slate-300 px-8 font-semibold transition-all duration-300 hover:bg-slate-100"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="h-14 p-4 rounded-2xl text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-orange-200"
            >
              Publish Ebook 🚀
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
