import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

await client.connect();

const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
   baseURL: process.env.BETTER_AUTH_URL || "https://recipehub-server-dusky.vercel.app",
  trustedOrigins: [process.env.CLIENT_URL || "http://localhost:3000"],

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user", // user | admin
      },

      isPremium: {
        defaultValue: false,
      },

      isBlocked: {
        defaultValue: false,
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 0, // 1 minute
    },
  },
  plan: {
    defaultValue: "free", // free | premium
  }
});