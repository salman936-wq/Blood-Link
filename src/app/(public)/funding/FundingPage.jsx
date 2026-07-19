"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HeartHandshake, Wallet, X } from "lucide-react";
import { handlePaymentStripe } from "@/lib/api/stripe/pay";

export default function FundingPage({email}) {
  const [amount, setAmount] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Dummy Data
  const donations = [
    {
      _id: 1,
      name: "Salman Shaikh",
      image: "https://i.pravatar.cc/100?img=1",
      amount: 500,
      transactionId: "TXN-124578",
      date: "20 Jul 2026",
    },
    {
      _id: 2,
      name: "Hafsa",
      image: "https://i.pravatar.cc/100?img=2",
      amount: 1000,
      transactionId: "TXN-124579",
      date: "19 Jul 2026",
    },
    {
      _id: 3,
      name: "Rakib",
      image: "https://i.pravatar.cc/100?img=3",
      amount: 300,
      transactionId: "TXN-124580",
      date: "18 Jul 2026",
    },
    {
      _id: 4,
      name: "Karim",
      image: "https://i.pravatar.cc/100?img=4",
      amount: 700,
      transactionId: "TXN-124581",
      date: "17 Jul 2026",
    },
  ];

  const handlePayment = (payAmount) => {

    handlePaymentStripe(payAmount, email)
    reset();
    setAmount("");
    document.getElementById("fund_modal").close();
  };

  const onSubmit = () => {
    handlePayment(Number(amount));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blood Donation Funding</h1>
          <p className="text-base-content/70 mt-2">
            Help us keep saving lives by supporting our platform ❤️
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("fund_modal").showModal()
          }
        >
          <Wallet size={18} />
          Add Fund
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-base-300 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Donor</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-11 rounded-full">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                    </div>
                  </div>
                </td>

                <td className="font-bold text-success">
                  ৳ {item.amount}
                </td>

                <td>{item.transactionId}</td>

                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="join">
          <button className="join-item btn">Previous</button>
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">Next</button>
        </div>
      </div>

      {/* Modal */}
      <dialog id="fund_modal" className="modal">
        <div className="modal-box">

          {/* Close */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3">
              <X size={18} />
            </button>
          </form>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <HeartHandshake className="text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Add Fund</h2>
              <p className="text-sm text-base-content/60">
                Support Blood Donation Platform
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="label">
                <span className="label-text font-medium">
                  Donation Amount (৳)
                </span>
              </label>

              <input
                type="number"
                placeholder="Minimum ৳10"
                className={`input input-bordered w-full ${
                  errors.amount ? "input-primary" : ""
                }`}
                value={amount}
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 10,
                    message: "Minimum amount is ৳10",
                  },
                  onChange: (e) => setAmount(e.target.value),
                })}
              />

              {errors.amount && (
                <p className="text-primary text-sm mt-2">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <button className="btn btn-primary w-full">
              <Wallet size={18} />
              Donate Now
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}