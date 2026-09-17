import mongoose from "mongoose";
import { app } from "./app.js";
import { config } from "./config/env.js";
if (!config.mongoUri) {
  console.error("MONGODB_URI is required. See backend/.env.example.");
  process.exit(1);
}
if (
  config.production &&
  config.origins.some((origin) => !origin.startsWith("https://"))
) {
  console.error("Production CLIENT_URL values must use HTTPS.");
  process.exit(1);
}
if (config.leadsEnabled && (!config.consentVersion || !config.consentText)) {
  console.error(
    "Approved CONSENT_TEXT and CONSENT_VERSION are required before enabling collection.",
  );
  process.exit(1);
}
try {
  await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 10000 });
  await Promise.all(
    Object.values(mongoose.models).map((model) => model.init()),
  );
  const server = app.listen(config.port, () =>
    console.info(`Lead API listening on port ${config.port}`),
  );
  let stopping = false;
  async function stop() {
    if (stopping) return;
    stopping = true;
    const timer = setTimeout(() => process.exit(1), 10000).unref();
    server.close(async () => {
      await mongoose.disconnect();
      clearTimeout(timer);
      process.exit(0);
    });
  }
  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);
} catch (error) {
  console.error("API startup failed:", error.name);
  process.exit(1);
}
