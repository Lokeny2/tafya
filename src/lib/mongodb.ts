import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in your .env.local file");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Next.js reloads modules constantly in dev. Without this cache, every
// hot reload would open a brand-new connection instead of reusing one —
// like hanging up and redialing for every single call instead of just
// keeping one line open. Atlas's free tier has a limited connection
// pool, so this isn't just tidiness, it avoids a real error.
declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string);
  }
  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}