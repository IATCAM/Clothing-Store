import Browse from "@/components/browse/Browse";
import HeroSection from "@/components/heroSection/HeroSection";
import NewArrivals from "@/components/newArrivals/NewArrivals";
import Testimonial from "@/components/testimonial/Testimonial";
import TopSelling from "@/components/topSelling/TopSelling";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <NewArrivals />
      <TopSelling />
      <Browse />
      <Testimonial />
    </div>
  );
}
