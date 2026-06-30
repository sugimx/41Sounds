'use client'
import SectionTitle from "@/components/SectionTitle"
import { pricingData } from "@/data/pricing";
import { IPricing } from "@/types";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";

const checkoutUrls = {
    'Gold': 'https://payments.cashfree.com/forms/goldseat',
    'Platinum': 'https://payments.cashfree.com/forms/platinumseat',
    'VIP': 'https://payments.cashfree.com/forms/vipseat',
    'MVIP': 'https://payments.cashfree.com/forms/specialvipseat',
};

export default function PricingSection() {

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

                            <a
                                href={checkoutUrls[plan.name as keyof typeof checkoutUrls]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block w-full py-2.5 mt-7 rounded-md font-medium text-center transition-all cursor-pointer ${plan.color === 'white'
                                        ? 'bg-pink-600 text-white hover:bg-pink-700'
                                        : 'bg-white text-pink-600 hover:bg-slate-200'
                                    }`}
                            >
                                Book Now
                            </a>

                        </motion.div>
                    )
                })}
            </div>

        </div>
    );
}
