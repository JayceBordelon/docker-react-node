import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT: number = Number.parseInt(process.env.PORT || "3000", 10);
const NODE_ENV: string = process.env.NODE_ENV || "development";

if (Number.isNaN(PORT)) {
  throw new Error("Invalid PORT value in environment variables.");
}

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url} from ${req.hostname}`);
  next();
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: `Server running in ${NODE_ENV} mode on port ${PORT}` });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
