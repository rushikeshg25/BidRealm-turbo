import { createClient } from "redis";
import dotenv from "dotenv";
import { sendMail } from "./email";
dotenv.config();

type EmailData = {
  email: string;
  subject: string;
  type: string; //winner,finishOwner, outbid
  username: string;
  auctionTitle: string;
  outbidAmount?: string;
  outbidUsername?: string;
};
const emailFrom = process.env.EMAIL_FROM;
const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 17801,
  },
});

client.on("error", (err) => console.log("Redis Client Connection Error", err));

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");

    while (true) {
      try {
        const data = await client.brPop("emails", 0);
        if (data?.element) {
          const emailData = JSON.parse(data?.element) as EmailData;
          let sendData: string;
          switch (emailData.type) {
            case "winner":
              sendData = `Congrats ${emailData.username}! You won the auction ${emailData.auctionTitle} with a bid of ${emailData.outbidAmount}`;
              await sendMail(emailFrom as string, sendData, emailData.email);
              break;
            case "finishOwner":
              sendData = `Your auction ${emailData.auctionTitle} has finished`;
              await sendMail(emailFrom as string, sendData, emailData.email);
              break;
            case "outbid":
              sendData = `${emailData.username} outbid ${emailData.outbidUsername} for the auction ${emailData.auctionTitle} with a bid of ${emailData.outbidAmount}`;
              await sendMail(emailFrom as string, sendData, emailData.email);
              break;
            default:
              console.log("Unknown email type");
              break;
          }
        }
      } catch (error) {
        console.error("Error processing submission:", error);
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startWorker();
