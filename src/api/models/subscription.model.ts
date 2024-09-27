import { Schema, model, Document } from 'mongoose';
import { SubscriptionInterface, SubscriptionStatus } from '../../shared/interfaces/subscription.interface';

// Interface extending Document and SubscriptionInterface for Mongoose
export interface SubscriptionDocument extends Document, SubscriptionInterface {}

// Mongoose schema for the Subscription model
const subscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      required: true,
    },
    paypalSubscriptionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Mongoose model for the Subscription schema
export const Subscription = model<SubscriptionDocument>('Subscription', subscriptionSchema);