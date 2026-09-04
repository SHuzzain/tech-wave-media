import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { Section, Container } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { SeoAuditForm } from "@/components/seo-audit-form";
import {
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Target,
  FileCheck2,
  ShieldCheck,
  Coins,
  Globe2,
  BookOpen,
  ArrowRight,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SEO Company in Chennai That Turns Searches into Sales | Tech Wave Media",
  description:
    "Looking for a trusted SEO company in Chennai? Tech Wave Media delivers top Google rankings, quality lead generation, local SEO, technical SEO, and flexible packages.",
  alternates: {
    canonical: "/seo-company-in-chennai",
  },
  openGraph: {
    title: "SEO Company in Chennai That Turns Searches into Sales",
    description:
      "Looking for a trusted SEO company in Chennai? We deliver top rankings, local SEO, technical audits, and high-converting organic traffic.",
    url: `${siteConfig.site_domain}/seo-company-in-chennai`,
    type: "website",
    images: [
      {
        url: "/seo/local-seo-online-marketing-strategies.jpg",
        width: 1200,
        height: 630,
        alt: "SEO Company in Chennai - Tech Wave Media",
      },
    ],
  },
};

const trustPoints = [
  {
    icon: Award,
    title: "5+ Years of Experience",
    description:
      "With over 5+ years of industry experience, we continue to learn, adapt, and strengthen our SEO expertise.",
  },
  {
    icon: TrendingUp,
    title: "Focused on Top Rankings",
    description:
      "Our goal is to improve your search visibility by targeting valuable keywords that generate relevant traffic and conversions.",
  },
  {
    icon: Target,
    title: "Quality Lead Generation",
    description:
      "We develop effective marketing strategies that connect your business with potential customers and generate qualified leads.",
  },
  {
    icon: Users,
    title: "Customer Satisfaction",
    description:
      "Our dedicated team works closely with every client to deliver reliable service and a smooth overall experience.",
  },
  {
    icon: Sparkles,
    title: "In-Depth SEO Expertise",
    description:
      "From technical SEO and backlinks to keyword research and content optimization, we provide complete SEO support.",
  },
  {
    icon: FileCheck2,
    title: "Transparent Agreements",
    description:
      "Our service terms are clear and transparent. Eligible projects include a six-month cancellation period when expectations are not met.",
  },
  {
    icon: ShieldCheck,
    title: "Performance Assurance",
    description:
      "We do not make unrealistic promises. Instead, we focus on measurable strategies designed to deliver sustainable SEO growth.",
  },
  {
    icon: Coins,
    title: "Complete Value",
    description:
      "While some agencies prioritize high pricing, we focus on delivering practical solutions and maximum value for your investment.",
  },
  {
    icon: Globe2,
    title: "Additional Digital Services",
    description:
      "Beyond SEO, we offer digital marketing and multi-channel solutions that help customers discover your business across platforms.",
  },
  {
    icon: BookOpen,
    title: "Industry Knowledge",
    description:
      "We regularly study search engine updates, market trends, and SEO best practices to develop effective and compliant strategies.",
  },
];

