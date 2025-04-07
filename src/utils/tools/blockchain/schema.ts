import { Tools } from "axicov-sdk";
import { z } from "zod";

export const blockchainRegistrySchema: Tools = {
  deployTokenSchema: {
    name: "tokenDeployer",
    description: `
        Deploys an ERC-20 token on Educhain based on tokenName, tokenSymbol and tokenSupply
  
         **IMPORTANT INSTRUCTIONS**:
         - Don't invent the token symbol, token name, initial supply of the token. These must be provided by the user itself
         - Before deployment of the token, always make a confirmation from the user that the token details are correct
  
         **EXAMPLES**
         ------------
         User: Deploy a token
         You: Please provide the token symbol, token name and initial supply of the token
  
         User: Deploy a token named Silion
         You: Provide the token supply, and the token symbol
  
         User: Deploy a token named Silion with symbol SIL
         You: Provide the token supply
  
         User: 7000
         You: I'll deploy a token named Silion with symbol SIL and initial supply of 7000. Should I proceed?
  
         User: Yes
         You: <Deploy the token>
         ------------
        `,
    schema: z.object({
      tokenName: z.string().describe("The name of the token"),
      tokenSymbol: z.string().describe("The symbol of the token"),
      tokenSupply: z.number().describe("The initial total supply of the token"),
    }),
    requiresApproval: true,
  },
  getBalanceOfTokenSchema: {
    name: "tokenBalanceFetcher",
    description:
      "Gets the balance of an ERC-20 token by taking the address of that token as input",
    schema: z.object({
      tokenAddress: z.string().describe("The address of the token"),
    }),
  },
  getNativeTokenBalance: {
    name: "nativeBalanceFetcher",
    description: `Gets the native Edu balance of the user's address. 
        
        **IMPORTANT NOTES**: 
        - This tool is used by default when the user asks the agent to tell the user's wallet balance
        - The symbol of the native token is 'EDU' not 'ETH'
        `,
    schema: undefined,
  },
};
