import React from "react";
import Modal from "../modal";
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
import { useEffect, useRef, useState } from "react";
import { truncate } from "../../utils/string";
import bs58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";

export default function TransactionQRModal(props) {
  const { modalOpen, setModalOpen, mainUser, setQrCode, qrCode } = props;
  const [qtySol, setQtySol] = useState(1);

  const qrRef = useRef();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      if (!modalOpen) setQrCode(false);
      const recipient = new PublicKey(publicKey.toJSON()); //PublicKey(userAddress)
      const amount = new BigNumber(qtySol); //Estatico, el QR enviara 1 SOL
      const reference = Keypair.generate().publicKey; //random keypair
      const label = "SOL Payment";
      const message = "Thank you!";
      //Parametros que generara el QR
      const urlParams = {
        recipient,
        amount,
        reference,
        label,
        message,
      };
      const url = encodeURL(urlParams);
      const qr = createQR(url, 369, "transparent"); //Diseño QR
      //Validacion qrRef en HTML
      if (qrRef.current) {
        if (qrCode) {
          qrRef.current.innerHTML = "";
          qr.append(qrRef.current);
        } else {
          qrRef.current.innerHTML = null;
        }
      }
    }
  }, [qrCode]);

  if (!publicKey) {
    console.log("publicKey is null / not logged");
    return null;
  }

  return (
    <>
      <ModalQR
        qrCode={qrCode}
        setQrCode={setQrCode}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        qrRef={qrRef}
        userAddress={publicKey.toString()}
        qtySol={qtySol}
        setQtySol={setQtySol}
      />
    </>
  );
}

function ModalQR(props) {
  const {
    qtySol,
    setQtySol,
    setQrCode,
    qrCode,
    setModalOpen,
    modalOpen,
    qrRef,
    userAddress,
  } = props;
  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="container mx-auto flex flex-col !items-center !justify-center space-y-1 text-center">
        <div>
          <div ref={qrRef} />
        </div>

        <div className="">
          <p className="text-center text-lg font-medium text-gray-800">
            {userAddress}
          </p>
          <p className="text-md text-center font-light text-gray-600">
            Indica cantidad de SOL a recibir
          </p>
          <input
            type="number"
            required
            className="!my-2 rounded-md bg-gray-200 p-2 text-center"
            placeholder="1 SOL"
            disabled={qrCode}
            value={qtySol}
            onChange={(e) => {
              setQtySol(e.currentTarget.value);
            }}
          />
        </div>

        <div className="flex !justify-start">
          {!qrCode && (
            <button
              onClick={() => {
                if (qtySol > 0) setQrCode(!qrCode);
                else alert("Pon cantidad válida de SOL");
              }}
              className="mr-5 w-full rounded-lg bg-[#16d542] p-2 hover:bg-opacity-70"
            >
              <span className="font-medium text-white">
                {qrCode ? <>Hide QR code</> : <>Show QR code</>}
              </span>
            </button>
          )}

          {qrCode && (
            <>
              <button
                onClick={() => {
                  setQrCode(!qrCode);
                }}
                className="w-full rounded-lg bg-[#16d542] p-2 hover:bg-opacity-70"
              >
                <span className="font-medium text-white">Modify QR Code</span>
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
