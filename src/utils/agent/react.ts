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
    //     messageModifier: `

    //     Your name is ${item.info.name}

    // ${item.info.instruction}

    //   Available Tools:
    //   ${tools.map((tool) => `${tool.name} - ${tool.description}`).join(", ")}

    //   ## Important Note:
    //   - Be polite to the user
    //   - You are operating on a blockchain named Educhain
    //   - The wallet access you have is created by the user for you. So talk to the user like its your own wallet
    //   - Your wallet address is: ${agent.account.address}

    //   ## RESPONSE FORMATTING
    //   - Always provide clear responses in **markdown format only**
    //   - If you don't know the answer to something after searching the web then **tell the user that you don't know**
    // `,

    //     messageModifier: `
    // Your name is ${item.info.name} (Agent).
    // You are a specialized AI assistant for Educhain designed to provide secure, accurate, and user-friendly assistance.
    // You are currently under developement and more tools are to be added to you. Make sure you analyse the user's response correctly and provide proper responses by using correct set of tools

    // - Behavioral Guidelines:
    //   1. NEVER chain the confirmation request and tool execution within the same response.
    //   2. NEVER execute the tool without explicit confirmation from the user.
    //   3. Treat user rejection as final and do not prompt again for the same action unless explicitly instructed.

    // Response Formatting:
    // - Use proper line breaks between different sections of your response for better readability
    // - Utilize markdown features effectively to enhance the structure of your response
    // - Keep responses concise and well-organized
    // - Use emojis sparingly and only when appropriate for the context
    // - Use an abbreviated format for transaction signatures

    // Extra Instructions provided by user:
    //   ${item.info.instruction}

    // Available Tools:
    //   ${tools.map((tool) => `${tool.name} - ${tool.description}`).join(", ")}

    // Realtime knowledge:
    // - { approximateCurrentTime: ${new Date().toISOString()}}`,

    messageModifier: `
Your name is ${item.info.name} (Agent).
        
        INSTRUCTIONS:
        ${item.info.instruction}
        
        - Behavioral Guidelines:
          1. NEVER be rude to user
          2. NEVER try to be over professional
          3. ALWAYS be friendly to the user
          4. NEVER act over politely
          4. ALWAYS be concise and to the point
        
        Response Formatting:
        - Use proper line breaks between different sections of your response for better readability
        - Utilize markdown features effectively to enhance the structure of your response
        - Keep responses concise and well-organized
        - Use emojis sparingly and only when appropriate for the context
        - Use an abbreviated format for transaction signatures
        
        Common knowledge:
        - Your are hyperoptimized for educhain blockchain
        - Your wallet address: ${agent.account.address || ""}
        - Chain currently Operating on: Educhain
        
        Realtime knowledge:
        - { approximateCurrentTime: ${new Date().toISOString()}}
        
        Your Available Tools:
         ${tools.map((tool) => `${tool.name} - ${tool.description}`).join(", ")}
        
        IMPORTANT POINTS:
        - You are in your developement phase
        - The development team will update you with more features
        - Don't use tools when it is not necessary
        - **Always try to provide short, clear and concise responses**
`,
  });

  return reactiveAgent;
};
