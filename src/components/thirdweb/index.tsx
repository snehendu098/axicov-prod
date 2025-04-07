import { client } from "@/lib/client";
import { defineChain } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

export const ThirdwebConnectButton = () => {
  return <ConnectButton client={client} chains={[defineChain(656476)]} />;
};
