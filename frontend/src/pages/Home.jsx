import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  PhoneCall,
  HeartHandshake,
  ListChecks,
  LockKeyhole,
} from "lucide-react";
import CallCTA from "../components/CallCTA";
import ServicesGrid from "../components/ServicesGrid";
import {
  SectionHeading,
  TrustStrip,
  CallBanner,
  HowItWorks,
  FinalCTA,
  FAQAccordion,
} from "../components/Sections";
import { homeFAQs } from "../data/content";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" /> BIG IDEAS. BETTER HOMES.
            </span>
            <h1>
              Your home project
              <br />
              starts with <span>one call.</span>
            </h1>
            <p>
              From a much-needed repair to the upgrade you’ve been dreaming of.
              Let’s help you take the next step toward the right home service
              professional.
            </p>
            <div className="hero-actions">
              <CallCTA location="hero_call" />
              <Link to="/quote" className="button secondary">
                Get Free Quotes <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-checks">
              <span>
                <Check />
                Simple requests
              </span>
              <span>
                <Check />
                No obligation
              </span>
              <span>
                <Check />
                Your choice
              </span>
            </div>
            <div className="hero-bottom-note">
              <span className="small-house">
                <ShieldCheck size={21} />
              </span>
              <p>
                A little guidance. A clear next step.
                <br />
                <strong>More confidence in your home project.</strong>
              </p>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="/images/home-hero.webp"
              width="1100"
              height="1000"
              alt="Welcoming American home with a landscaped front yard and covered porch"
              fetchPriority="high"
            />
            <div className="image-label">
              <span /> FOR THE PLACE YOU CALL HOME
            </div>
            <div className="hero-float">
              <span className="float-icon">
                <HouseIcon />
              </span>
              <div>
                <strong>Your next project, simplified.</strong>
                <span>One home. So many possibilities.</span>
              </div>
              <Check className="float-check" size={18} />
            </div>
            <div className="image-corner-label">
              A fresh start begins here <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </section>
      <TrustStrip />
      <section className="section container" id="popular-services">
        <SectionHeading
          eyebrow="A LITTLE REPAIR. A BIG TRANSFORMATION."
          title="What’s next for your home?"
          text="Find the right starting point for the project you have in mind."
          action={{ to: "/services", label: "View all services" }}
        />
        <ServicesGrid />
      </section>
      <CallBanner />
      <HowItWorks />
      <section className="section container why-grid">
        <div className="why-image">
          <img
            src="/images/kitchen.webp"
            width="800"
            height="900"
            loading="lazy"
            alt="Bright, thoughtfully finished kitchen with a spacious island"
          />
          <div className="why-image-caption">
            Built around your home.
            <br />
            <strong>And the way you live.</strong>
          </div>
        </div>
        <div>
          <span className="eyebrow">A MORE HUMAN WAY TO START</span>
          <h2>
            Home projects can be complex.
            <br />
            <span className="text-green">Getting started shouldn’t be.</span>
          </h2>
          <p className="intro">
            We bring a little clarity to your next home project, with
            straightforward information and an easy way to ask for help.
          </p>
          <div className="value-list">
            {[
              [
                PhoneCall,
                "A conversation comes first",
                "Prefer talking it through? Phone assistance is at the heart of our approach.",
              ],
              [
                ListChecks,
                "One place for your project list",
                "Explore repairs, replacements, and improvements across your home.",
              ],
              [
                HeartHandshake,
                "You stay in the driver’s seat",
                "Review the options, ask questions, and choose whether to move forward.",
              ],
              [
                LockKeyhole,
                "A transparent next step",
                "Understand the request process before sharing your project details.",
              ],
            ].map(([Icon, title, text]) => (
              <div key={title}>
                <span>
                  <Icon size={21} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link className="text-link" to="/about">
            Get to know Call Home Project Pros <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="quote-teaser section" id="get-quote">
        <div className="container quote-teaser-grid">
          <div>
            <span className="eyebrow">PREFER TO START ONLINE?</span>
            <h2>
              Your next project.
              <br />A few simple steps.
            </h2>
            <p>
              Tell us where your project is and what you have in mind. We’ll
              guide you through the details, one step at a time.
            </p>
            <span className="privacy-note">
              <ShieldCheck size={19} /> No payment details needed to request an
              estimate.
            </span>
          </div>
          <div className="quote-start-card">
            <span className="step-tag">LET’S START WITH YOUR LOCATION</span>
            <h3>Where’s your home project?</h3>
            <p>Your ZIP code helps identify your project area.</p>
            <form action="/quote" method="get">
              <label htmlFor="hero-zip">ZIP code</label>
              <div className="zip-row">
                <input
                  id="hero-zip"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="[0-9]{5}"
                  maxLength="5"
                  placeholder="Enter ZIP code"
                  required
                />
                <button className="button primary" type="submit">
                  Get Started <ArrowRight size={18} />
                </button>
              </div>
            </form>
            <small>Simple request. No obligation to hire.</small>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="A LITTLE KNOW-HOW GOES A LONG WAY"
          title="Plan with more confidence."
          text="Practical reading for thoughtful home improvements."
          action={{ to: "/resources", label: "All homeowner guides" }}
        />
        <div className="guide-preview-grid">
          {[
            [
              "01",
              "Before you begin",
              "Questions to ask before hiring a contractor",
              "questions-to-ask-a-contractor",
            ],
            [
              "02",
              "Know your options",
              "Repair or replace? Thinking through your HVAC project",
              "repair-vs-replace-hvac",
            ],
            [
              "03",
              "Make a plan",
              "A more prepared start to your bathroom remodel",
              "preparing-for-a-bathroom-remodel",
            ],
          ].map(([n, tag, title, slug]) => (
            <Link className="guide-preview" key={n} to={`/resources/${slug}`}>
              <span className="guide-number">{n}</span>
              <span className="eyebrow">{tag}</span>
              <h3>{title}</h3>
              <span className="text-link">
                Read the guide <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-grid">
          <div>
            <span className="eyebrow">GOOD QUESTIONS. CLEAR ANSWERS.</span>
            <h2>
              A little clarity
              <br />
              before you begin.
            </h2>
            <p>Here’s what to know about taking your next step with us.</p>
            <Link className="text-link" to="/faq">
              See all FAQs <ArrowRight size={17} />
            </Link>
          </div>
          <FAQAccordion items={homeFAQs.slice(0, 5)} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
function HouseIcon() {
  return <ShieldCheck size={27} />;
}
