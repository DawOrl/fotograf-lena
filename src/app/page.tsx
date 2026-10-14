import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Offer from "@/components/Offer";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Masthead />
      <main id="tresc">
        <Hero />
        <Gallery />
        <About />
        <Offer />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
