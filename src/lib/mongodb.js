import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI_DEVELOPMENT
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client
let clientPromise

if (!process.env.MONGO_URI_DEVELOPMENT) {
  throw new Error("Please add your MONGO_URI_DEVELOPMENT to .env.local")
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise