import { Link } from "react-router-dom";
import {
  ArrowRight,
  PhoneCall,
  ClipboardList,
  MessagesSquare,
  Check,
  ShieldCheck,
  HeartHandshake,
  ListChecks,
  House,
} from "lucide-react";
import CallCTA from "./CallCTA";
export function SectionHeading({ eyebrow, title, text, action }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action && (
        <Link className="text-link" to={action.to}>
          {action.label}
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function TrustStrip() {
  return (
    <div className="trust-strip container">
      {[
        ["One place, many projects", House],
        ["A straightforward process", ListChecks],
        ["No-obligation requests", ShieldCheck],
        ["You choose what’s right", HeartHandshake],
      ].map(([text, Icon]) => (
        <div key={text}>
          <Icon size={23} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
export function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="LESS GUESSWORK. MORE PROGRESS."
          title="From to-do to let’s do this."
          text="A simple path to your next home improvement."
        />
        <div className="steps">
          {[
            [
              PhoneCall,
              "01",
              "Tell us about your project",
              "Give us a call or share a few details online. Start with what your home needs.",
            ],
            [
              ClipboardList,
              "02",
              "We help match your needs",
              "Your service, location, and project details help guide the next step, where providers are available.",
            ],
            [
              MessagesSquare,
              "03",
              "Discuss your estimate",
              "Talk through the scope with a provider, ask questions, and decide what works for you.",
            ],
          ].map(([Icon, n, title, text]) => (
            <div className="step" key={n}>
              <div className="step-top">
                <span className="step-icon">
                  <Icon size={28} />
                </span>
                <span className="step-number">{n}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="how-bottom">
          <span>
            <Check size={17} /> No pressure to move forward. You’re in control.
          </span>
          <CallCTA compact location="how_it_works_call" />
        </div>
      </div>
    </section>
  );
}
export function CallBanner() {
  return (
    <section className="container call-banner">
      <span className="banner-icon">
        <PhoneCall size={34} />
      </span>
      <div>
        <h2>Not sure where to start?</h2>
        <p>Let’s talk it through. Tell us what’s on your home project list.</p>
      </div>
      <CallCTA location="after_services_call" label="Talk About Your Project" />
    </section>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS AT HOME</span>
        <h2>
          Big plans. Small repairs.
          <br />
          Let’s take the first step.
        </h2>
        <p>Tell us what you have in mind for your home.</p>
        <div className="cta-row">
          <CallCTA location="final_cta_call" />
          <Link to="/quote" className="button light">
            Request a Free Quote <ArrowRight size={18} />
          </Link>
        </div>
        <span className="final-note">
          Your project. Your timeline. Your decision.
        </span>
      </div>
    </section>
  );
}
export function FAQAccordion({ items }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span>+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((item, i) => (
        <span key={item.label}>
          <span aria-hidden="true">/</span>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current={i === items.length - 1 ? "page" : undefined}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
