'use client'
import SectionTitle from "@/components/SectionTitle"
import { pricingData } from "@/data/pricing";
import { IPricing } from "@/types";
import { CheckIcon, X as XIcon, ShieldAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const checkoutUrls = {
    'Gold': 'https://payments.cashfree.com/forms/goldseat',
    'Platinum': 'https://payments.cashfree.com/forms/platinumseat',
    'VIP': 'https://payments.cashfree.com/forms/vipseat',
    'MVIP': 'https://payments.cashfree.com/forms/specialvipseat',
};

export default function PricingSection() {
    const [selectedPlan, setSelectedPlan] = useState<IPricing | null>(null);
    const [acceptedPolicy, setAcceptedPolicy] = useState(false);

    return (
        <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32 w-full overflow-hidden relative">
            <SectionTitle text1="Pricing" text2="Choose Your Experience" text3="Select from our ticket categories and secure your spot at the most anticipated concert of the year." />

            <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
                {pricingData.map((plan: IPricing, index: number) => {
                    const colorClasses = {
                        'white': 'bg-white text-slate-900 border-slate-300',
                        'dark-yellow': 'bg-yellow-800 text-white border-yellow-800',
                        'navi-blue': 'bg-blue-950 text-white border-blue-800',
                        'dark-pink': 'bg-pink-950 text-white border-pink-800',
                        'deep-purple': 'bg-purple-900 text-white border-purple-800',
                    };
                    const cardColor = colorClasses[plan.color as keyof typeof colorClasses] || 'bg-pink-950/30 text-white border-pink-950';
                    
                    return (
                    <motion.div key={index} className={`w-72 text-center p-6 pb-16 rounded-xl border ${cardColor} ${plan.mostPopular ? 'relative' : ''}`}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        {plan.mostPopular && (
                            <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-pink-400 text-white rounded-full">Most Popular</p>
                        )}
                        <p className="font-semibold">{plan.name}</p>
                        <h1 className="text-3xl font-semibold">₹{plan.price}<span className={`font-normal text-sm ${plan.color === 'white' ? 'text-slate-500' : 'text-gray-400'}`}>/{plan.period}</span></h1>
                        <ul className={`list-none mt-6 space-y-2 text-left ${plan.color === 'white' ? 'text-slate-700' : 'text-slate-300'}`}>
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <CheckIcon className={`size-4.5 shrink-0 ${plan.color === 'white' ? 'text-pink-600' : 'text-pink-400'}`} />
                                    <p className="text-sm truncate">{feature}</p>
                                </li>
                            ))}
                        </ul>
                        
                        <button 
                            type="button" 
                            onClick={() => {
                                setSelectedPlan(plan);
                                setAcceptedPolicy(false);
                            }}
                            className={`w-full py-2.5 mt-7 rounded-md font-medium transition-all cursor-pointer ${
                                plan.color === 'white' 
                                ? 'bg-pink-600 text-white hover:bg-pink-700' 
                                : 'bg-white text-pink-600 hover:bg-slate-200'
                            }`}
                        >
                            Book Now
                        </button>
                    </motion.div>
                )})}
            </div>

            {/* Animated Policy Agreement Checkout Modal */}
            <AnimatePresence>
                {selectedPlan && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPlan(null)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
                        />

                        {/* Modal Dialog Content */}
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-pink-900/40 bg-slate-950 p-6 text-white shadow-2xl z-10"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedPlan(null)}
                                className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <XIcon className="size-5" />
                            </button>

                            {/* Modal Header */}
                            <div className="flex items-center gap-3 mb-6 pr-8 border-b border-slate-900 pb-4">
                                <div className="p-2 rounded-lg bg-pink-950/50 border border-pink-800/30">
                                    <ShieldAlert className="size-6 text-pink-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold bg-linear-to-r from-white to-pink-300 bg-clip-text text-transparent">Terms and Conditions Agreement</h3>
                                    <p className="text-xs text-gray-400">Please accept terms to complete your purchase</p>
                                </div>
                            </div>

                            {/* Plan Summary */}
                            <div className="mb-6 rounded-xl bg-pink-950/20 border border-pink-900/20 p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">Category</span>
                                        <h4 className="text-base font-bold text-white mt-0.5">{selectedPlan.name} Tier</h4>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400">Total Price</span>
                                        <h4 className="text-base font-black text-pink-400 mt-0.5">₹{selectedPlan.price}</h4>
                                    </div>
                                </div>
                            </div>

                            {/* Refund Policy Body */}
                            <div className="mb-6 max-h-40 overflow-y-auto rounded-xl bg-slate-900/50 border border-slate-800 p-4 text-xs text-gray-300 space-y-3">
                                <p className="font-semibold text-white">Refunds & Cancellations Terms:</p>
                                <ol className="list-decimal pl-4 space-y-2">
                                    <li>
                                        <strong className="text-pink-400">All ticket sales are final:</strong> Once purchased, tickets cannot be cancelled, returned, or refunded under any circumstances, except in case of event cancellation or rescheduling.
                                    </li>
                                    <li>
                                        <strong className="text-pink-400">Event Cancellation:</strong> Refunds will be processed if the concert is completely cancelled.
                                    </li>
                                    <li>
                                        <strong className="text-pink-400">Event Rescheduling:</strong> If the event is rescheduled, your ticket will automatically be valid for the new date. If you cannot attend on the rescheduled date, you are eligible for a full refund.
                                    </li>
                                </ol>
                                <p className="text-[10px] text-gray-400 mt-2">
                                    Read the full <a href="/refunds" target="_blank" className="text-pink-400 hover:text-pink-300 underline font-semibold transition-colors">Refund & Cancellation Policy</a>.
                                </p>
                            </div>

                            {/* Consent Checkbox */}
                            <div className="mb-6 flex items-start gap-3">
                                <div className="flex items-center h-5 mt-0.5">
                                    <input
                                        id="modal-consent"
                                        type="checkbox"
                                        checked={acceptedPolicy}
                                        onChange={(e) => setAcceptedPolicy(e.target.checked)}
                                        className="size-5 rounded border-pink-800 text-pink-600 bg-slate-950 focus:ring-pink-500 focus:ring-opacity-50 cursor-pointer accent-pink-600 transition-colors"
                                    />
                                </div>
                                <label htmlFor="modal-consent" className="text-xs text-gray-300 select-none cursor-pointer leading-tight">
                                    I agree to the <span className="font-semibold text-white">Terms and Conditions</span> and acknowledge that all ticket sales are final.
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlan(null)}
                                    className="flex-1 rounded-lg border border-slate-800 py-2.5 text-xs font-semibold text-gray-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <a
                                    href={checkoutUrls[selectedPlan.name as keyof typeof checkoutUrls]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        // Close modal after redirection delay
                                        setTimeout(() => setSelectedPlan(null), 500);
                                    }}
                                    className={`flex-2 block ${!acceptedPolicy ? 'pointer-events-none' : ''}`}
                                >
                                    <button
                                        type="button"
                                        disabled={!acceptedPolicy}
                                        className={`w-full rounded-lg py-2.5 text-xs font-bold text-white transition-all shadow-md ${
                                            acceptedPolicy 
                                            ? 'bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-pink-500/20 active:scale-98 cursor-pointer' 
                                            : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                                        }`}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
