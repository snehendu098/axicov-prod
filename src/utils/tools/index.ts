import { Agent } from "../agent";
import {
  CreateTokenTool,
  EDUBalanceTool,
  TokenInfoTool,
  TokenTransferTool,
} from "./blockchain/tool";

export const createEDUTools = (agent: Agent) => {
  const tools = [
    new EDUBalanceTool(agent),
    new TokenInfoTool(agent),
    new TokenTransferTool(agent),
    new CreateTokenTool(agent),
  ];

  return tools;
};
