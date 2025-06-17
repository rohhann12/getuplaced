import { createClient } from "redis";

const client = await createClient({
    url:"rediss://default:ASp0AAIjcDFiM2RiZWZmODQxNTM0MGNkOGM4ZTI0MWY1ODE1ZmY3ZnAxMA@skilled-primate-10868.upstash.io:6379"
}).on("error", (err) => console.log("Redis Client Error", err)).connect();

async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
    }
}

export {client,connectRedis}