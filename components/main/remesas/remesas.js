import React from "react";
import {
  createQR,
  encodeURL,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import { PublicKey, Keypair } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { truncate } from "../../../utils/string";
import { useWallet } from "@solana/wallet-adapter-react";

import TransactionQRModal from "../../transaction/transactionQRModal";
import TransactionQRSendModal from "../../transaction/transactionQRSendModal";
import Modal from "../../modal";
import TransactionWithdrawExample from "../../transaction/transactionWithdrawExample";

export default function Remesas(props) {
  const {
    setQrCode,
    qrCode,
    txs,
    publicKey,
    mainUser,
    newTransactionModalOpen,
    setNewTransactionModalOpen,
  } = props;
  console.log(mainUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSendOpen, setModalSendOpen] = useState(false);
  const [modalVideoOpen, setModalVideoOpen] = useState(false);
  return (
    <>
      <MainRemesas
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setModalSendOpen={setModalSendOpen}
        modalSendOpen={modalSendOpen}
        setQrCode={setQrCode}
        setModalVideoOpen={setModalVideoOpen}
      />
      {modalOpen && (
        <div className="!flex !flex-col !items-center justify-center space-y-1">
          <TransactionQRModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            myKey={publicKey}
            qrCode={qrCode}
            setQrCode={setQrCode}
            setModalVideoOpen={setModalVideoOpen}
          />
        </div>
      )}

      {modalVideoOpen && (
        <TransactionWithdrawExample
          modalVideoOpen={modalVideoOpen}
          setModalVideoOpen={setModalVideoOpen}
        />
      )}

      {modalSendOpen && (
        <TransactionQRSendModal
          modalOpen={modalSendOpen}
          setModalOpen={setModalSendOpen}
          myKey={publicKey}
          qrCode={qrCode}
          setQrCode={setQrCode}
          newTransactionModalOpen={newTransactionModalOpen}
          setNewTransactionModalOpen={setNewTransactionModalOpen}
        />
      )}
    </>
  );
}

function MainRemesas(props) {
  const {
    modalOpen,
    setModalOpen,
    modalSendOpen,
    setModalSendOpen,
    setQrCode,
    setModalVideoOpen,
    modalVideoOpen,
  } = props;

  return (
    <>
      <div className="container mx-auto flex items-center !justify-evenly sm:flex-col md:flex-col lg:flex-row">
        <div
          className="bg-slate-200 lg:py-72 lg:px-28 "
          onClick={() => {
            setQrCode(false);
            setModalVideoOpen(false);
            setModalSendOpen(!modalSendOpen);
          }}
        >
          <p>Enviar</p>
        </div>
        <div
          className="bg-slate-200 lg:py-72 lg:px-8"
          onClick={() => {
            setQrCode(false);
            setModalVideoOpen(true);
          }}
        >
          <p>¿Cómo retirar?</p>
        </div>
        <div
          className="bg-slate-200 lg:py-72 lg:px-28"
          onClick={() => {
            setQrCode(false);
            setModalVideoOpen(false);
            setModalOpen(!modalOpen);
          }}
        >
          <p>Recibir</p>
        </div>
      </div>
    </>
  );
}
