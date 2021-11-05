import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://WCG:wcg921107@cluster0.gvzha.mongodb.net/test`;
const client = new MongoClient(uri);
const dbName = `todolist`;

export let db;
export let counter;

export const connectDB = async () => {
  try {
    await client.connect();
    console.log(`DB is connect to Mongo Server`);
    db = client.db(dbName);
    counter = await db.collection('counter').findOne({ name: `counter` });
    if (!counter) {
      counter = await db
        .collection('counter')
        .insertOne({ name: 'counter', count: 0 });
      counter.count = 0;
    }
  } catch (error) {
    console.log(error);
  }
};
