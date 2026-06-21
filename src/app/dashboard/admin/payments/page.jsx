import { getAllPublishingFees } from "@/lib/actions/publishingFee";
import { getUserById } from "@/lib/actions/user";
import { getAllPurchases } from "@/lib/api/purchases";
import { requireRole } from "@/lib/core/session";

const PaymentsPage = async () => {
  await requireRole("admin");

  const purchases = await getAllPurchases();
  const publishingFees = await getAllPublishingFees();

  const purchaseTx = await Promise.all(
    purchases.map(async (p) => {
      const user = await getUserById(p.userId);

      return {
        id: p._id,
        type: "Purchase",
        email: user?.email || p.userId,
        amount: p.price,
        date: p.purchaseDate,
        transactionId: p.transactionId,
      };
    })
  );

  const feeTx = publishingFees.map((f) => ({
    id: f._id,
    type: "Publishing Fee",
    email: f.email,
    amount: f.amount,
    date: f.paidAt,
    transactionId: f.transactionId,
  }));

  const allTransactions = [...purchaseTx, ...feeTx].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalRevenue = allTransactions.reduce(
    (sum, t) => sum + (Number(t.amount) || 0),
    0
  );

  const badgeStyle = (type) => {
    switch (type) {
      case "Purchase":
        return "bg-blue-100 text-blue-700 border border-blue-200";

      default:
        return "bg-orange-100 text-orange-700 border border-orange-200";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Transactions
        </h1>

        <p className="mt-2 text-slate-500">
          View all ebook purchases and publishing fees.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Transactions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {allTransactions.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Revenue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-600">
            ${totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Payment Types
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            2
          </h2>
        </div>
      </div>

      {allTransactions.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Transaction ID
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Type
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      User Email
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allTransactions.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs">
                          {t.transactionId || t.id}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle(
                            t.type
                          )}`}
                        >
                          {t.type}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {t.email}
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-semibold text-emerald-600">
                          ${Number(t.amount).toFixed(2)}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {t.date
                          ? new Date(t.date).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile & Tablet Cards */}
          <div className="grid gap-4 lg:hidden">
            {allTransactions.map((t) => (
              <div
                key={t.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle(
                        t.type
                      )}`}
                    >
                      {t.type}
                    </span>

                    <span className="font-bold text-emerald-600">
                      ${Number(t.amount).toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      User Email
                    </p>

                    <p className="mt-1 break-all text-sm text-slate-700">
                      {t.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Transaction ID
                    </p>

                    <p className="mt-1 break-all rounded-lg bg-slate-100 p-2 font-mono text-xs">
                      {t.transactionId || t.id}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3">
                    <span className="text-sm text-slate-500">
                      Date
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {t.date
                        ? new Date(t.date).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400 shadow-sm">
          No transactions found
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;