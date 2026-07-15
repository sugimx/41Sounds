import ContactSection from "@/sections/ContactSection";
import CTASection from "@/sections/CTASection";
import FeaturesSection from "@/sections/FeaturesSection";
import HeroSection from "@/sections/HeroSection";
import PricingSection from "@/sections/PricingSection";
import TestimonialSection from "@/sections/TestimonialSection";
import MaintenanceBanner from "@/components/MaintenanceBanner";

export default function Page() {
    return (
        <div style={{ width: '100%' }}>
            <MaintenanceBanner />
            <HeroSection />
            <PricingSection />
            <FeaturesSection />
            <TestimonialSection />
            <ContactSection />
            <CTASection />
        </div>
    );
}