import { Metadata } from "next";
import Banner from "./components/home/hero";
import Companies from "./components/home/companies";
import TrustBadges from "./components/home/trust";
import Work from "./components/home/work";
import Table from "./components/home/table";
import Features from "./components/home/features";
import KPIs from "./components/home/kpis";
import Integrations from "./components/home/integrations";
import Why from "./components/home/why";
import Security from "./components/home/security";
import Faq from "./components/home/faq";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "Frota360",
};

export default function Home() {
  return (
    <main>
    <Banner/>
    <Companies />
    <TrustBadges />
    <Integrations />
    <Work />
    <Table />
    <Features />
    <KPIs />
    <Why />
    <Security />
      <Faq />
      <ContactForm />
    </main>
  );
}
