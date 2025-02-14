import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import referralRoutes from "./routes/referral.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Add referral routes
app.use("/api", referralRoutes);

export default app;
