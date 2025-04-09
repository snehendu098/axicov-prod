import { Agent } from "../agent";
import {
  CreateTokenTool,
  EDUBalanceTool,
  TokenInfoTool,
  TokenTransferTool,
} from "./blockchain/tool";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import {
  GenerateCurrentAffairsQuiz,
  GetBookRecommendations,
  SearchJobs,
} from "./edu/tool";

export const createEDUTools = (agent: Agent) => {
  const tools = [
    new EDUBalanceTool(agent),
    new TokenInfoTool(agent),
    new TavilySearchResults({
      maxResults: 1,
      apiKey: process.env.NEXT_PUBLIC_TAVILY_API_KEY,
    }),
    new TokenTransferTool(agent),
    new CreateTokenTool(agent),
    new SearchJobs(agent),
    new GetBookRecommendations(agent),
    new GenerateCurrentAffairsQuiz(agent),
  ];

  return tools;
};
