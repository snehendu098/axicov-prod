import mongoose, { Document, Schema } from "mongoose";

export type ChatType = "agent" | "user";

export interface IChat extends Document {
  agentInstance: mongoose.Types.ObjectId;
  message: string;
  runtimeMessages?: string[];
  type: ChatType;
}

const ChatSchema = new Schema<IChat>(
  {
    agentInstance: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    runtimeMessages: {
      type: [String],
      default: undefined,
    },
    type: {
      type: String,
      enum: ["agent", "user"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);

export { Chat };
