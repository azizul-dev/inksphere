import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const mongoUri = process.env.MONGO_DB_URI || process.env.MONGODB_URI;
const client = new MongoClient(mongoUri);
const db = client.db(process.env.AUTH_DB_NAME || "ink-sphere");

export const auth = betterAuth({
  baseURL: {
    allowedHosts: [
      "inksphere-two.vercel.app",
      "*.vercel.app",
      "localhost:*"
    ]
  },
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: "string", // ← type লাগবে
        default: "reader",
        input: true, // ← এটা যোগ করো, না হলে allowed না
      },
    },
  },
  plugins: [admin()],

   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
});
