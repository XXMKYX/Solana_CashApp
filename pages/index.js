import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

/* Components */
import Action from "../components/header/action";
import NavMenu from "../components/header/navMenu";
import Profile from "../components/header/profile";
import SearchBar from "../components/home/searchBar";
import NewTransactionModal from "../components/transaction/newTransactionModal";
import TransactionsList from "../components/transaction/transactionsList";
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
    setAvatar,
    userAddress,
    transactions,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
  } = useCashApp(); //Es mejor pasarla po Hook que por Props ya que asi la podemos mandar donde sea y no solo al child

  const [index, setIndex] = useState(0);
  const sentTxs = transactions.filter((tx) => tx.from.name == userAddress);
  const rcvTxs = transactions.filter((tx) => tx.to.name == userAddress);
  const [qrCode, setQrCode] = useState(false);
  const [mirrorUser, setMirrorUser] = useState(undefined);
  const [mainUser, setMainUser] = useState();
  return (
    <div className="flex min-h-screen ">
      <LeftMenu
        avatar={avatar}
        setAvatar={setAvatar}
        userAddress={userAddress}
        publicKey={publicKey}
        connected={connected}
        index={index}
        setIndex={setIndex}
        newTransactionModalOpen={newTransactionModalOpen}
        setNewTransactionModalOpen={setNewTransactionModalOpen}
        mainUser={mainUser}
        setMainUser={setMainUser}
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
          mainUser={mainUser}
          setMainUser={setMainUser}
        />
      )}

      {mainUser && (
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
          mainUser={mainUser}
          setMainUser={setMainUser}
        />
      )}
    </div>
  );
}

function LeftMenu(props) {
  const { avatar, setAvatar, userAddress } = props;
  const { publicKey } = props;
  const { connected, index, setIndex } = props;
  const { mainUser, setMainUser } = props;
  return (
    <>
      <div className="flex w-[260px] flex-col bg-gradient-to-r from-indigo-800 via-purple-600 to-violet-600 p-11">
        <Profile
          avatar={avatar}
          userAddress={userAddress}
          mainUser={mainUser}
          setMainUser={setMainUser}
        />

        <NavMenu
          setAvatar={setAvatar}
          connected={connected}
          publicKey={publicKey}
          index={index}
          setIndex={setIndex}
          mainUser={mainUser}
          setMainUser={setMainUser}
        />
      </div>
    </>
  );
}

function RightMenu(props) {
  const { index } = props;
  const { connected, sentTxs } = props;
  const { rcvTxs } = props;
  const {
    userAddress,
    publicKey,
    qrCode,
    setQrCode,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
  } = props;
  const { mainUser, setMainUser } = props;
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
          mainUser={mainUser}
          userAddress={userAddress}
          myKey={publicKey}
          qrCode={qrCode}
          setQrCode={setQrCode}
          newTransactionModalOpen={newTransactionModalOpen}
          setNewTransactionModalOpen={setNewTransactionModalOpen}
        />
      )}
      <div className="absolute !flex !flex-col !justify-end "></div>
    </>
  );
}
