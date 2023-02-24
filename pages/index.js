import { useState, useEffect } from "react";
import Action from "../components/header/Action";
import NavMenu from "../components/header/NavMenu";
import Profile from "../components/header/Profile";
import SearchBar from "../components/home/SearchBar";
import NewTransactionModal from "../components/transaction/NewTransactionModal";
import TransactionsList from "../components/transaction/TransactionsList";
import { useWallet } from "@solana/wallet-adapter-react";
import TransactionQRModal from "../components/transaction/TransactionQRModal";
//import { transactions } from '../data/transactions'
import { getAvatarUrl } from "../functions/getAvatarUrl";
//Hoock customizado para la conexion
import { useCashApp } from "./hooks/cashapp";

const Home = () => {
  //const { connected, publicKey} = useWallet() //Ahora es un hook from hooks/cashapp.js
  const {
    connected,
    publicKey,
    avatar,
    userAddress,
    transactions,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
  } = useCashApp(); //Es mejor pasarla po Hook que por Props ya que asi la podemos mandar donde sea y no solo al child
  //console.log(connected, "Conexion a la Wallet exitosa")
  //console.log(publicKey.toString(), "PublicKey")
  //const [userAddress, setUserAddress] = useState("11111111111111111111111111111111")
  //const [avatar, setAvatar] = useState("")
  //console.log(transactions,"Transaccion")
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  //const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)

  const sentTxs = transactions.filter((tx) => tx.from.name == userAddress);
  const rcvTxs = transactions.filter((tx) => tx.to.name == userAddress);

  const [qrCode, setQrCode] = useState(false);

  return (
    <div className="flex min-h-screen ">
      <header className="flex w-[260px] flex-col bg-gradient-to-r from-indigo-800 via-purple-600 to-violet-600 p-11">
        <Profile
          setModalOpen={setTransactionQRModalOpen}
          avatar={avatar}
          userAddress={userAddress}
        />
        <TransactionQRModal
          modalOpen={transactionQRModalOpen}
          setModalOpen={setTransactionQRModalOpen}
          userAddress={userAddress}
          myKey={publicKey}
          qrCode={qrCode}
          setQrCode={setQrCode}
        />

        <NavMenu connected={connected} publicKey={publicKey} />

        <Action setModalOpen={setNewTransactionModalOpen} />
        <NewTransactionModal
          modalOpen={newTransactionModalOpen}
          setModalOpen={setNewTransactionModalOpen}
        />
      </header>

      <main className="flex flex-1 flex-col">
        <SearchBar />
        <TransactionsList
          title={"Txs Transactions"}
          connected={connected}
          transactions={sentTxs}
        />
        <TransactionsList
          title={"Rxs Transactions"}
          connected={connected}
          transactions={rcvTxs}
        />
      </main>
    </div>
  );
};

export default Home;
