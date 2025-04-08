import { client } from "@/lib/client";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Account, privateKeyToAccount } from "thirdweb/wallets";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Chain, defineChain } from "thirdweb";
import {
  deployToken,
  getBalance,
  getTokenInfo,
  transferToken,
} from "../tools/blockchain";

export class Agent {
  privateKey: string;
  params: any;
  account: Account;
  sdk: ThirdwebSDK;
  chain: Chain;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
    this.account = privateKeyToAccount({ client, privateKey });
    this.chain = defineChain(656476);
    this.sdk = ThirdwebSDK.fromPrivateKey(privateKey, this.chain.rpc, {
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    });
  }

  getTokenInfo(address?: string) {
    return getTokenInfo(this, address);
  }

  getBalance(address?: string) {
    return getBalance(this, address);
  }

  transferToken(
    amount: number | string,
    toAddress: string,
    tokenAddress?: string
  ) {
    return transferToken(this, amount, toAddress, tokenAddress);
  }

  deployToken(tokenName: string, tokenSymbol: string, tokenSupply: number) {
    return deployToken(this, tokenName, tokenSymbol, tokenSupply);
  }
}
