import { MirrorWorld, ClusterEnvironment, IUser } from "@mirrorworld/web3.js";
import Action from "./Action";
import { useState, useEffect } from "react";
const mirrorworld = new MirrorWorld({
  apiKey: "mw_vwRDYXmbncKDIM6BSF0Tl2PPISGpY4kQjuo",
  env: ClusterEnvironment.testnet, // Can be ClusterEnvionment.mainnet for mainnet
});

import {
  ClockIcon,
  ArrowsUpDownIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../utils/classNames";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { truncate } from "../../utils/string";
import Home from "../../pages";
import { useCashApp } from "../../pages/hooks/cashapp";
require("@solana/wallet-adapter-react-ui/styles.css"); //Default Style to Wallet Connection button
import { getAvatarUrl } from "../../functions/getAvatarUrl";

export default function NavMenu(props) {
  const [mainUser, setMainUser] = useState();
  const [tokens, setTokens] = useState();
  const { publicKey, setIndex, index } = props;
  const [avatar, setAvatar] = useState("");
  async function login() {
    const { user } = await mirrorworld.login();
    let final = JSON.stringify(user);
    setMainUser(JSON.parse(final));
    await getTokens();
  }

  async function transfer() {
    const transactionResult = await mirrorworld.transferSOL({
      recipientAddress,
      amount,
    });

    console.log("tx", transactionResult);
  }

  async function getTokens() {
    const data = await mirrorworld.getTokens();
    let final = JSON.stringify(data);
    setTokens(JSON.parse(final));
  }
  //let mirrorWallet = mainUser["wallet"]["sol_address"]
  //const mirrorUser = mainUser["username"]

  //console.log(mainUser["username"])
  // console.log(mirrorUser)
  //  publicKey =

  //console.log(mainUser.wallet.sol_address)
  const menus = [
    {
      icon: ClockIcon,
      item: "Activity",
      subIndex: 0,
    },
    {
      icon: ArrowsUpDownIcon,
      item: "Remesas",
      subIndex: 1,
    },
    {
      icon: Cog6ToothIcon,
      item: "Settings",
      subIndex: 2,
    },
  ];

  return (
    <>
      <nav className="flex flex-1 flex-col items-center justify-evenly">
        {publicKey && (
          <div className="flex flex-1 flex-col justify-evenly">
            <MenuNavBar menus={menus} index={index} setIndex={setIndex} />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-end">
          {mainUser ? (
            <></>
          ) : (
            <>
              <WalletMultiButton></WalletMultiButton>
            </>
          )}
        </div>

        {publicKey ? (
          <></>
        ) : (
          <>
            <button onClick={login}>¿No tienes wallet?</button>
          </>
        )}

        {mainUser ? (
          <>
            <div className="user-info">
              <div className="user-info__user">
                <ul>
                  <li>
                    ......................Username: {mainUser["username"]}
                  </li>
                  <li>
                    ......................SOL address:{" "}
                    {mainUser["wallet"]["sol_address"]}
                  </li>
                  <br></br>
                  <li>
                    ......................La implementacion de MirrorWorld como
                  </li>
                  <li>
                    ......................alternativa a phantom esta por
                    implementarce
                  </li>
                  <li>......................REFRESCA LA PAGINA Y ENTRA CON </li>
                  <li>......................PHANTOM</li>
                </ul>
              </div>

              {tokens ? (
                <>
                  <div className="user-info__tokens">
                    <ul>
                      <li>SOL: {tokens["sol"]}</li>
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}

function NavMenuItem(props) {
  const { setIndex, Icon, item, index, subIndex } = props;
  return (
    <>
      <li
        key={index}
        onClick={() => setIndex(subIndex)}
        className={classNames(
          "flex cursor-pointer space-x-3",
          index === subIndex
            ? "text-white"
            : "text-lightgray  transition-all hover:text-pink-500",
          "font-semibold"
        )}
      >
        <Icon className="h-6 w-6 " />
        <span>{item}</span>
      </li>
    </>
  );
}

function MenuNavBar(props) {
  const { menus, setIndex, index } = props;

  return (
    <>
      {menus.map((i, id) => (
        <NavMenuItem
          key={id}
          Icon={i.icon}
          item={i.item}
          subIndex={i.subIndex}
          index={index}
          setIndex={setIndex}
        />
      ))}
    </>
  );
}
