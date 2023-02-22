import { useState,useEffect } from "react";
import { getAvatarUrl } from "../../functions/getAvatarUrl";
import {WalletAdapterNerwork} from "@solana/wallet-adapter-base";
import {useConnection, useWallet } from "@solana/wallet-adapter-react";
import {clusterApiUrl, Connection,Keypair,LAMPORTS_PER_SOL,SystemProgram,Transaction} from "@solana/web3.js"; 
import BigNumber from 'bignumber.js';

export const useCashApp = () =>{

    const {connected,publicKey} = useWallet()
    const [avatar, setAvatar] = useState("")
    const [userAddress, setUserAddress] = useState("11111111111111111111111111111111")
    // Get Avatar based on the userAddress
    useEffect(() => {
        if(connected){
            setAvatar(getAvatarUrl(publicKey.toString()))
            setUserAddress(publicKey.toString())
        }else{
            setAvatar(getAvatarUrl('default'))
            setUserAddress('default')
        }
    })

    return{connected,publicKey,avatar,userAddress}
}