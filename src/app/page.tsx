import { SelectionProvider } from "@/lib/selection-context";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PlansSection } from "@/components/PlansSection";
import { EsimSection } from "@/components/EsimSection";
import { ZoneSection } from "@/components/ZoneSection";
import { NumberPicker } from "@/components/NumberPicker";
import { Footer } from "@/components/Footer";
import { OrderCart } from "@/components/OrderCart";
import { FloatingCartButton } from "@/components/FloatingCartButton";

export default function Home() {
  return (
    <SelectionProvider>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <NumberPicker />
        <PlansSection />
        <EsimSection />
        <ZoneSection />
      </main>
      <Footer />
      <OrderCart />
      <FloatingCartButton />
    </SelectionProvider>
  );
}
