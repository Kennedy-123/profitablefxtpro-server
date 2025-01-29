import Express from "express";
import morgan from "morgan";
import connectDB from "./db/dbConnection";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/users.routes";
import depositRouter from "./routes/deposit.routes";
import { startCronJobs } from "./utils/cron";
import cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config();

const app = Express();
const PORT = 5000;

app.use(Express.json());

app.use(cors()); // Enables CORS for all origins

// Use Morgan middleware
app.use(morgan("dev")); // Logs requests in 'dev' format

//routes
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", depositRouter);

app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    startCronJobs();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
