import React from "react";
import { makeNum, shortenAddress } from "../utils/helper";
import {useAccount, useBalance} from "wagmi";





function AuthButton() {

  const {address} =  useAccount()
   const {data} = useBalance({
    addressOrName:address
   })


  return (
      <div className="bg-violet-800 w-56 items-center space-x-4 py-2 rounded-lg flex">
        <p className="border-r-2 px-2">
          <button className="text-white">{shortenAddress(address as string)}</button>
        </p>
        <p>
          <button className="text-white">{`${(makeNum(data?.formatted as string))} ETH`}</button>
        </p>
      </div>
  );
}

export default AuthButton;
