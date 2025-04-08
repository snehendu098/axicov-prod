import { Agent } from ".";
import { createEDUTools } from "../tools";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph-checkpoint";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

export interface IRuntime {
  privateKey: string;
  info: {
    name: string;
    description: string;
    instruction: string;
  };
  tools: number[];
}

const agentInit = (privateKey: string) => {
  const agent = new Agent(privateKey);
  return agent;
};

export const reactiveAgent = async (item: IRuntime) => {
  const agent = await agentInit(item.privateKey);
  const tools = createEDUTools(agent).filter((_, idx) =>
    item.tools.includes(idx)
  );

  const llm = new ChatGoogleGenerativeAI({
    temperature: 0.7,
    model: "gemini-1.5-pro",
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const checkpointer = new MemorySaver();
  const reactiveAgent = createReactAgent({
    llm,
    tools,
    checkpointSaver: checkpointer,
    messageModifier: `Your name is ${item.info.name}

${item.info.instruction}

  Available Tools:
  ${tools.map((tool) => `${tool.name} - ${tool.description}`).join(", ")}

  ## Important Note:
  - Always provide clear consise responses in markdown format
  - Be polite to the user
  - You are operating on a blockchain named Educhain
  - The wallet access you have is created by the user for you. So talk to the user like its your own wallet
  - Your wallet address is: ${agent.account.address}
`,
  });

  return reactiveAgent;
};
