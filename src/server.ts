import Express, { Request, Response } from "express";
import morgan from "morgan";
import connectDB from "./db/dbConnection";
import authRouter from './routes/auth.routes'
import * as dotenv from "dotenv";
dotenv.config();


const app = Express();
const PORT = 5000;

app.use(Express.json());

// Use Morgan middleware
app.use(morgan("dev")); // Logs requests in 'dev' format
app.use('/api/v1', authRouter)


app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGO_URI as string)
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error)
  }
});
