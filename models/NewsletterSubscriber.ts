import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

/**
 * Schema
 */
const NewsletterSubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    firstName: {
      type: String,
      trim: true,
      default: "",
    },

    source: {
      type: String,
      trim: true,
      default: "newsletter_form_site",
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true, // 🔥 important pour tes filtres admin
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
      index: true, // 🔥 utile pour stats / tri
    },

    unsubscribedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 🔐 Protection double index (important avec Mongo)
 */
NewsletterSubscriberSchema.index({ email: 1 }, { unique: true });

/**
 * Types TS automatiques
 */
export type NewsletterSubscriberType = InferSchemaType<typeof NewsletterSubscriberSchema>;

/**
 * Model typé
 */
const NewsletterSubscriber: Model<NewsletterSubscriberType> =
  models.NewsletterSubscriber ||
  model<NewsletterSubscriberType>("NewsletterSubscriber", NewsletterSubscriberSchema);

export default NewsletterSubscriber;