/*

import Modal from "../Modal";
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

const TransactionQRModal = ({
  modalOpen,
  setModalOpen,
  userAddress,
  setQrCode,
}) => {
  const qrRef = useRef();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  console.log(publicKey?.toBase58());
  // Estado true to rerender QR
  const loadQr = () => {
    setQrCode(true);
  };

  useEffect(() => {
    if (publicKey) {
      console.log(publicKey.toString());
      const recipient = new PublicKey(publicKey.toJSON()); //PublicKey(userAddress)
      const amount = new BigNumber("1"); //Estatico, el QR enviara 1 SOL
      const reference = Keypair.generate().publicKey; //random keypair
      const label = "Sol payments app";
      const message = "Ty 4 ur payment!";
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
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }
    }
  }),
    [publicKey];

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <div ref={qrRef} />
        </div>

        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="text-lg font-medium text-gray-800">
            {truncate(userAddress)}
          </p>

          <p className="text-sm font-light text-gray-600">
            Scan to pay ${truncate(userAddress)}
          </p>

          <button
            onClick={() => loadQr()}
            className="w-full rounded-lg bg-[#16d542] py-3 hover:bg-opacity-70"
          >
            <span className="font-medium text-white">Load QR code</span>
          </button>
          <button className="w-full rounded-lg bg-[#16d542] py-3 hover:bg-opacity-70">
            <span className="font-medium text-white">Download QR code</span>
          </button>
        </div>
      </div>
    </Modal>
  );

  
};

export default TransactionQRModal;


*/
