import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  PhoneCall,
  MessageSquare,
  Check,
} from "lucide-react";
import {
  Breadcrumbs,
  FAQAccordion,
  HowItWorks,
  FinalCTA,
} from "../components/Sections";
import SEOHead from "../components/SEOHead";
import CallCTA from "../components/CallCTA";
import { homeFAQs } from "../data/content";
import { siteConfig } from "../config/siteConfig";
import ContactForm from "../components/ContactForm";
export default function Information() {
  const { pathname } = useLocation();
  const kind = pathname.slice(1);
  const title = {
    about: "About Call Home Project Pros",
    contact: "Let’s Talk About Your Home Project",
    faq: "Frequently Asked Questions",
    "how-it-works": "How Home Project Requests Work",
    "privacy-policy": "Privacy Policy",
    terms: "Terms of Use",
  }[kind];
  const legal = kind === "privacy-policy" || kind === "terms";
  return (
    <>
      <SEOHead
        title={title}
        description={
          legal
            ? "Business-specific policy information and publication status for Call Home Project Pros."
            : kind === "faq"
              ? "Understand estimate requests, provider availability, phone assistance, and how the project connection process works."
              : "Learn how Call Home Project Pros helps homeowners explore services, plan improvements, and take their next step."
        }
        noindex={legal}
      />
      <div className="container">
        <Breadcrumbs items={[{ label: title }]} />
      </div>
      {kind === "about" ? (
        <>
          <section className="container about-hero">
            <div>
              <span className="eyebrow">FOR THE PLACE YOU CALL HOME</span>
              <h1>
                A clearer start.
                <br />A more confident
                <br />
                <span className="text-green">homeowner.</span>
              </h1>
              <p>
                Every home has a next chapter. We’re here to help you figure out
                where to begin.
              </p>
            </div>
            <img
              src="/images/contractors.webp"
              alt="Professionals reviewing plans at a home renovation site; illustrative stock photograph"
              width="1000"
              height="700"
            />
          </section>
          <section className="section container narrow prose">
            <h2>A little guidance goes a long way.</h2>
            <p>
              Call Home Project Pros is built around a simple idea: homeowners
              deserve a straightforward way to explore home services and start a
              project conversation. That might mean understanding a roof repair,
              planning a kitchen update, or asking the right questions about
              heating and cooling.
            </p>
            <h2>We help you take the next step.</h2>
            <p>
              Our service directory and homeowner guides help you clarify your
              needs. A project request brings together your service, location,
              timing, and contact details so it can be handled according to the
              disclosure shown before submission. Availability varies; a request
              does not guarantee a provider match.
            </p>
            <h2>We’re a connection platform, not a contractor.</h2>
            <p>
              Call Home Project Pros does not perform or supervise home
              improvement work. You choose whether to hire a provider and agree
              directly with them on the scope, price, schedule, and terms.
              Verify qualifications, references, licensing, and insurance before
              work begins.
            </p>
            <h2>Why start with a conversation?</h2>
            <p>
              A form can collect the basics. A conversation gives you room to
              explain what matters, ask questions, and work through uncertainty.
              That is why phone assistance is central to our approach, alongside
              a step-by-step online request.
            </p>
            <Link className="text-link" to="/services">
              Explore the services <ArrowRight size={18} />
            </Link>
          </section>
          <HowItWorks />
          <FinalCTA />
        </>
      ) : kind === "how-it-works" ? (
        <>
          <div className="page-intro compact-intro">
            <div className="container">
              <span className="eyebrow">ONE STEP AT A TIME</span>
              <h1>
                Less guesswork.
                <br />A clear way forward.
              </h1>
              <p>
                Learn what to expect before starting your home project request.
              </p>
            </div>
          </div>
          <HowItWorks />
          <section className="section container narrow prose">
            <h2>What helps us understand your project?</h2>
            <ul className="check-list">
              <li>
                <Check /> Your project’s ZIP code and service category
              </li>
              <li>
                <Check /> A brief description and preferred timing
              </li>
              <li>
                <Check /> Your relationship to the property
              </li>
              <li>
                <Check /> Contact details and the consent you choose to provide
              </li>
            </ul>
            <h2>What happens next is your choice.</h2>
            <p>
              A request is not a commitment to hire. Provider availability and
              response times vary. Discuss fees before arranging a visit, ask
              for a written scope, and independently evaluate any provider you
              consider.
            </p>
            <Link className="button primary" to="/quote">
              Start a Project Request <ArrowRight size={18} />
            </Link>
          </section>
          <FinalCTA />
        </>
      ) : kind === "faq" ? (
        <>
          <header className="page-intro compact-intro">
            <div className="container">
              <span className="eyebrow">LET’S CLEAR A FEW THINGS UP</span>
              <h1>
                Good questions.
                <br />
                Straightforward answers.
              </h1>
              <p>
                What to know about the platform, your request, and the next
                step.
              </p>
            </div>
          </header>
          <section className="section container narrow">
            <FAQAccordion items={homeFAQs} />
          </section>
          <FinalCTA />
        </>
      ) : kind === "contact" ? (
        <>
          <div className="page-intro compact-intro">
            <div className="container">
              <span className="eyebrow">WE’RE GLAD YOU’RE HERE</span>
              <h1>
                What’s on your
                <br />
                home project list?
              </h1>
              <p>
                Choose the best starting point for your question or project.
              </p>
            </div>
          </div>
          <section className="section container contact-layout">
            <div className="contact-options">
              <div>
                <PhoneCall size={26} />
                <h2>Talk about your project.</h2>
                <p>
                  A phone conversation can help you explain your needs and ask
                  questions.
                </p>
                <CallCTA location="contact_page_call" />
              </div>
              <div>
                <MessageSquare size={26} />
                <h2>Have a project in mind?</h2>
                <p>
                  Use our guided request to share your location, service, and
                  project details.
                </p>
                <Link className="text-link" to="/quote">
                  Start a Project Request <ArrowRight size={17} />
                </Link>
              </div>
              <div>
                <Mail size={26} />
                <h2>General questions</h2>
                {siteConfig.supportEmail ? (
                  <a
                    className="text-link"
                    href={`mailto:${siteConfig.supportEmail}`}
                  >
                    {siteConfig.supportEmail}
                  </a>
                ) : (
                  <p>
                    Our support contact details are being finalized. The inquiry
                    form will open when those details and our privacy
                    information are ready.
                  </p>
                )}
                {siteConfig.businessHours && <p>{siteConfig.businessHours}</p>}
              </div>
            </div>
            <ContactForm />
          </section>
        </>
      ) : (
        <Legal kind={kind} />
      )}
    </>
  );
}
function Legal({ kind }) {
  const privacy = kind === "privacy-policy";
  return (
    <section className="section container narrow legal-page prose">
      <span className="eyebrow">POLICY PUBLICATION STATUS</span>
      <h1>{privacy ? "Privacy Policy" : "Terms of Use"}</h1>
      <div className="notice">
        <strong>Draft — business-specific details pending.</strong>
        <p>
          This page is a clearly marked configuration placeholder, not a
          finalized legal policy. Online submissions remain disabled until the
          operating business supplies and approves the applicable disclosures.
        </p>
      </div>
      <h2>
        {privacy
          ? "Information to be finalized"
          : "Operating details to be finalized"}
      </h2>
      <p>
        {privacy
          ? "Before this service opens for requests, this page needs the legal business identity, privacy contact, collected information, purposes of use, service-provider sharing, retention practices, applicable rights, and request procedures."
          : "Before launch, this page needs the legal operator’s identity, contact details, applicable service terms, referral relationships, scope of platform responsibilities, and any jurisdiction-specific provisions reviewed for the actual business."}
      </p>
      <h2>{privacy ? "Current site behavior" : "About the platform"}</h2>
      <p>
        {privacy
          ? "The site keeps referral and campaign information in session storage to preserve the current journey. Form entries stay in browser memory until an enabled form is submitted. If optional analytics are configured, a measurement preference is stored on your device and scripts load only after you allow them. Hosting providers may process technical request data according to their own policies."
          : "Call Home Project Pros is designed as a project connection platform, not a contractor. Service and guide information is general planning content. It does not replace an on-site evaluation or a provider’s written estimate and agreement."}
      </p>
      <h2>
        {privacy
          ? "Project request disclosures"
          : "Independent provider relationships"}
      </h2>
      <p>
        {privacy
          ? "The final request step must describe the actual data-sharing and contact practices before collection is enabled. The approved disclosure and its version must match the backend configuration. No broad marketing consent or partner-sharing terms have been invented for this draft."
          : "Provider availability, response times, pricing, and outcomes are not guaranteed. Any work must be agreed directly with the chosen provider. Homeowners should verify qualifications and review the complete scope and terms before proceeding."}
      </p>
      <h2>Questions</h2>
      <p>
        Support details are configured centrally when supplied by the operating
        business. Visit the contact page for the current availability of contact
        options.
      </p>
      <Link className="text-link" to="/contact">
        Contact information <ArrowRight size={17} />
      </Link>
    </section>
  );
}
