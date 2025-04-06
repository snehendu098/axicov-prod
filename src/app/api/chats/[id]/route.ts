// /api/chats/[agent_id]?ownerWallet=YOUR_WALLET_ADDRESS

import { NextResponse } from "next/server";
import { Chat } from "@/models/chat.model";
import { Agent } from "@/models/agent.model";
import { isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import { ApiResponse } from "@/interfaces";

interface AgentParams {
  id: string;
}

export async function GET(req: Request, { params }: { params: AgentParams }) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate that the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid agent ID format",
        },
        { status: 400 }
      );
    }

    // Get ownerWallet from query parameters for authorization
    const url = new URL(req.url);
    const ownerWallet = url.searchParams.get("ownerWallet");

    if (!ownerWallet) {
      return NextResponse.json(
        {
          success: false,
          error: "ownerWallet is required for authorization",
        },
        { status: 400 }
      );
    }

    // First verify the agent exists and belongs to the owner
    const agent = await Agent.findOne({ _id: id, ownerWallet });

    if (!agent) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Agent not found or you don't have permission to access this agent's chats",
        },
        { status: 404 }
      );
    }

    // Find all chats for this agent and sort by timestamp
    const chats = await Chat.find({ agentInstance: id }).sort({ createdAt: 1 });

    const response: ApiResponse<any> = {
      success: true,
      data: { chats, agent },
      message: `${chats.length} chats found for the specified agent`,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching agent chats:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error.message || "Failed to fetch agent chats",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: AgentParams }) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate that the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid agent ID format",
        },
        { status: 400 }
      );
    }

    // Get chat data from request body
    const chatData = await req.json();

    // Validate required fields
    if (!chatData.message) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required",
        },
        { status: 400 }
      );
    }

    if (!chatData.type || !["agent", "user"].includes(chatData.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid type (agent or user) is required",
        },
        { status: 400 }
      );
    }

    // Get ownerWallet from query parameters for authorization
    const url = new URL(req.url);
    const ownerWallet = url.searchParams.get("ownerWallet");

    if (!ownerWallet) {
      return NextResponse.json(
        {
          success: false,
          error: "ownerWallet is required for authorization",
        },
        { status: 400 }
      );
    }

    // Verify the agent exists and belongs to the owner
    const agent = await Agent.findOne({ _id: id, ownerWallet });

    if (!agent) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Agent not found or you don't have permission to add chats to this agent",
        },
        { status: 404 }
      );
    }

    // Create new chat
    const newChat = new Chat({
      agentInstance: id,
      message: chatData.message,
      type: chatData.type,
      runtimeMessages: chatData.runtimeMessages,
    });

    // Save to database
    const savedChat = await newChat.save();

    const response: ApiResponse<typeof savedChat> = {
      success: true,
      data: savedChat,
      message: "Chat message created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("Error creating chat message:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error.message || "Failed to create chat message",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
