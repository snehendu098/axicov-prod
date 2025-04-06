// /api/agents/all?ownerWallet=YOUR_WALLET_ADDRESS

import { NextResponse } from "next/server";
import { Agent } from "@/models/agent.model";
import { dbConnect } from "@/lib/db";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const ownerWallet = url.searchParams.get("ownerWallet");

    if (!ownerWallet) {
      return NextResponse.json(
        {
          success: false,
          error: "ownerWallet is required",
        },
        { status: 400 }
      );
    }

    const agents = await Agent.find({ ownerWallet });

    const response: ApiResponse<typeof agents> = {
      success: true,
      data: agents,
      message: `${agents.length} agents found for the provided wallet address`,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching agents:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error.message || "Failed to fetch agents",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
