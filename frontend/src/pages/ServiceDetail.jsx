import { Link, useParams } from "react-router-dom";
import { Check, ArrowRight, ClipboardList } from "lucide-react";
import { getService, relatedServices } from "../data/services";
import CallCTA from "../components/CallCTA";
import { ServiceCard } from "../components/ServicesGrid";
import {
  Breadcrumbs,
  HowItWorks,
  FAQAccordion,
  FinalCTA,
  SectionHeading,
} from "../components/Sections";
import SEOHead from "../components/SEOHead";
import { siteConfig } from "../config/siteConfig";
import NotFound from "./NotFound";
export default function ServiceDetail() {
  const { slug } = useParams();
  const s = getService(slug);
  if (!s) return <NotFound />;
  const related = relatedServices(s);
  return (
    <>
      <SEOHead
        title={s.seoTitle}
        description={s.seoDescription}
        schema={[
          {
            "@type": "Service",
            name: `${s.title} project connection`,
            description: s.seoDescription,
            provider: { "@id": siteConfig.siteUrl + "/#organization" },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteConfig.siteUrl + "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: siteConfig.siteUrl + "/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: s.title,
                item: siteConfig.siteUrl + "/services/" + slug,
              },
            ],
          },
        ]}
      />
      <div className="service-hero">
        <div className="container">
          <Breadcrumbs
            items={[{ label: "Services", to: "/services" }, { label: s.title }]}
          />
          <div className="service-hero-grid">
            <div>
              <span className="eyebrow">{s.category} · PROJECT ASSISTANCE</span>
              <h1>
                {s.title}
                <br />
                <span>starts with a conversation.</span>
              </h1>
              <p>
                {s.shortDescription} Explore your options and request help
                taking the next step.
              </p>
              <div className="hero-actions">
                <CallCTA location={`${slug}_page_call`} service={slug} />
                <Link
                  className="button secondary"
                  to={`/quote?service=${slug}`}
                >
                  Get Free Quotes <ArrowRight size={17} />
                </Link>
              </div>
              <div className="hero-checks">
                <span>
                  <Check />
                  No-obligation request
                </span>
                <span>
                  <Check />
                  Your project. Your choice.
                </span>
              </div>
            </div>
            <div className="service-summary-card">
              <ClipboardList size={30} />
              <h2>What’s on your list?</h2>
              {s.projects.map((p) => (
                <div key={p}>
                  <Check size={17} />
                  {p}
                </div>
              ))}
              <span>Provider availability varies by location.</span>
            </div>
          </div>
        </div>
      </div>
      <section className="section container detail-layout">
        <article>
          <span className="eyebrow">MAKE AN INFORMED START</span>
          <h2>Planning your {s.title.toLowerCase()} project</h2>
          <p>{s.description}</p>
          <h2>Common projects</h2>
          <div className="project-types">
            {s.projects.map((p, i) => (
              <div key={p}>
                <span>0{i + 1}</span>
                <h3>{p}</h3>
                <p>
                  Discuss the current condition, desired result, and scope with
                  a provider. Ask what their assessment includes before
                  scheduling work.
                </p>
              </div>
            ))}
          </div>
          <h2>Signs it may be time to take a closer look</h2>
          <ul className="check-list">
            {s.signs.map((sign) => (
              <li key={sign}>
                <Check />
                {sign}
              </li>
            ))}
          </ul>
          <p>
            These observations are starting points for a professional
            assessment, not a diagnosis. For immediate hazards, contact the
            appropriate emergency service or utility.
          </p>
          <h2>What to consider before you begin</h2>
          <p>{s.advice}</p>
          <p>
            Share photos where useful, set out your priorities, and ask how
            unexpected conditions will be handled. Confirm the scope, payment
            schedule, cleanup, permits, and any warranty in writing.
          </p>
          <h2>What affects the cost?</h2>
          <p>
            Every home is different. A provider can give a more useful estimate
            after understanding your property and the work involved.
          </p>
          <ul className="check-list">
            {s.factors.map((f) => (
              <li key={f}>
                <Check />
                {f}
              </li>
            ))}
          </ul>
          <p>
            Location, labor, project complexity, and the provider’s terms also
            affect pricing. We don’t publish unverified price ranges.
          </p>
          <Link className="text-link" to="/cost-guides">
            Learn how to compare project costs <ArrowRight size={17} />
          </Link>
        </article>
        <aside className="detail-sidebar">
          <span className="eyebrow">TURN PLANS INTO A NEXT STEP</span>
          <h3>Have a {s.title.toLowerCase()} project?</h3>
          <p>Talk through your needs or begin with a few details online.</p>
          <CallCTA location={`${slug}_sidebar_call`} service={slug} />
          <Link className="button secondary" to={`/quote?service=${slug}`}>
            Start a Project Request <ArrowRight size={17} />
          </Link>
          <small>No obligation to hire. Availability varies.</small>
        </aside>
      </section>
      <HowItWorks />
      <section className="section container narrow">
        <SectionHeading
          eyebrow="BEFORE YOU BEGIN"
          title={`${s.title} questions, answered.`}
        />
        <FAQAccordion items={s.faqs} />
      </section>
      {related.length > 0 && (
        <section className="section related-section">
          <div className="container">
            <SectionHeading
              eyebrow="WHILE YOU’RE MAKING PLANS"
              title="Related home services"
            />
            <div className="related-grid">
              {related.map((item) => (
                <ServiceCard service={item} key={item.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
      <FinalCTA />
    </>
  );
}
