// src/lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global cache for mongoose connection to prevent multiple connections
 * in development mode (hot reloading)
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connects to MongoDB using mongoose with connection pooling
 * @returns Promise of mongoose instance
 */
export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    // Return existing connection
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable command buffering (recommended for serverless)
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        cached.promise = null; // Reset promise so next call retries
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Optional: handle connection events for monitoring
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});