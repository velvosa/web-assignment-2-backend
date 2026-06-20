import express from "express";
import cors from "cors";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import serviceRoutes from "./routes/serviceRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio API is running"
    });
});
app.use("/api/services", serviceRoutes);
// 404 handler
app.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});