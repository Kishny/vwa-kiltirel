import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const RateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true, index: true },
  count: { type: Number, default: 0 },
  firstAttemptAt: { type: Date, required: true },
  blockedUntil: { type: Date, default: null },
  // TTL index : MongoDB supprime automatiquement les documents expirés
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
});

export type RateLimitType = InferSchemaType<typeof RateLimitSchema>;

const RateLimit: Model<RateLimitType> =
  models.RateLimit || model<RateLimitType>("RateLimit", RateLimitSchema);

export default RateLimit;
