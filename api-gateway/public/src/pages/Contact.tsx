import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import ContactFAQ from "@/components/ContactFAQ";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <ContactFAQ />
    </div>
  );
};

export default Contact;