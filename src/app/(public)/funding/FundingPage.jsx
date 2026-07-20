"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { HeartHandshake, Wallet, X } from "lucide-react";
import { handlePaymentStripe } from "@/lib/api/stripe/pay";

export default function FundingPage({email, datas}) {
  const [amount, setAmount] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
<div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-md">
  <table className="table table-zebra">
    <thead className="bg-base-200">
      <tr>
        <th className="text-center">#</th>
        <th>Donor</th>
        <th className="text-center">Amount</th>
        <th>Date</th>
        <th className="text-center">Status</th>
      </tr>
    </thead>

    <tbody>
      {datas.map((item) => (
        <tr key={item.transactionId}>
          {/* Serial */}
          <td className="text-center font-semibold">
            {item.serialNumber}
          </td>

          {/* Donor */}
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-11 rounded-full">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>

              <div>
                <p className="font-semibold">{item.name}</p>
              </div>
            </div>
          </td>

          {/* Amount */}
          <td className="text-center">
            <span className="badge badge-success badge-lg text-white">
              ৳ {item.amount}
            </span>
          </td>

          {/* Date */}
          <td>
            <p>
              {new Date(item.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <span className="text-xs text-gray-500">
              {new Date(item.date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </td>

          {/* Status */}
          <td className="text-center">
            <span className="badge badge-success">
              ✓ Completed
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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