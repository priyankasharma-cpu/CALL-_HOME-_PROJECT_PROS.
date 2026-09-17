import { createHash } from "node:crypto";
import mongoose from "mongoose";
import { config } from "../config/env.js";
export function submissionController(Model) {
  return async (req, res, next) => {
    try {
      if (!config.leadsEnabled || !config.consentVersion || !config.consentText)
        return res
          .status(503)
          .json({
            success: false,
            message:
              "Online requests are not available yet. Please check back soon.",
            error: { code: "COLLECTION_DISABLED" },
          });
      if (req.validated.consentVersion !== config.consentVersion)
        return res
          .status(409)
          .json({
            success: false,
            message:
              "The request disclosure has changed. Refresh this page before submitting.",
            error: { code: "CONSENT_VERSION_MISMATCH" },
          });
      if (mongoose.connection.readyState !== 1)
        return res
          .status(503)
          .json({
            success: false,
            message:
              "The request service is temporarily unavailable. Please try again later.",
            error: { code: "SERVICE_UNAVAILABLE" },
          });
      const key = req.get("Idempotency-Key");
      if (
        !key ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          key,
        )
      )
        return res
          .status(400)
          .json({
            success: false,
            message: "A valid request identifier is required.",
            error: { code: "INVALID_REQUEST_ID" },
          });
      const { website, ...payload } = req.validated;
      const hash = createHash("sha256")
        .update(
          JSON.stringify(
            Object.keys(payload)
              .sort()
              .map((k) => [k, payload[k]]),
          ),
        )
        .digest("hex");
      const reply = (record, status) => {
        if (record.payloadHash !== hash)
          return res
            .status(409)
            .json({
              success: false,
              message:
                "This request identifier was already used. Refresh the form to start a new request.",
              error: { code: "REQUEST_CONFLICT" },
            });
        return res
          .status(status)
          .json({
            success: true,
            message: "Your request has been saved.",
            data: { reference: record._id.toString() },
          });
      };
      const existing = await Model.findOne({ idempotencyKey: key }).select(
        "_id payloadHash",
      );
      if (existing) return reply(existing, 200);
      try {
        const record = await Model.create({
          ...payload,
          idempotencyKey: key,
          payloadHash: hash,
          consentText: config.consentText,
          consentAt: new Date(),
          userAgent: (req.get("User-Agent") || "").slice(0, 500),
        });
        return reply(record, 201);
      } catch (error) {
        if (error.code === 11000) {
          const record = await Model.findOne({ idempotencyKey: key }).select(
            "_id payloadHash",
          );
          if (record) return reply(record, 200);
        }
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };
}
