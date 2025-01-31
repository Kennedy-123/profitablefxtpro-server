import mongoose, { Schema, Document } from 'mongoose';

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 1 },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
    }
  },
  { timestamps: true }
);

export const Withdrawal = mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema);
