import { NextResponse } from "next/server";
import { Agent } from "@/models/agent.model";
import { isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import { ApiResponse } from "@/interfaces";

interface AgentParams {
  id: string;
}

export async function GET(
  req: Request,
  _: Response,
  { params }: { params: AgentParams }
) {
  try {
    await dbConnect();

    const { id } = params;

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

    // Get ownerWallet from query parameters
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

    // Find agent by ID and ownerWallet
    const agent = await Agent.findOne({ _id: id, ownerWallet });

    if (!agent) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Agent not found or you don't have permission to view this agent",
        },
        { status: 404 }
      );
    }

    const response: ApiResponse<typeof agent> = {
      success: true,
      data: agent,
      message: "Agent fetched successfully",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching agent:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error.message || "Failed to fetch agent",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
