import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Featured from "@/components/Featured";
import HowItWorks from "@/components/HowItWorks";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <FadeIn>
        <About />
      </FadeIn>

      <FadeIn>
        <Featured />
      </FadeIn>

      <FadeIn>
        <HowItWorks />
      </FadeIn>
    </>
  );
}