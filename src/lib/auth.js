import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI);

await client.connect();

const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
   baseURL: process.env.BETTER_AUTH_URL || "https://recipehub-server-dusky.vercel.app",
  trustedOrigins: [process.env.CLIENT_URL || "https://recipehub-self.vercel.app"],

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
      plan: {
    defaultValue: "free", // free | premium
  },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 60 * 60, // 7 days
      strategy:'jwt'
    },
  },
  
  plugins:[jwt()]
});