import { PhoneCall } from "lucide-react";
import { phoneHref, siteConfig } from "../config/siteConfig";
import { track } from "../utils/tracking";
export default function CallCTA({
  location = "page_call",
  service,
  compact = false,
  label = "Call for a Free Estimate",
  className = "",
}) {
  const content = (
    <>
      <span className="call-icon">
        <PhoneCall size={compact ? 19 : 23} />
      </span>
      <span>
        {compact ? "Call Now" : label}
        <small>
          {phoneHref ? siteConfig.phoneNumber : "Phone line coming soon"}
        </small>
      </span>
    </>
  );
  return phoneHref ? (
    <a
      href={phoneHref}
      className={`call-cta ${compact ? "compact" : ""} ${className}`}
      aria-label={`${label}: ${siteConfig.phoneNumber}`}
      onClick={() => {
        track("phone_click", { location, service });
        if (location === "hero_call")
          track("hero_phone_click", { location, service });
        if (location === "mobile_sticky_call")
          track("sticky_phone_click", { location, service });
      }}
    >
      {content}
    </a>
  ) : (
    <button
      type="button"
      className={`call-cta ${compact ? "compact" : ""} ${className}`}
      disabled
      aria-label="Phone assistance is not available yet"
    >
      {content}
    </button>
  );
}
