import {MongoClient, ServerApiVersion, Document} from "mongodb";
import {AssistantUser} from "@/lib/types/models";

export default async function getMongoClient() {
    let url = process.env.MONGODB_CONNECTION_STRING ?? "";

    if (url == "") {
        console.error("No Connection String configured in .env file");
    }

    return await MongoClient.connect(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
}

async function findOne<T>(query: any) {
    const client = await getMongoClient();
    const db = client.db("assistant");

    const collection = db.collection('users');
    const result = await collection.findOne<T>(query);

    await client.close();

    return result;
}

async function findAll<T extends Document>(query: any) {
    const client = await getMongoClient();
    const db = client.db("assistant");

    const usersCollection = db.collection('users');

    const users = await usersCollection.find<T>(query).toArray();

    await client.close();

    return users;
}

export async function getUser(email: string) {
    return await findOne<AssistantUser>({email: email});
}

export async function getUsersCollection(email: string) {
    return await findAll<AssistantUser>({email: email});
}
