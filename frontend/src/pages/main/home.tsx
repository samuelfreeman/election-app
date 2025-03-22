import CallToAction from "@/components/sections/cta";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import ServicesCarousel from "@/components/sections/services";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ServicesCarousel />
      <Features />
      <CallToAction />
    </main>
  );
}