const services = [
  {
    id: "local-seo",
    tag: "Target Nearby Customers",
    title: "Local SEO",
    image: "/seo/local-seo-online-marketing-strategies.jpg",
    imageAlt: "Local SEO online marketing strategies for Chennai businesses",
    description:
      "Connect with nearby customers through our professional Local SEO services. We optimize your Google Business Profile, maintain accurate NAP information, build local authority, and improve click-through rates to increase your visibility in location-based searches.",
    subText:
      "Our approach includes local keyword targeting, citation building, on-page optimization, quality backlinks, and localized content marketing. As a trusted local SEO expert in Chennai, Tech Wave Media helps businesses strengthen their local presence, attract relevant customers, and generate qualified leads.",
    benefits: [
      "Google Business Profile optimization & audit",
      "Accurate NAP (Name, Address, Phone) consistency",
      "Local map pack rankings & citation building",
      "Hyper-local keyword research & localized content",
    ],
  },
  {
    id: "on-page-seo",
    tag: "Search-Engine & User Friendly",
    title: "On-Page SEO",
    image: "/seo/on-page-seo.jpg",
    imageAlt: "On-Page SEO optimization and website content strategy",
    description:
      "On-page SEO ensures that every page of your website is optimized for both search engines and visitors. We improve metadata, HTML structure, images, videos, internal links, and schema markup to build search-friendly pages.",
    subText:
      "Our services also cover keyword research, content optimization, SEO audits, analytics tracking, and technical issue resolution. Using modern methods and customized strategies, we help your website achieve better rankings while providing a seamless user experience.",
    benefits: [
      "Title tag, meta descriptions & heading structure hierarchy",
      "Semantic HTML, internal linking & image alt optimization",
      "Comprehensive keyword mapping & content freshness",
      "Structured data & schema markup implementation",
    ],
  },
  {
    id: "off-page-seo",
    tag: "High-Authority Digital PR",
    title: "Off-Page SEO",
    image: "/seo/off-page-seo.jpg",
    imageAlt: "Off-Page SEO link building and backlink acquisition",
    description:
      "Strengthen your website’s credibility and authority with our professional off-page SEO services. We conduct detailed SEO audits, monitor backlink profiles, and apply ethical link-building strategies to improve your online presence.",
    subText:
      "Our approach focuses on earning high-quality backlinks, supporting local and global SEO efforts, and promoting your brand across relevant, authoritative platforms. These strategies help your business build trust, increase search visibility, and achieve sustainable online growth.",
    benefits: [
      "White-hat contextual backlink acquisition",
      "Brand mentions & digital PR campaigns",
      "Competitor backlink gap analysis & monitoring",
      "High-authority guest posts & niche placements",
    ],
  },
  {
    id: "technical-seo",
    tag: "Core Web Vitals & Speed",
    title: "Technical SEO",
    image: "/seo/technical-seo.jpg",
    imageAlt: "Technical SEO audit, crawlability, and performance optimization",
    description:
      "Our technical SEO services improve your website’s performance, loading speed, and overall user experience. We conduct comprehensive audits, optimize crawling and indexing, enhance mobile usability, and address issues affecting conversions.",
    subText:
      "By resolving technical errors and applying modern optimization practices, Tech Wave Media ensures your website works effectively for search engines and visitors, leading to better rankings, smoother navigation, and increased engagement.",
    benefits: [
      "Core Web Vitals & Google PageSpeed optimization",
      "XML Sitemap, Robots.txt & canonical tags",
      "Crawl error fixes, redirect audits & 404 resolution",
      "Mobile-first usability & structured navigation",
    ],
  },
];

const pricingPlans = [
  {
    name: "SEO Silver",
    badge: "Foundational Optimization",
    description:
      "Ideal for small businesses and startups looking to establish solid search engine foundations.",
    popular: false,
    features: [
      "Target up to 5 Keywords",
      "Complete Website Review",
      "Detailed Keyword Research",
      "Content Improvement",
      "Competitor Performance Review",
      "Meta Information Enhancement",
      "Website Performance Improvement",
      "Initial Ranking Assessment",
      "Analytics and Webmaster Integration",
      "Internal Linking and Site Structure",
      "Robots.txt and Sitemap Review",
      "Contact Information Schema Setup",
      "Access 5+ More Services",
    ],
  },
  {
    name: "SEO Gold",
    badge: "Most Popular",
    description:
      "Designed for growing brands that need competitive search supremacy and fast lead flow.",
    popular: true,
    features: [
      "Target up to 10 Keywords",
      "In-Depth Website Review",
      "Advanced Keyword Research",
      "Content Quality Enhancement",
      "Competitor Performance Review",
      "Backlink Profile Review",
      "Website Performance Improvement",
      "Meta Information Enhancement",
      "Analytics and Webmaster Integration",
      "Local Map Pack & Citation Optimization",
      "Monthly Growth & Ranking Reports",
      "Schema Markup & Rich Snippets",
      "Access 8+ More Services",
    ],
  },
  {
    name: "SEO Platinum",
    badge: "Comprehensive Dominance",
    description:
      "Full-scale search domination, aggressive link building, and dedicated multi-channel SEO.",
    popular: false,
    features: [
      "Target up to 15 Keywords",
      "Advanced Keyword Research",
      "Complete Website Review",
      "Content Quality Enhancement",
      "High-Authority Ethical Link Building",
      "Technical Core Web Vitals Optimization",
      "Full Competitor Dissection",
      "Dedicated SEO Account Manager",
      "Bi-Weekly Progress & Strategy Calls",
      "Conversion Rate Optimization (CRO)",
      "Access 10+ More Services",
    ],
  },
];

