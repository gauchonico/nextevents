import { Schema, model, models, type Document, type HydratedDocument, type Types } from 'mongoose';

import type { EventDocument } from './event.model';

// Attributes required to create a Booking.
export interface BookingAttrs {
  eventId: Types.ObjectId;
  email: string;
}

// Mongoose document type including timestamps.
export interface BookingDocument extends BookingAttrs, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type BookingHydratedDocument = HydratedDocument<BookingDocument>;

// Simple email validation regex for basic format checking.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true, // Index for faster queries by event.
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(value: string): boolean {
          return EMAIL_REGEX.test(value);
        },
        message: 'Invalid email format.',
      },
    },
  },
  {
    // Automatically manage createdAt and updatedAt fields.
    timestamps: true,
  },
);

// Additional index on eventId (redundant with field-level index but explicit here for clarity).
bookingSchema.index({ eventId: 1 });

// Pre-save hook to ensure the referenced Event exists and to validate email.
bookingSchema.pre<BookingHydratedDocument>('save', async function preSave(next) {
  try {
    // Validate email format defensively in case data bypasses schema validation.
    if (!EMAIL_REGEX.test(this.email)) {
      return next(new Error('Invalid email format.'));
    }

    // Verify that the referenced event exists.
    const EventModel = this.model<EventDocument>('Event');
    const eventExists = await EventModel.exists({ _id: this.eventId });

    if (!eventExists) {
      return next(new Error('Cannot create booking: referenced event does not exist.'));
    }

    return next();
  } catch (error) {
    return next(error as Error);
  }
});

// Export the Booking model, reusing an existing compiled model in dev environments.
export const Booking = (models.Booking as ReturnType<typeof model<BookingDocument>> | undefined) ??
  model<BookingDocument>('Booking', bookingSchema);

export default Booking;
