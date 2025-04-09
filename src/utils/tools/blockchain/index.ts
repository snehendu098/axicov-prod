import { Agent } from "@/utils/agent";

export const getBalance = async (agent: Agent, address?: string) => {
  try {
    if (address) {
      const tokenContract = await agent.sdk.getContract(address, "token");
      return tokenContract.balanceOf(agent.account.address);
    } else {
      return await agent.sdk.getBalance(agent.account.address);
    }
  } catch (err) {
    throw new Error("Failed to get balance");
  }
};

export const deployToken = async (
  agent: Agent,
  tokenName: string,
  tokenSymbol: string,
  tokenSupply: number
) => {
  try {
    const deployedAddress = await agent.sdk.deployer.deployToken({
      name: tokenName,
      symbol: tokenSymbol,
      defaultAdmin: agent.account.address,
    });

    const tokenContract = await agent.sdk.getContract(deployedAddress, "token");

    const mintTxn = await tokenContract.mintTo(
      agent.account.address,
      tokenSupply
    );

    return { token: deployedAddress, mintTxnHash: mintTxn.receipt.blockHash };
  } catch (err: any) {
    throw new Error(`Error Occurred: ${err}`);
  }
};

export const transferToken = async (
  agent: Agent,
  amount: number | string,
  toAddress: string,
  tokenAddress?: string
) => {
  try {
    if (tokenAddress) {
      const tokenContract = await agent.sdk.getContract(tokenAddress, "token");
      const transferTxn = await tokenContract.transfer(toAddress, amount);
      return transferTxn.receipt;
    } else {
      const transferTxn = await agent.sdk.wallet.transfer(toAddress, amount);
      return transferTxn.receipt;
    }
  } catch (err: any) {
    throw new Error(`Error Occurred: ${err}`);
  }
};

export const getTokenInfo = async (agent: Agent, tokenAddress?: string) => {
  try {
    if (tokenAddress) {
      const tokenContract = await agent.sdk.getContract(tokenAddress, "token");
      const balance = await tokenContract.balance();
      return {
        name: balance.name,
        decimals: balance.decimals,
        symbol: balance.symbol,
      };
    } else {
      const tokenContract = await agent.sdk.getBalance(agent.account.address);
      return {
        name: tokenContract.name,
        decimals: tokenContract.decimals,
        symbol: tokenContract.symbol,
      };
    }
  } catch (err) {
    throw new Error();
  }
};
