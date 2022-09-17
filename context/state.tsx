import React, {useState,useContext} from "react";
import {NFTContextState} from "./type"

const contextDefaultValue : NFTContextState = {
    connected: false,
    account:"",
    metamaskPresent:false,
    setAccount: () => null,
    setConnected: () => null,
    setMetamaskPresent:() => null
}

type NFTContextProviderProps = {
    children:React.ReactNode
}

export const NFTContext = React.createContext<NFTContextState>(contextDefaultValue)




export const NFTContextProvider = ({children}:NFTContextProviderProps) =>{

    const [connected, setConnected] = useState(false)
    const [account, setAccount] = useState("")
    const [metamaskPresent,setMetamaskPresent] = useState(false)
    const [nfts, setNfts] = useState<Array<object>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)




    let state ={
    connected,
    account,
    metamaskPresent,
    nfts,
    isLoading,
    setNfts,
    setIsLoading,
    setConnected,
    setAccount,
    setMetamaskPresent

    }
return (
    <NFTContext.Provider value={state}>
        {children}
    </NFTContext.Provider>
)
}



export default NFTContextProvider;

export const useNFTContext = () =>{
    return useContext(NFTContext)
}




