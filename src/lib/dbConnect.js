import mongoose from 'mongoose';

const MONGO_URI_DEVELOPMENT = process.env.MONGO_URI_DEVELOPMENT

if (!MONGO_URI_DEVELOPMENT) {
    throw new Error(

    )
}

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGO_URI_DEVELOPMENT, opts).then((mongoose) => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect;