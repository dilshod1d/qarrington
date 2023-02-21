import { MongoClient } from 'mongodb';

// const MONGO_URI_DEVELOPMENT = process.env.MONGO_URI_DEVELOPMENT

async function handler(req, res) {
    if (req.method !== "POST") return;

    const { title, description, image } = req.body;
    const slug = title.replace("", "-").toLowerCase();

    if (!title.replace || !description || !image) return;

    const client = await MongoClient.connect(
        // (MONGO_URI_DEVELOPMENT)
        "mongodb+srv://yuzer:FlpRU04KFxG244Lz@qarrington.kp85dxb.mongodb.net/dbc"
    );

    const db = client.db()
    const Post = db.collection("posts")
    const result = await Post.insertOne({ title, description, image, slug })

    client.close()

    res.status(201).json({
        post: result
    })
}

export default handler;