const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ink-sphere:L7WEzY04z0a7MxX7@cluster0.hxabom1.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);
async function check() {
  try {
    await client.connect();
    const db = client.db('ink-sphere');
    const users = await db.collection('user').find().sort({createdAt: -1}).limit(10).toArray();
    console.log(JSON.stringify(users, null, 2));
  } finally {
    await client.close();
  }
}
check().catch(console.error);
