import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const env = process.env;

export const transporter = nodemailer.createTransport({
  service: "Gmail",

  auth: {
    user: env.MAILER_USER,
    pass: env.MAILER_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
