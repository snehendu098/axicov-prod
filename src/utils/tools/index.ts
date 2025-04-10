import { Agent } from "../agent";
import {
  CreateTokenTool,
  EDUBalanceTool,
  TokenInfoTool,
  TokenTransferTool,
} from "./blockchain/tool";
import { GenerateQuiz, GetBookRecommendations, SearchJobs } from "./edu/tool";
import { serperTool } from "@/constants";

export const createEDUTools = (agent: Agent) => {
  const tools = [
    new EDUBalanceTool(agent),
    new TokenInfoTool(agent),
    serperTool,
    new TokenTransferTool(agent),
    new CreateTokenTool(agent),
    new SearchJobs(agent),
    new GetBookRecommendations(agent),
    new GenerateQuiz(agent),
  ];

  return tools;
};
