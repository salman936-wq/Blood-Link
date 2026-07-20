"use client";
import { handlePaymentStripe } from '@/lib/api/stripe/pay';
import { HeartHandshake, Wallet, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddFund = ({email}) => {

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
        <div>

            <button
                className="btn btn-primary"
                onClick={() =>
                    document.getElementById("fund_modal").showModal()
                }
            >
                <Wallet size={18} />
                Add Fund
            </button>

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
                                className={`input input-bordered w-full ${errors.amount ? "input-primary" : ""
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
};

export default AddFund;