const faqs = [
  {
    q: "1. What does an SEO company in Chennai do?",
    a: "An SEO company improves your website’s visibility on search engines through keyword research, content optimization, technical SEO, link building, and performance tracking.",
  },
  {
    q: "2. How Much Does SEO Cost in Chennai?",
    a: "SEO costs depend on your website size, industry competition, target keywords, and required services. Most agencies offer customized monthly packages based on business goals.",
  },
  {
    q: "3. How long does SEO take to show results?",
    a: "SEO generally takes three to six months to show noticeable improvements. Competitive keywords may require more time to achieve stable rankings and organic traffic growth.",
  },
  {
    q: "4. How do I choose the best SEO company in Chennai?",
    a: "Choose an agency with proven experience, transparent reporting, ethical SEO methods, customized strategies, and a clear understanding of your industry and target audience.",
  },
  {
    q: "5. Why is SEO important for my business?",
    a: "SEO helps potential customers find your business when searching online. It can improve visibility, attract relevant visitors, generate qualified leads, and support long-term growth.",
  },
  {
    q: "6. What SEO services does Tech Wave Media provide?",
    a: "Tech Wave Media provides keyword research, on-page SEO, off-page SEO, technical SEO, local SEO, content optimization, website audits, link building, and performance reporting.",
  },
  {
    q: "7. Can SEO help my local business in Chennai?",
    a: "Yes. Local SEO can improve your visibility in Google Maps and location-based searches, helping nearby customers discover, contact, and visit your business.",
  },
  {
    q: "8. What is the difference between SEO and Google Ads?",
    a: "SEO builds organic visibility over time, while Google Ads provides paid visibility for selected keywords. Using both can support immediate reach and sustainable growth.",
  },
  {
    q: "9. Can you guarantee first-page Google rankings?",
    a: "No reliable SEO agency can guarantee a specific Google ranking. However, a well-planned strategy can significantly improve your website’s visibility, traffic, and search performance.",
  },
  {
    q: "10. Which Is the Best SEO Company in Chennai?",
    a: "Tech Wave Media is a trusted SEO company in Chennai, offering customized strategies, transparent reporting, and affordable SEO solutions. Our services help businesses improve search visibility, attract qualified traffic, and achieve sustainable online growth.",
  },
];

export default function SeoCompanyInChennaiPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "SEO Company in Chennai",
    provider: {
      "@type": "Organization",
      name: siteConfig.site_name,
      url: siteConfig.site_domain,
    },
    areaServed: {
      "@type": "City",
      name: "Chennai",
    },
    description:
      "Industry-leading SEO company in Chennai delivering local SEO, on-page SEO, off-page link building, and technical SEO audits.",
  };

  return (
    <article className="min-h-screen">
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24 border-b">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                ✨ Tech Wave Media • SEO Agency in Chennai
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              SEO Company in Chennai That Turns Searches into Sales
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We are Tech Wave Media, an SEO agency in Chennai dedicated to
              helping your customers find and connect with your business online.
              We use future-ready SEO strategies designed for traditional search
              engines and AI-powered search experiences.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="font-semibold shadow-md">
                <a href="#consultation">
                  Get Your Free SEO Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#services">Explore SEO Services</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro / Looking for Trusted SEO Company */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Results-Driven Growth
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-1 text-foreground">
                  Looking for a Trusted SEO Company in Chennai?
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Tech Wave Media is an industry-leading SEO company in Chennai,
                offering professional SEO services at affordable prices. We help
                businesses improve their search engine rankings, attract relevant
                visitors, and achieve greater value from their digital marketing
                investment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Search engine optimization is a broad process that includes both
                on-page and off-page strategies. Our on-page SEO services focus
                on improving website content, keywords, headings, internal links,
                and other essential elements. Our off-page SEO approach
                strengthens your website’s authority through strategic and
                relevant link-building activities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Technical SEO forms the foundation of our work. We understand
                that keywords alone cannot deliver lasting rankings without
                valuable content and a properly optimized website. Therefore, we
                identify technical issues, improve search visibility, and guide
                your website in the right direction.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At Tech Wave Media, as one of the trusted and best SEO companies in
                Chennai, we create effective marketing strategies that help
                customers discover and connect with your business online. We also
                prepare a detailed website audit report to identify improvement
                opportunities and build a clear roadmap for sustainable growth.
              </p>
              <div className="pt-2">
                <Button asChild>
                  <a href="#consultation">
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Talk to Our SEO Experts
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border shadow-xl bg-card">
              <Image
                src="/seo/why-choose-tech-wave-media.jpg"
                alt="Why Businesses Trust Tech Wave Media for SEO Services"
                width={700}
                height={900}
                className="w-full h-auto object-cover max-h-[550px]"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Choose Tech Wave Media */}
      <Section className="py-16 md:py-24 bg-muted/30 border-y">
        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Why Choose Tech Wave Media
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Why Businesses Trust Tech Wave Media for SEO Services
            </h2>
            <p className="text-muted-foreground">
              We combine data-driven optimization, transparent reporting, and
              ethical white-hat tactics to bring real organic ROI to your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Comprehensive SEO Services */}
      <Section id="services" className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <Badge variant="outline" className="text-primary font-medium">
              Comprehensive Capabilities
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Our Comprehensive SEO Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Tech Wave Media, we provide a complete range of professional SEO
              services to improve your online visibility, attract relevant
              traffic, and support sustainable business growth. Whether you run a
              small local business or a global enterprise, we create customized
              SEO strategies based on your specific goals.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => {
              const isReversed = index % 2 !== 0;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
                    isReversed ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={isReversed ? "lg:col-start-2" : ""}>
                    <div className="space-y-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {service.tag}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.subText}
                      </p>

                      <div className="pt-2">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">
                          Key Highlights:
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {service.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4">
                        <Button asChild>
                          <a href="#consultation">
                            Talk to Our SEO Experts
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`relative rounded-2xl overflow-hidden border shadow-lg bg-card ${
                      isReversed ? "lg:col-start-1" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      width={800}
                      height={530}
                      className="w-full h-auto object-cover max-h-[420px] transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Flexible SEO Plans */}
      <Section className="py-16 md:py-24 bg-muted/30 border-y">
        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Clear & Scalable Packages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Flexible SEO Plans for Every Business
            </h2>
            <p className="text-muted-foreground">
              Select an SEO plan that aligns with your business requirements,
              marketing goals, and budget. From foundational website optimization
              to comprehensive growth strategies, our packages help increase
              search visibility and deliver consistent growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border bg-card p-8 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? "border-primary shadow-xl ring-2 ring-primary/20"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="border-t my-6" />

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Package Inclusions:
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Button
                    asChild
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full font-semibold"
                  >
                    <a href="#consultation">Get Started</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Consultation Form Section */}
      <Section id="consultation" className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary">Tech Wave Media</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Let’s Grow Your Business Online
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Connect with our SEO experts and discover the right strategy to
                improve your search rankings, attract relevant traffic, and
                generate qualified leads.
              </p>
              <div className="rounded-xl border bg-muted/40 p-5 space-y-3">
                <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                  SEO Company in Chennai
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get a comprehensive website audit and competitor analysis report
                  completely free of charge. No obligations.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-xl">
                <div className="mb-6 space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">
                    Get Your Free SEO Consultation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ready to improve your rankings and attract more customers?
                    Share your business requirements with our SEO experts.
                  </p>
                </div>
                <SeoAuditForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section className="py-16 md:py-24 bg-muted/30 border-t">
        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Clear answers to the most common questions about our SEO services in
              Chennai.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border bg-card p-5 transition-colors [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-foreground text-base list-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 transition group-open:rotate-180 shrink-0 text-muted-foreground">
                    ▾
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </article>
  );
}
