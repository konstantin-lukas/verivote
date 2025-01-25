import { MongoClient } from "mongodb";

const username = encodeURIComponent(process.env.MONGODB_USER!);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
const connection = encodeURIComponent(process.env.MONGODB_DATABASE!);
const uri = `mongodb://${username}:${password}@${process.env.MONGODB_URI!}/${connection}?authMechanism=DEFAULT`;
const client = new MongoClient(uri);

export default client;
