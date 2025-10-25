import { Metadata } from "next";
import Banner from "./components/home/hero";
import Why from "./components/home/why";
import Modules from "./components/home/modules";
import Features from "./components/home/features";
import CaseStudy from "./components/home/case";
import KPIs from "./components/home/kpis";
import Security from "./components/home/security";
import FinalCTA from "./components/home/final-cta";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "Frota360",
};

export default function Home() {
  return (
    <main>
      <Banner />
      <Why />
      <Modules />
      <CaseStudy />
      <KPIs />
      <Security />
      <ContactForm />
    </main>
  );
}
