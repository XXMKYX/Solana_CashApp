import { useMemo, useEffect } from "react";
import { getAvatarUrl } from "../../functions/getAvatarUrl";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";

import { useState } from "react";

//To SmartContract in Anchor //
import {ACCOUNTS_PROGRAM_PUBKEY} from "../../constants"
import IDL from "../../constants/idl.json"
import * as anchor from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import {toast} from "react-hot-toast";
import parseJSON from "date-fns/parseJSON";
//---------------------------//

export const useCashApp = () => {
  const [avatar, setAvatar] = useState("");
  const [userAddress, setUserAddress] = useState("404");
  const { connected, publicKey, sendTransaction } = useWallet();

  // const [amount, setAmount] = useState(0)
  const [receiver, setReceiver] = useState("");
  const [transactionPurpose, setTransactionPurpose] = useState("");

  const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);
  const [newDepositModalOpen, setNewDepositModalOpen] = useState(false);

  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  //Local Storage
  const useLocalStorage = (storageKey, fallbackState) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, setValue]);
    return [value, setValue];
  };

  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [deposits, setdeposits] = useLocalStorage("deposit", []);

  // Get Avatar based on the userAddress
  useEffect(() => {
    if (connected) {
      setAvatar(getAvatarUrl(publicKey.toString()));
      setUserAddress(publicKey.toBase58());
    } else {
      setAvatar(getAvatarUrl("default"));
      setUserAddress("default");
    }
  }, [connected]);


//SmartContract Anhor //
const anchorWallet = useAnchorWallet()
const [initialized, setInitialized] = useState(false) //Comienza en false y cuando inicializa cambiaria a true
const [transactionPending, setTransactionPending] = useState(false)

//averigua que programa es
const program = useMemo (()=>{
    if(anchorWallet) {
        const provider = new anchor.AnchorProvider(connection,
        anchorWallet,anchor.AnchorProvider.defaultOptions())
  
        return new anchor.Program(IDL,ACCOUNTS_PROGRAM_PUBKEY,provider)
    }
},[connection, anchorWallet])

useEffect(()=>{
  const start = async () =>{ //Inicializa
      if(program && publicKey && !transactionPending){
          try {
              //Sustituye la accion de ingresar las seeds en solpg para obtener el userProfile
              const [profilePda] = await findProgramAddressSync([utf8.encode("USER_STATE"), //Encuenttra un PDA  con las seeds
              publicKey.toBuffer()],program.programId) //toBuffer da formato a la pubkey
              const profileAccount = await program.account.userProfile.fetch(profilePda) //Espera el perfil
              //Existe un userProfile?
              if(profileAccount){
                  setInitialized(true)//Carga todos los ItemsAccount
                  console.log("LOAD ITEMS")
                  console.log(profileAccount.authority.toJSON())
              }else{
                  //Inicializa uno nuevo Profile
                  console.log("Se requiere inicializar el usuario")
                  setInitialized(false)
              }

          } catch (error) {
              console.log(error)
              //setInitialized(false)
          }
      }
  }
  start()//call the function
},[publicKey, program, transactionPending]) //Sera cada que cambie la pubkey, program y trx

  //Funcion para inicializar (El usuario ya esta onChain)
const initializeUser = async()=>{
    if(program && publicKey){
        try {
            console.log("try")
            setTransactionPending(true)
            const[profilePda] = findProgramAddressSync([utf8.encode("USER_STATE"), //Encuenttra un PDA con las seeds
            publicKey.toBuffer()],program.programId)
            
            const tx = await program.methods
            .initializeUser()
            .accounts({
                userProfile: profilePda,
                authority: publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc()
            setInitialized(true)
            
            toast.success('Exito inicializando user')
        } catch (error) {
            console.log(error)
            toast.success('Inicializando user FAIL')
        } finally {
          setTransactionPending(false) //Para no ahcer refresh todo el tiempo
          setTransactionPending(false)
        }
    }
}



//--------------------//


  //Transaccion
  const makeTrasaction = async (fromWallet, toWallet, amount, reference) => {
    const network = WalletAdapterNetwork.Devnet;
    //endpoint = El RPC (Puede ser el de QuickNode)
    const endpoint = clusterApiUrl(network); //Default para la DevNet
    //Pluggin de conexion para nuestro endpoint
    const connection = new Connection(endpoint);
    //Obtencion del blockhash para introducir la transaccion
    const { blockhash } = await connection.getLatestBlockhash(
      "Get Latest Blockhask"
    );
    //#Objeto para la transaccion
    const transaccion = new Transaction({
      //Propiedades de la transaccion
      recentBlockhash: blockhash,
      feePayer: fromWallet, //La comision se cobra para quien transfiere/paga
    });
    //#Objeto para la instruccion
    //SytemProgram hace el handle de la transaccion
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: fromWallet,
      lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(), //Fragmenta Solana en unidades mas pequeñas
      toPubkey: toWallet,
    });
    //Query para la ref de la transaccion
    transferInstruction.keys.push({
      pubkey: reference,
      isSigner: false,
      isWritable: false,
    });
    transaccion.add(transferInstruction);

    return transaccion;
  };

  //Funcion para ejecutar la transaccion (Boton)
  const doTransaction = async ({ amount, receiver, transactionPurpose }) => {
    const fromWallet = publicKey;
    const toWallet = new PublicKey(receiver); //Toma el string y lo pasa como publicKey
    console.log(receiver);
    const bnAmount = new BigNumber(amount); //Details
    const reference = Keypair.generate().publicKey; //Random PublicKey para la ref
    const transaccion = await makeTrasaction(
      fromWallet,
      toWallet,
      bnAmount,
      reference
    );

    const txnHash = await sendTransaction(transaccion, connection);
    console.log(txnHash); //Visualizamos el hask para consultarlo en SolScan

    //Historial de transacciones
    const newID = (transactions.length + 1).toString(); //Comienza en 0, por eso + 1
    //Objeto (Se almacenara en el Array del LocalStorage)
    const newTransaction = {
      id: newID,
      from: {
        name: publicKey,
        handle: publicKey,
        avatar: avatar,
        verified: true,
      },
      to: {
        name: receiver,
        handle: "-",
        avatar: getAvatarUrl(receiver.toString()), //Se debe obtener en String ya que requerimos la PublicKey
        verified: false,
        txnHash: txnHash,
      },
      //Al seleccionar arrojara la descripcion
      description: transactionPurpose,
      transactionDate: new Date(),
      status: "Completed",
      amount: amount,
      source: "-",
      identifier: "-",
      //txnHash: txnHash
    };

    console.log(txnHash);
    setNewTransactionModalOpen(false); //Close modal
    setTransactions([newTransaction, ...transactions]); //... obtiene todo el array de transacciones de manera ordenada
  };

  return {
    connected,
    publicKey,
    avatar,
    setAvatar,
    userAddress,
    doTransaction,
    amount,
    setAmount,
    receiver,
    setReceiver,
    transactionPurpose,
    setTransactionPurpose,
    transactions,
    setTransactions,
    setNewTransactionModalOpen,
    newTransactionModalOpen,
    initialized,
    initializeUser,
    transactionPending
  };
};
