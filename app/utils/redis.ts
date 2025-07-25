import { createClient } from "redis"

const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", function(err) {
  throw err;
});

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export { client, connectRedis };
