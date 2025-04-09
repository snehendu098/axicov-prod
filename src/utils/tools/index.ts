import { Agent } from "../agent";
import {
  CreateTokenTool,
  EDUBalanceTool,
  TokenInfoTool,
  TokenTransferTool,
} from "./blockchain/tool";
import { Serper } from "@langchain/community/tools/serper";
import {
  GenerateCurrentAffairsQuiz,
  GetBookRecommendations,
  SearchJobs,
} from "./edu/tool";

export const createEDUTools = (agent: Agent) => {
  const tools = [
    new EDUBalanceTool(agent),
    new TokenInfoTool(agent),
    new Serper(process.env.NEXT_PUBLIC_SEARCH!),
    new TokenTransferTool(agent),
    new CreateTokenTool(agent),
    new SearchJobs(agent),
    new GetBookRecommendations(agent),
    new GenerateCurrentAffairsQuiz(agent),
  ];

  return tools;
};
