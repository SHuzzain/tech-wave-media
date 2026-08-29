import { Section, Container, Prose } from "@/components/craft";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tech Wave Media.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="grid md:grid-cols-2 gap-12">
        <Prose>
          <h1>We’re Always Here For You</h1>
          <p>
            Want to explore what {siteConfig.site_name} can do for you? Fill out
            the form, and one of our editors will get in touch with you shortly.
          </p>
          <h3>Address</h3>
          <p>Add your office address in WordPress or this page when the client supplies it.</p>
          <p>
            Email:{" "}
            <a href={`mailto:${siteConfig.contact_email}`}>
              {siteConfig.contact_email}
            </a>
          </p>
          <p>
            Guest posts:{" "}
            <a href={`mailto:${siteConfig.guest_post_email}`}>
              {siteConfig.guest_post_email}
            </a>
          </p>
        </Prose>
        <ContactForm />
      </Container>
    </Section>
  );
}
