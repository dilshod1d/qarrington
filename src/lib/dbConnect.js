// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGO_URI_DEVELOPMENT

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_URI_DEVELOPMENT environment variable inside .env.local"
  );
}

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    });
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect