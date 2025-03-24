import { createConfig, http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [bsc, bscTestnet],
  connectors: [
    metaMask({
      preferDesktop: true,
      extensionOnly: true,
    }),
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});