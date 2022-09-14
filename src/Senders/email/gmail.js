import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = createTransport({
	service: "gmail",
	port: process.env.GMAIL_PORT || 587,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});
