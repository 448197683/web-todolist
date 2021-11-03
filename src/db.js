import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://WCG:wcg921107@cluster0.gvzha.mongodb.net/test`;
const client = new MongoClient(uri);
const dbName = `todolist`;

export let db;

export const connectDB = async () => {
  try {
    await client.connect();
    console.log(`DB is connect to Mongo Server`);
    db = client.db(dbName);
  } catch (error) {
    console.log(error);
  }
};
