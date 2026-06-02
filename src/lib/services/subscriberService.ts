// src/lib/services/subscriberService.ts
import { dbConnect } from "@/lib/db";
import Subscriber from "@/lib/models/Subscriber";
import { subscribeSchema } from "@/lib/validations/subscriberSchema";
import type { SubscribeInput } from "@/lib/validations/subscriberSchema";
import { toPlainObject, toPlainObjects } from "@/lib/utils/mongoose";

/**
 * Create a new newsletter subscriber (public).
 * If already exists and inactive, reactivates.
 */
export async function createSubscriber(data: SubscribeInput) {
  await dbConnect();
  const validated = subscribeSchema.parse(data);
  const existing = await Subscriber.findOne({ email: validated.email });
  if (existing) {
    if (!existing.isActive) {
      existing.isActive = true;
      await existing.save();
      return toPlainObject(existing);
    }
    throw new Error("This email is already subscribed");
  }
  const subscriber = await Subscriber.create({
    email: validated.email,
    isActive: true,
  });
  return toPlainObject(subscriber);
}

/**
 * Get paginated list of active subscribers (admin).
 */
export async function getSubscribers(page = 1, limit = 20) {
  await dbConnect();
  const skip = (page - 1) * limit;
  const [subscribers, total] = await Promise.all([
    Subscriber.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Subscriber.countDocuments({ isActive: true }),
  ]);

  return {
    data: toPlainObjects(subscribers),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
}

/**
 * Delete a subscriber by ID (admin).
 */
export async function deleteSubscriber(id: string) {
  await dbConnect();
  const result = await Subscriber.findByIdAndDelete(id).lean();
  return result ? { ...result, _id: String(result._id) } : null;
}

/**
 * Unsubscribe by email (public).
 */
export async function unsubscribeByEmail(email: string) {
  await dbConnect();
  const result = await Subscriber.findOneAndUpdate(
    { email },
    { isActive: false },
    { new: true }
  ).lean();
  return result ? { ...result, _id: String(result._id) } : null;
}