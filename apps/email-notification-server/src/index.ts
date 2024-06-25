import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 17801,
  },
});
client.on("error", (err) => console.log("Redis Client Error", err));

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");

    // Main loop
    while (true) {
      try {
        const EmailData = await client.brPop("problems", 0);
        //Logic to send email
      } catch (error) {
        console.error("Error processing submission:", error);
        // Implement your error handling logic here. For example, you might want to push
        // the submission back onto the queue or log the error to a file.
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startWorker();
