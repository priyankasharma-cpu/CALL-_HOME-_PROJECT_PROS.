import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  LockKeyhole,
  LoaderCircle,
} from "lucide-react";
import { services, getService } from "../data/services";
import { siteConfig } from "../config/siteConfig";
import { track, getAttribution } from "../utils/tracking";
const timelines = [
  "As soon as possible",
  "Within 30 days",
  "1–3 months",
  "Just researching",
];
const statuses = [
  "Homeowner",
  "Authorized property manager",
  "Tenant with owner permission",
  "Other",
];
const stepTitles = [
  "Where is your project?",
  "What can we help with?",
  "Tell us a little more.",
  "What’s your timeline?",
  "Your connection to the property?",
  "How can you be reached?",
  "Review your request.",
];
const initial = {
  zip: "",
  service: "",
  projectDetails: "",
  projectTimeline: "",
  homeownerStatus: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
  website: "",
};
export default function LeadForm({ initialService = "" }) {
  const [params] = useSearchParams();
  const [values, setValues] = useState(() => ({
    ...initial,
    zip: params.get("zip") || "",
    service: initialService || params.get("service") || "",
  }));
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");
  const submitting = useRef(false);
  const requestId = useRef(crypto.randomUUID());
  const heading = useRef();
  const started = useRef(false);
  const touched = useRef(false);
  const enabled =
    siteConfig.leadsEnabled &&
    siteConfig.consentText &&
    siteConfig.consentVersion;
  useEffect(() => {
    if (touched.current) heading.current?.focus();
  }, [step]);
  const update = (key, value) => {
    if (!started.current) {
      track("quote_started", { service: values.service });
      started.current = true;
    }
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  };
  function validate() {
    if (step === 0 && !/^\d{5}$/.test(values.zip))
      return "Enter a valid 5-digit ZIP code.";
    if (step === 1 && !getService(values.service))
      return "Choose a project type.";
    if (
      step === 2 &&
      (values.projectDetails.trim().length < 10 ||
        values.projectDetails.length > 2000)
    )
      return "Add between 10 and 2,000 characters about your project.";
    if (step === 3 && !timelines.includes(values.projectTimeline))
      return "Choose the timing that best fits your plans.";
    if (step === 4 && !statuses.includes(values.homeownerStatus))
      return "Select your connection to the property.";
    if (step === 5) {
      if (!values.firstName.trim() || !values.lastName.trim())
        return "Enter your first and last name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        return "Enter a valid email address.";
      if (!/^1?[2-9]\d{2}[2-9]\d{6}$/.test(values.phone.replace(/\D/g, "")))
        return "Enter a valid US phone number including its area code.";
    }
    if (step === 6 && !values.consent)
      return "Read the disclosure and check the consent box to submit.";
    return "";
  }
  async function next(e) {
    e.preventDefault();
    if (submitting.current) return;
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    if (step < 6) {
      track("lead_step_completed", { step: step + 1, service: values.service });
      touched.current = true;
      setStep((s) => s + 1);
      return;
    }
    if (!enabled) {
      setError(
        "Online requests are not available yet. Please check back when our request service opens.",
      );
      return;
    }
    submitting.current = true;
    setBusy(true);
    setError("");
    track("lead_submit", { service: values.service });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`${siteConfig.apiUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestId.current,
        },
        body: JSON.stringify({
          ...values,
          consentVersion: siteConfig.consentVersion,
          ...getAttribution(),
        }),
        signal: controller.signal,
      });
      const data = await response
        .json()
        .catch(() => ({
          message: "We could not process the response. Please try again.",
        }));
      if (!response.ok)
        throw new Error(
          data.message || "We couldn’t send your request. Please try again.",
        );
      setReference(data.data?.reference || "");
      setSuccess(true);
      track("lead_success", { service: values.service });
    } catch (err) {
      setError(
        err.name === "AbortError"
          ? "The request is taking longer than expected. You can safely try again."
          : err.message,
      );
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
      setBusy(false);
    }
  }
  if (success)
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={55} />
        <span className="eyebrow">REQUEST RECEIVED</span>
        <h2>You’ve taken the first step.</h2>
        <p>
          Your project request has been saved. Any follow-up will depend on the
          service and provider availability described in your consent
          disclosure.
        </p>
        {reference && <p className="reference">Reference: {reference}</p>}
        <Link to="/resources" className="button primary">
          Explore homeowner guides <ArrowRight size={18} />
        </Link>
      </div>
    );
  return (
    <div className="lead-form">
      <div className="progress-label">
        <span>YOUR HOME PROJECT</span>
        <span>Step {step + 1} of 7</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Project request progress"
        aria-valuemin={1}
        aria-valuemax={7}
        aria-valuenow={step + 1}
      >
        <span style={{ width: `${((step + 1) / 7) * 100}%` }} />
      </div>
      <h2 ref={heading} tabIndex={-1}>
        {stepTitles[step]}
      </h2>
      <p className="form-intro">
        {
          [
            "Start with your ZIP code. Availability varies by service and location.",
            "Choose the main service for this request.",
            "A few useful details help explain what you have in mind. Don’t include sensitive information.",
            "It’s okay if you’re still exploring your options.",
            "This helps clarify who can authorize work on the home.",
            "Use the contact details you want associated with this request.",
            "Confirm your details and read the disclosure before submitting.",
          ][step]
        }
      </p>
      <form onSubmit={next} noValidate aria-busy={busy}>
        {step === 0 && (
          <Field
            label="ZIP code"
            name="zip"
            value={values.zip}
            onChange={update}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="e.g. 90210"
          />
        )}
        {step === 1 && (
          <div className="choice-grid" role="group" aria-label="Project type">
            {services.map((s) => (
              <button
                key={s.slug}
                type="button"
                className={
                  values.service === s.slug ? "choice selected" : "choice"
                }
                aria-pressed={values.service === s.slug}
                onClick={() => update("service", s.slug)}
              >
                {s.title}
                {values.service === s.slug && <Check size={16} />}
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <>
            <div className="question-hint">
              <strong>
                Helpful details for{" "}
                {getService(values.service)?.title.toLowerCase()}
              </strong>
              <p>
                {getService(values.service)?.projects.join(", ")}. Is this a
                repair, replacement, or new installation?
              </p>
            </div>
            <label className="field">
              Project details
              <textarea
                name="projectDetails"
                value={values.projectDetails}
                onChange={(e) => update("projectDetails", e.target.value)}
                rows={5}
                minLength={10}
                maxLength={2000}
                placeholder="Describe the project, the issue you’re noticing, and anything a provider should know."
                required
              />
            </label>
            <span className="character-count">
              {values.projectDetails.length}/2,000
            </span>
          </>
        )}
        {step === 3 && (
          <Choices
            options={timelines}
            name="projectTimeline"
            value={values.projectTimeline}
            update={update}
          />
        )}
        {step === 4 && (
          <Choices
            options={statuses}
            name="homeownerStatus"
            value={values.homeownerStatus}
            update={update}
          />
        )}
        {step === 5 && (
          <>
            <div className="fields-row">
              <Field
                label="First name"
                name="firstName"
                value={values.firstName}
                onChange={update}
                autoComplete="given-name"
                maxLength={80}
              />
              <Field
                label="Last name"
                name="lastName"
                value={values.lastName}
                onChange={update}
                autoComplete="family-name"
                maxLength={80}
              />
            </div>
            <Field
              label="Email address"
              name="email"
              type="email"
              value={values.email}
              onChange={update}
              autoComplete="email"
              maxLength={254}
            />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={update}
              autoComplete="tel"
              maxLength={25}
            />
          </>
        )}
        {step === 6 && (
          <>
            <dl className="review-details">
              <div>
                <dt>Project</dt>
                <dd>
                  {getService(values.service)?.title} · {values.zip}
                </dd>
              </div>
              <div>
                <dt>Details</dt>
                <dd>{values.projectDetails}</dd>
              </div>
              <div>
                <dt>Timing</dt>
                <dd>{values.projectTimeline}</dd>
              </div>
              <div>
                <dt>Property</dt>
                <dd>{values.homeownerStatus}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>
                  {values.firstName} {values.lastName}
                  <br />
                  {values.email}
                  <br />
                  {values.phone}
                </dd>
              </div>
            </dl>
            {enabled ? (
              <label className="consent">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                />
                <span>{siteConfig.consentText}</span>
              </label>
            ) : (
              <div className="notice">
                <strong>Online requests are not open yet.</strong>
                <p>
                  We’re finalizing the request service and its
                  information-sharing disclosure. No information entered here is
                  sent until submission is enabled.
                </p>
              </div>
            )}
            <p className="legal-links">
              Read our <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
              <Link to="/terms">Terms of Use</Link>.
            </p>
          </>
        )}
        <div className="honeypot" aria-hidden="true">
          <label>
            Leave this blank
            <input
              tabIndex={-1}
              name="website"
              value={values.website}
              onChange={(e) => update("website", e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="form-actions">
          {step > 0 && (
            <button
              className="back-button"
              type="button"
              disabled={busy}
              onClick={() => {
                setError("");
                touched.current = true;
                setStep((s) => s - 1);
              }}
            >
              <ArrowLeft size={17} /> Back
            </button>
          )}
          <button
            className="button primary"
            type="submit"
            disabled={busy || (step === 6 && !enabled)}
          >
            {busy ? (
              <>
                <LoaderCircle className="spinner" size={18} /> Sending request…
              </>
            ) : step === 6 ? (
              "Submit My Request"
            ) : (
              <>
                Continue <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
        <div className="form-privacy">
          <LockKeyhole size={14} /> No payment information needed.
        </div>
      </form>
    </div>
  );
}
function Field({ label, name, value, onChange, ...props }) {
  return (
    <label className="field">
      {label}
      <input
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required
        {...props}
      />
    </label>
  );
}
function Choices({ options, name, value, update }) {
  return (
    <div
      className="choice-list"
      role="group"
      aria-label={
        name === "projectTimeline" ? "Project timing" : "Property relationship"
      }
    >
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={value === option ? "choice selected" : "choice"}
          aria-pressed={value === option}
          onClick={() => update(name, option)}
        >
          {option}
          {value === option ? (
            <Check size={18} />
          ) : (
            <span className="radio-circle" />
          )}
        </button>
      ))}
    </div>
  );
}
