import { parseJson } from "@/helpers/parse-json";
import { Agent } from "@/utils/agent";
import { Tool } from "@langchain/core/tools";

export class EDUBalanceTool extends Tool {
  name = "edu_balance";
  description = `Gets the balance of your account
    
If you want to get the balance of your wallet, you don't need to provide the mint.
If no mint is provided, the balance will be in EDU.
if you want to get balance of a fungible asset, you need to provide the asset address as mint

Inputs ( input is a JSON string ):
mint: string, e.g "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b" (optional)
    `;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = parseJson(input);
      const mint = parsedInput.mint || undefined;
      const mintDetails = await this.agent.getTokenInfo(mint);
      const balance = await this.agent.getBalance(mint);

      return JSON.stringify({
        status: "success",
        balance,
        token: {
          name: mintDetails.name || "EDU",
          decimals: mintDetails.decimals || 8,
        },
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

export class TokenInfoTool extends Tool {
  name = "token_info";
  description = `Gets the information of a token

details also include decimals which you can use to make onchain values readable to a human user


Inputs ( input is a JSON string ):
mint: string, e.g "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b" (optional)
    `;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = parseJson(input);
      const mint = parsedInput.mint || undefined;
      const mintDetails: any = this.agent.getTokenInfo(mint);
      const balance = await this.agent.getBalance(mint);

      return JSON.stringify({
        status: "success",
        balance,
        token: {
          name: mintDetails.name || "APT",
          decimals: mintDetails.decimals || 8,
        },
      });
    } catch (err: any) {
      return JSON.stringify({
        status: "error",
        message: err.message,
        code: err.code || "UNKNOWN_ERROR",
      });
    }
  }
}

export class TokenTransferTool extends Tool {
  name = "transfer_token";
  description = `this tool can be used to transfer EDU, any token or fungible asset to a recipient

  if you want to transfer EDU, mint will be undefined
  if you want to transfer token other than EDU, you need to provide the mint of that specific token

  keep to blank if user themselves wants to receive the token and not send to anybody else

  Inputs ( input is a JSON string ):
  to: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa" (required)
  amount: number, eg 1 or 0.01 (required)
  mint: string, eg "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa" (optional)`;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = parseJson(input);

      const tokenDetail = await this.agent.getTokenInfo(parsedInput.mint);

      const transactionRecipt = await this.agent.transferToken(
        parsedInput.amount,
        parsedInput.to,
        parsedInput.mint
      );

      return JSON.stringify({
        status: "success",
        transactionRecipt,
        token: {
          name: tokenDetail.name,
          decimals: tokenDetail.decimals,
        },
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

export class CreateTokenTool extends Tool {
  name = "create_or_deploy_token";
  description = `this tool can be used to create or deploy a token

    if you want to create a token, you need to provide the name, symbol, decimals and supply
    if you want to deploy a token, you need to provide the mint and supply

    Inputs ( input is a JSON string ):
    name: string, eg "AXICOV" (required)
    symbol: string, eg "AXC" (required)
    supply: number, eg 1000000 (required)
  
    **IMPORTANT INSTRUCTIONS**:
    - Don't invent the token 'symbol', token 'name', initial 'supply' of the token. These must be provided by the user itself
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
    `;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = parseJson(input);

      const deployment = await this.agent.deployToken(
        parsedInput.name,
        parsedInput.symbol,
        parsedInput.supply
      );

      return JSON.stringify({
        status: "success",
        deployed: deployment,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}
