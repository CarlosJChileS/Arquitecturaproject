import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import ContactFAQ from "@/components/ContactFAQ";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactInfo />
        <ContactFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
