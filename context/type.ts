export type NFTContextState = {
    connected: boolean;
    account:string;
    metamaskPresent:boolean;
    setConnected: (status:boolean) => void
    setAccount:(address:string) => void
    setMetamaskPresent:(status:boolean) => void
}