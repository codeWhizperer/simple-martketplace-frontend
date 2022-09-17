import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayOut from "../layout";
import { WagmiConfig, createClient } from "wagmi";
import { providers } from "ethers";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { toast } from "react-toastify";

const goerliProvider = new providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC,
  { name: "goerli", chainId: 5, ensAddress: undefined }
);

const client = createClient({
  autoConnect: true,
  provider: goerliProvider,
});

// create a react-query client

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure Metamask is connected & on the same network that contract is deployed to!"
      );
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>
        <LayOut>
          <Component {...pageProps} />
        </LayOut>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default MyApp;
