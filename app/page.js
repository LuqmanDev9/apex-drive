import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Featured from "@/components/Featured";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Featured />
      <HowItWorks />
    </main>
  );
}