import React from "react";
import Modal from "../modal";
import YouTube from "react-youtube";

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

export default function TransactionWithdrawExample(props) {
  const { modalVideoOpen, setModalVideoOpen } = props;

  return (
    <>
      <ModalQR modalOpen={modalVideoOpen} setModalOpen={setModalVideoOpen} />
    </>
  );
}

function ModalQR(props) {
  const { setModalOpen, modalOpen } = props;
  const opts = {
    height: "600",
    width: "380",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className=" container mx-auto flex w-96 flex-col !items-center !justify-center space-y-1 overflow-auto text-center">
        <p className="h1">¡Ya puedes retirar dinero en OXXO con Decaf!</p>
        <YouTube videoId="DsPYtP8XXzM" opts={opts} />
        <a
          href="https://gold-fox-b82.notion.site/Pasos-para-retirar-efectivo-en-cualquier-sucursal-MoneyGram-93639e30b2b44f52947a4fcd421050d3"
          className="w-full rounded-lg bg-[#16d542] p-2 hover:bg-opacity-70"
          target="_blank"
        >
          <span className="font-medium text-white">
            Instrucciones detalladas
          </span>
        </a>
      </div>
    </Modal>
  );
}
