import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {PhantomWalletAdapter} from "@solana/wallet-adapter-wallets"
import { useMemo, useState } from 'react';
//Provider para la App
const WalletConnectionProvider = ({children}) => {
    //E2E API Wallet por medio de useMEMO ReactHook //https://api.devnet.solana.com para Phanthom
    const endpoint = useMemo(() => "https://cosmopolitan-greatest-spree.solana-devnet.discover.quiknode.pro/25d435dd5973454c5b9c044f298b0f3a1132c2a4/",[])
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