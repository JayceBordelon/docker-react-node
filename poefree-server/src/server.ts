import express from "express";
import { PORT, NODE_ENV, MONGO_URI } from "./config/validateEnv";
import { connectToMongo } from "./config/db";
import { setupMiddleware } from "./middleware";
import routes from "./routes";
import { setupGracefulShutdown } from "./utils/shutdown";

const app = express();

setupMiddleware(app);

app.use("/", routes);

app.listen(PORT, "0.0.0.0", async () => {
  await connectToMongo(MONGO_URI);
  console.log(`Server running in ${NODE_ENV} mode on http://0.0.0.0:${PORT}`);
});

setupGracefulShutdown();
