import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { costGuides, resources } from "../data/guides";
import { Breadcrumbs, FinalCTA } from "../components/Sections";
import SEOHead from "../components/SEOHead";
import CallCTA from "../components/CallCTA";
import NotFound from "./NotFound";
import { siteConfig } from "../config/siteConfig";
export default function Guides() {
  const location = useLocation();
  const { slug } = useParams();
  const cost = location.pathname.startsWith("/cost-guides");
  const base = cost ? "/cost-guides" : "/resources";
  const collection = cost ? costGuides : resources;
  const label = cost ? "Cost Guides" : "Homeowner Guides";
  const guide = collection.find((g) => g.slug === slug);
  if (slug && !guide) return <NotFound />;
  if (guide)
    return (
      <>
        <SEOHead
          title={guide.title}
          description={guide.intro}
          schema={{
            "@type": "Article",
            headline: guide.title,
            description: guide.intro,
            author: { "@type": "Organization", name: siteConfig.brandName },
            publisher: { "@id": siteConfig.siteUrl + "/#organization" },
            mainEntityOfPage: siteConfig.siteUrl + base + "/" + guide.slug,
          }}
        />
        <div className="container">
          <Breadcrumbs items={[{ label, to: base }, { label: guide.title }]} />
        </div>
        <header className="article-header container narrow">
          <span className="eyebrow">
            {cost ? "UNDERSTAND THE SCOPE BEFORE THE PRICE" : guide.category}
          </span>
          <h1>{guide.title}</h1>
          <p>{guide.intro}</p>
          <div className="article-byline">
            <BookOpen size={17} /> A homeowner planning guide · Call Home
            Project Pros
          </div>
        </header>
        <div className="container detail-layout article-layout">
          <article className="prose">
            {cost && (
              <div className="notice">
                <strong>Every project has its own price.</strong>
                <p>
                  We do not publish unverified price ranges. Location,
                  materials, property conditions, labor, complexity, and
                  provider terms all affect the final estimate.
                </p>
              </div>
            )}
            <nav className="article-toc" aria-label="In this guide">
              <h2>In this guide</h2>
              {guide.sections.map(([title], i) => (
                <a href={`#section-${i}`} key={title}>
                  {String(i + 1).padStart(2, "0")} <span>{title}</span>
                  <ArrowRight size={16} />
                </a>
              ))}
            </nav>
            {guide.sections.map(([title, body], i) => (
              <section id={`section-${i}`} key={title}>
                <h2>{title}</h2>
                <p>{body}</p>
              </section>
            ))}
            <div className="article-takeaway">
              <span className="eyebrow">YOUR NEXT STEP</span>
              <h2>Bring a clear brief to the conversation.</h2>
              <ul className="check-list">
                <li>
                  <Check /> Write down your goals and questions.
                </li>
                <li>
                  <Check /> Compare the same scope across estimates.
                </li>
                <li>
                  <Check /> Confirm qualifications and terms before hiring.
                </li>
              </ul>
            </div>
            {guide.service && (
              <Link to={`/services/${guide.service}`} className="text-link">
                Explore this home service <ArrowRight size={17} />
              </Link>
            )}
          </article>
          <aside className="detail-sidebar">
            <span className="eyebrow">FROM READING TO PLANNING</span>
            <h3>Have a project in mind?</h3>
            <p>Start with a conversation or tell us what you have planned.</p>
            <CallCTA location="guide_call" service={guide.service} />
            <Link
              className="button secondary"
              to={`/quote${guide.service ? "?service=" + guide.service : ""}`}
            >
              Request a Free Quote <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
        <section className="section container">
          <h2>Keep exploring</h2>
          <div className="guide-preview-grid guide-related">
            {collection
              .filter((g) => g.slug !== slug)
              .slice(0, 3)
              .map((g, i) => (
                <GuideCard guide={g} base={base} index={i} key={g.slug} />
              ))}
          </div>
        </section>
      </>
    );
  return (
    <>
      <SEOHead
        title={label}
        description={
          cost
            ? "Understand the factors behind roofing, HVAC, window, and bathroom project costs. Learn how to compare written estimates."
            : "Practical guides to planning home improvements, comparing options, and asking useful questions before hiring a provider."
        }
      />
      <div className="page-intro">
        <div className="container">
          <Breadcrumbs items={[{ label }]} />
          <span className="eyebrow">
            {cost
              ? "BETTER QUESTIONS. CLEARER ESTIMATES."
              : "KNOW A LITTLE MORE. PLAN A LITTLE BETTER."}
          </span>
          <h1>
            {cost ? (
              <>
                A clearer view of
                <br />
                your project’s costs.
              </>
            ) : (
              <>
                Helpful reading.
                <br />
                Confident next steps.
              </>
            )}
          </h1>
          <p>
            {cost
              ? "Understand what goes into an estimate, what can change the scope, and how to compare your options."
              : "Practical advice for the repairs, upgrades, and improvements that make your home yours."}
          </p>
        </div>
      </div>
      <section className="section container">
        {cost && (
          <div className="notice guide-notice">
            <strong>No one-size-fits-all price tags.</strong>
            <p>
              Our guides explain cost factors, without unverified dollar
              amounts. Request a project-specific written estimate from a
              provider.
            </p>
          </div>
        )}
        <div className="guide-preview-grid">
          {collection.map((g, i) => (
            <GuideCard guide={g} base={base} index={i} key={g.slug} />
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
function GuideCard({ guide, base, index }) {
  return (
    <Link className="guide-preview" to={`${base}/${guide.slug}`}>
      <span className="guide-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="eyebrow">
        {guide.category || "PROJECT COST FACTORS"}
      </span>
      <h3>{guide.title}</h3>
      <p>{guide.intro}</p>
      <span className="text-link">
        Read the guide <ArrowRight size={16} />
      </span>
    </Link>
  );
}
