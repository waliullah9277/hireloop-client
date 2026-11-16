import { setServers } from "node:dns/promises"
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

// Use Cloudflare first, then Google for server-side DNS resolution.
// MongoDB Atlas uses this resolver for its SRV and TXT records.
setServers(["1.1.1.1", "8.8.8.8"])

const client = new MongoClient(process.env.BETTER_AUTH_URI as string)
const db = client.db("hireloopdb")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
})
