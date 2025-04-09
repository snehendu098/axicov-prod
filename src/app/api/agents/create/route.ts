import { NextResponse } from "next/server";
import { Agent } from "@/models/agent.model";
import { dbConnect } from "@/lib/db";
import { ApiResponse } from "@/interfaces";
import Web3 from "web3";
import mongoose from "mongoose";

interface AgentCreateRequest {
  displayName: string;
  description: string;
  instructions: string;
  tools: number[];
  ownerWallet: string;
  id: string;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const agentData = await req.json();

    console.log(agentData);

    const requiredFields = [
      "displayName",
      "description",
      "instructions",
      "ownerWallet",
    ];
    for (const field of requiredFields) {
      if (!agentData[field as keyof AgentCreateRequest]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    const web3 = new Web3();
    const account = await web3.eth.accounts.create();

    const newAgent = new Agent({
      _id: new mongoose.Types.ObjectId(agentData.id),
      displayName: agentData.displayName,
      description: agentData.description,
      instructions: agentData.instructions,
      privateKey: account.privateKey.toString(),
      tools: agentData.tools || [],
      ownerWallet: agentData.ownerWallet,
    });

    const savedAgent = await newAgent.save();

    const response: ApiResponse<typeof savedAgent> = {
      success: true,
      data: savedAgent,
      message: "Agent created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("Error creating agent:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error.message || "Failed to create agent",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
