import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "better-coral-36704.upstash.io",
    port: 6379,
    tls: true,
  },
  password: "AY9gAAIjcDEyMzE4MmU0MjkxMjc0OWM2Yjg2Mjk2NWQ2YTRjZWYwY3AxMA", // from Upstash
  username: "default",
});

client.on("error", (err:any) => console.error("Redis Client Error", err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export { client, connectRedis };
