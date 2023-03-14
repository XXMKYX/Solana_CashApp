import React from "react";

import { useState } from "react";

import TransactionQRModal from "../../transaction/transactionQRModal";
import TransactionQRSendModal from "../../transaction/transactionQRSendModal";
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
      <div className="container mx-auto flex items-center !justify-evenly sm:flex-col md:flex-col lg:flex-row ">
        <div
          className="... flex cursor-pointer flex-col items-center space-y-3 border-4 border-dashed bg-pink-500 p-10 "
          onClick={() => {
            setQrCode(false);
            setModalVideoOpen(false);
            setModalSendOpen(!modalSendOpen);
          }}
        >
          <p className="text-[#fff] hover:text-xl">Enviar</p>
        </div>
        <div
          className="... flex cursor-pointer flex-col items-center space-y-3 border-4 border-dashed bg-pink-500 p-10 "
          onClick={() => {
            setQrCode(false);
            setModalVideoOpen(true);
          }}
        >
          <p className="text-[#fff] hover:text-xl">¿Cómo retirar?</p>
        </div>
        <div
          className="... flex cursor-pointer flex-col items-center space-y-3 border-4 border-dashed bg-pink-500 p-10 "
          onClick={() => {
            setQrCode(false);
            setModalVideoOpen(false);
            setModalOpen(!modalOpen);
          }}
        >
          <p className="text-[#fff] hover:text-xl">Recibir</p>
        </div>
      </div>
    </>
  );
}
