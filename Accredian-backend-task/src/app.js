import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("Server is running!");
});


export default app;
