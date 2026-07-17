import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("BlodLink");
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),

  emailAndPassword: {
    enabled: true,
  },

  
  user: {
    additionalFields: {
      bloodGroup: {
        type: "string",
        required: false,
      },

      division: {
        type: "string",
        required: false,
      },

      district: {
        type: "string",
        required: false,
      },

      activeStutus: {
        type: "boolean",
        required: true,
      },

      role: {
        type: "string",
        required: true,
      },
    },
  },
});