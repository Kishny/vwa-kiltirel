import mongoose, { Schema, model, models } from "mongoose";

const EventInscriptionSchema = new Schema(
  {
    eventSlug: {
      type: String,
      required: true,
      trim: true,
    },
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    adults: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    children: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const EventInscription =
  models.EventInscription ||
  model("EventInscription", EventInscriptionSchema);

export default EventInscription;