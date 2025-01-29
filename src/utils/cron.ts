import cron from "node-cron";
import User from "../models/User";

export const startCronJobs = () => {
  // Schedule the cron job to run every hour
  cron.schedule("0 * * * *", async () => {
    try {
      // Check if any users have an amount greater than 0
      const userCount = await User.countDocuments({ amount: { $gt: 0 } });

      if (userCount > 0) {
        // Update all users by incrementing the amount by 100
        await User.updateMany({ $inc: { interest: 1 } });
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};
