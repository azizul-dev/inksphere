
import AdminCharts from "./AdminCharts";
import { requireRole } from "@/lib/core/session";
import { getAllUsers } from "@/lib/actions/user";
import { getAllBooksAdmin } from "@/lib/api/books";
import { getAllPurchases } from "@/lib/api/purchases";
import { getAllPublishingFees } from "@/lib/actions/publishingFee";

const AdminHomePage = async () => {
  await requireRole("admin");

  const users = await getAllUsers();
  const bookData = await getAllBooksAdmin();
  const books = bookData.books || [];
  const purchases = await getAllPurchases();
  const publishingFees = await getAllPublishingFees();

  // ---- Analytics cards এর হিসাব ----
  const totalUsers = users.filter((u) => u.role === "user").length;
  const totalWriters = users.filter((u) => u.role === "writer").length;
  const totalEbooksSold = books.filter((b) => b.status === "sold").length;

  const purchaseRevenue = purchases.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0
  );
  const feeRevenue = publishingFees.reduce(
    (sum, f) => sum + (Number(f.amount) || 0),
    0
  );
  const totalRevenue = purchaseRevenue + feeRevenue;

  // ---- Monthly sales chart এর ডেটা ----
  const monthlyMap = {};
  purchases.forEach((p) => {
    const date = new Date(p.purchaseDate);
    const key = date.toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });
    monthlyMap[key] = (monthlyMap[key] || 0) + Number(p.price || 0);
  });
  const monthlySales = Object.entries(monthlyMap).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  // ---- Genre pie chart এর ডেটা ----
  const genreMap = {};
  books.forEach((b) => {
    const genre = b.genre || "Unknown";
    genreMap[genre] = (genreMap[genre] || 0) + 1;
  });
  const genreData = Object.entries(genreMap).map(([genre, count]) => ({
    genre,
    count,
  }));

  const cards = [
    { label: "Total Users", value: totalUsers, color: "bg-blue-500" },
    { label: "Total Writers", value: totalWriters, color: "bg-orange-500" },
    {
      label: "Ebooks Sold",
      value: totalEbooksSold,
      color: "bg-green-500",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue}`,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-lg ${card.color} mb-3 opacity-80`}
            />
            <p className="text-gray-500 text-sm">{card.label}</p>
            <h3 className="text-2xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AdminCharts monthlySales={monthlySales} genreData={genreData} />
    </div>
  );
};

export default AdminHomePage;