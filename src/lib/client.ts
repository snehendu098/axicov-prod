// lib/client.ts
import { createThirdwebClient, defineChain, getContract } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!; // this will be used on the client
const secretKey = process.env.THIRDWEB_SECRET_KEY!; // this will be used on the server-side

export const client = createThirdwebClient(
  secretKey ? { secretKey } : { clientId }
);

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(656476),
  address: "0xA0E197abd92035C0117CC2926CEB7485f04D7c3d",
});
