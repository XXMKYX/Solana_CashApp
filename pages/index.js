import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

/* Components */
import Action from "../components/header/Action";
import NavMenu from "../components/header/NavMenu";
import Profile from "../components/header/Profile";
import SearchBar from "../components/home/SearchBar";
import NewTransactionModal from "../components/transaction/NewTransactionModal";
import TransactionsList from "../components/transaction/TransactionsList";
import TransactionQRModal from "../components/transaction/transactionQRModal";
import Remesas from "../components/main/remesas/remesas";

/* Methods */
import { getAvatarUrl } from "../functions/getAvatarUrl";
import { useCashApp } from "./hooks/cashapp";
//import FabIcon from "../components/chat/fab/fabIcon";

export default function Home() {
  const {
    connected,
    publicKey,
    avatar,
    userAddress,
    transactions,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
  } = useCashApp(); //Es mejor pasarla po Hook que por Props ya que asi la podemos mandar donde sea y no solo al child

  const [index, setIndex] = useState(0);
  const sentTxs = transactions.filter((tx) => tx.from.name == userAddress);
  const rcvTxs = transactions.filter((tx) => tx.to.name == userAddress);

  const [qrCode, setQrCode] = useState(false);

  return (
    <div className="flex min-h-screen ">
      <LeftMenu
        avatar={avatar}
        userAddress={userAddress}
        publicKey={publicKey}
        connected={connected}
        index={index}
        setIndex={setIndex}
        newTransactionModalOpen={newTransactionModalOpen}
        setNewTransactionModalOpen={setNewTransactionModalOpen}
      />

      {publicKey && (
        <RightMenu
          connected={connected}
          sentTxs={sentTxs}
          rcvTxs={rcvTxs}
          avatar={avatar}
          userAddress={userAddress}
          publicKey={publicKey}
          qrCode={qrCode}
          setQrCode={setQrCode}
          index={index}
          setIndex={setIndex}
          newTransactionModalOpen={newTransactionModalOpen}
          setNewTransactionModalOpen={setNewTransactionModalOpen}
        />
      )}
    </div>
  );
}

function LeftMenu(props) {
  const { avatar, userAddress } = props;
  const { publicKey } = props;
  const { connected, index, setIndex } = props;
  const { newTransactionModalOpen, setNewTransactionModalOpen } = props;

  return (
    <>
      <div className="flex w-[260px] flex-col bg-gradient-to-r from-indigo-800 via-purple-600 to-violet-600 p-11">
        <Profile avatar={avatar} userAddress={userAddress} />

        <NavMenu
          connected={connected}
          publicKey={publicKey}
          index={index}
          setIndex={setIndex}
        />
      </div>
    </>
  );
}

function RightMenu(props) {
  const { index } = props;
  const { connected, sentTxs } = props;
  const { rcvTxs } = props;
  const { userAddress, publicKey, qrCode, setQrCode } = props;

  return (
    <>
      {
        //Historial de transacciones
        index === 0 && (
          <div className="flex flex-1 flex-col">
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
          </div>
        )
      }

      {index === 1 && (
        <Remesas
          userAddress={userAddress}
          myKey={publicKey}
          qrCode={qrCode}
          setQrCode={setQrCode}
        />
      )}
      <div className="absolute !flex !flex-col !justify-end "></div>
    </>
  );
}
