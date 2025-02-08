import cron from "node-cron";
import User from "../models/User";

export const startCronJobs = () => {
  // Schedule the cron job to run every 3 hours
  cron.schedule("0 */2 * * *", async () => {
    try {
      // Update users with interestWallet > 0 by incrementing the interestWallet and interestRate by 10
      await User.updateMany(
        { interestWallet: { $gt: 0 } },
        { $inc: { interestWallet: 10, interestRate: 10 } }
      );

      // Update users with DepositWallet > 0 by incrementing the DepositWallet and depositInterestRate by 10
      await User.updateMany(
        { DepositWallet: { $gt: 0 } },
        { $inc: { DepositWallet: 10, depositInterestRate: 10 } }
      );
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};
