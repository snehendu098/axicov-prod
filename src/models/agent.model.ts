import mongoose, { Document, Schema } from "mongoose";

export interface IAgent extends Document {
  displayName: string;
  description: string;
  instructions: string;
  privateKey: string;
  tools: number[];
  ownerWallet: string;
}

const AgentSchema = new Schema<IAgent>(
  {
    displayName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    tools: {
      type: [Number],
      default: [],
    },
    ownerWallet: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Agent =
  mongoose.models.Agent || mongoose.model<IAgent>("Agent", AgentSchema);
