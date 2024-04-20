import {MongoClient, ServerApiVersion} from "mongodb";

export default async function getMongoClient() {
    let url = process.env.MONGODB_CONNECTION_STRING ?? "";

    if (url == "") {
        console.error("No Connection String configured in .env file");
    }

    return await MongoClient.connect(url,{
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
}

async function getUser() {
}

export async function getUsersCollection() {
    const client = await getMongoClient();
    const db = client.db("legal-assistant");

    const usersCollection = db.collection('users');

    const users = await usersCollection.find().toArray();

    await client.close();

    return users;
}