import { CustomerStorySection, FeatureSection, HeroSection, SupportSection } from "@/templates/landing-page/sections";


export function LandingPage() {
    return (
        <article className="flex flex-col gap-10 md:gap-20">
            <HeroSection />
            <FeatureSection />
            <SupportSection />
            <CustomerStorySection />
        </article>
    )
}