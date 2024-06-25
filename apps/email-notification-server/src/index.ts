import redis from "redis";
import nodemailer from "nodemailer";

const client = redis.createClient();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "email@gmail.com",
    pass: "password",
  },
});
