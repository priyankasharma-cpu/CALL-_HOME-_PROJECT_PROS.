const env = import.meta.env;
export const siteConfig = {
  brandName: "Call Home Project Pros",
  siteUrl: (env.VITE_SITE_URL || "https://callhomeprojectpros.com").replace(
    /\/$/,
    "",
  ),
  phoneNumber: env.VITE_PHONE_NUMBER || "",
  supportEmail: env.VITE_SUPPORT_EMAIL || "",
  businessHours: "",
  socialLinks: {},
  apiUrl: (env.VITE_API_URL || "").replace(/\/$/, ""),
  leadsEnabled: env.VITE_LEADS_ENABLED === "true",
  consentText: env.VITE_CONSENT_TEXT || "",
  consentVersion: env.VITE_CONSENT_VERSION || "",
  testimonials: [],
};
export const phoneHref = /^\+?1?[2-9]\d{2}[2-9]\d{6}$/.test(
  siteConfig.phoneNumber.replace(/[^\d+]/g, ""),
)
  ? `tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}`
  : null;
