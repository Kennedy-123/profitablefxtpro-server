import cron from "node-cron";
import User from "../models/User";

export const startCronJobs = () => {
  // Schedule the cron job to run every hour
  cron.schedule("0 * * * *", async () => {
    try {
      // Check if any users have an amount greater than 0
      const userDepositWallet = await User.countDocuments({ DepositWallet: { $gt: 0 } });

      const userInterestWallet = await User.countDocuments({ interestWallet: { $gt: 0 } });

      if (userInterestWallet > 0) {
        // Update all users by incrementing the amount by 100
        await User.updateMany({ $inc: { interestWallet: 0.1 } });
      }

      if (userDepositWallet > 0) {
        // Update all users by incrementing the amount by 100
        await User.updateMany({ $inc: { DepositWallet: 0.1 } });
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};
