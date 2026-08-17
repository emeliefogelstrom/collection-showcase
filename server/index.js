// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import menus from "./routes/menus.js";
import players from "./routes/players.js";
import users from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";

// Setup environment
dotenv.config();

const app = express();

app.enable("trust proxy", "127.0.0.1");
// Create a rate limiter with a limit of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max number of requests per IP
  keyGenerator: (req, res) => {
    return req.ip; // Use the client's IP address as the key
  },
});

// Apply rate limiter to all API routes
app.use("/api/", limiter);
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: "GET,HEAD,PUT,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Body-parser to parse incoming request bodies in a middleware before handlers.
app.use(bodyParser.json({ extended: true, limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "200mb",
    parameterLimit: 50000,
  })
);

app.get("/", (req, res) => {
  res.send("Hello to Morten API");
});

// Connect to routes
app.use("/api/menus", menus);
app.use("/api/players", players);
app.use("/api/users", users);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Run app
const PORT = process.env.PORT || 4000; // Set default port to 4000

const dbURL = process.env.MONGODB_URL;

// Connect to mongo database
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit with failure code
  });

process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err.message);
  process.exit(1); // Exit with failure code
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1); // Exit with failure code
});

mongoose.set("useFindAndModify", false);
