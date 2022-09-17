
import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import marketabi from "../abi/marketPlace.json";
import { nft, marketPlace } from "../constants/constant";

const useMarket = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const market = wagmi.useContract({
    addressOrName: marketPlace,
    contractInterface:marketabi ,
    signerOrProvider: signer || provider,
  });
  return {
market
  };
};

export default useMarket;
