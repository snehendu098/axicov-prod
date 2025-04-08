import { Agent } from "@/utils/agent";
import { createEDUTools } from "@/utils/tools";
import Web3 from "web3";

const web3 = new Web3();
const tempAcc = web3.eth.accounts.create();

const tempAgent = new Agent(tempAcc.privateKey);

const tools = createEDUTools(tempAgent);

export const availableTools = tools.map((item, idx) => {
  if (idx > 1) {
    return {
      name: item.name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      description: item.description.split("\n")[0],
    };
  }
});
