import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {PhantomWalletAdapter} from "@solana/wallet-adapter-wallets"
import { useMemo } from 'react';

const WalletConnectionProvider = ({children}) => {
    //E2E API Wallet por medio de useMEMO ReactHook 
    const endpoint = useMemo(() => "https://api.devnet.solana.com",[])
    //Wallet by phantom
    const wallet = useMemo(() => [new PhantomWalletAdapter()],[])

    return(
        <ConnectionProvider endpoint = {endpoint}>
            <WalletProvider wallets = {wallet} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>            
        </ConnectionProvider>
    )
}

export default WalletConnectionProvider