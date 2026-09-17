import "dotenv/config";
export const config = {
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGODB_URI || "",
  origins: (process.env.CLIENT_URL || "http://127.0.0.1:5173")
    .split(",")
    .map((s) => s.trim()),
  production: process.env.NODE_ENV === "production",
  leadsEnabled: process.env.LEADS_ENABLED === "true",
  consentVersion: process.env.CONSENT_VERSION || "",
  consentText: process.env.CONSENT_TEXT || "",
  trustProxy: Number(process.env.TRUST_PROXY) || 0,
};
