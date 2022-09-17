import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import nftabi from "../abi/nft.json";
import { nft } from "../constants/constant";

const useNFT = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = wagmi.useContract({
    addressOrName: nft,
    contractInterface: nftabi,
    signerOrProvider: signer || provider,
  });
  return {
    contract
  };
};

export default useNFT;
