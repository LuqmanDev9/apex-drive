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

      <main>
        <Hero />

        <div data-no-animation>
          <FadeIn duration={1} delay={0.1}>
            <About />
          </FadeIn>
        </div>

        <div data-no-animation>
          <FadeIn duration={1}>
            <Featured />
          </FadeIn>
        </div>

        <div data-no-animation>
          <FadeIn duration={1}>
            <HowItWorks />
          </FadeIn>
        </div>
      </main>
    </>
  );
}