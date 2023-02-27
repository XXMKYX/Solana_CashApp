import { MirrorWorld, ClusterEnvironment, IUser } from "@mirrorworld/web3.js";
import Action from "./action";
import { useState, useEffect } from "react";

import { getAvatarUrl } from "../../functions/getAvatarUrl";
import {
  ClockIcon,
  ArrowsUpDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../utils/classNames";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css"); //Default Style to Wallet Connection button

const mirrorworld = new MirrorWorld({
  apiKey: "mw_vwRDYXmbncKDIM6BSF0Tl2PPISGpY4kQjuo",
  env: ClusterEnvironment.testnet, // Can be ClusterEnvionment.mainnet for mainnet
});

export default function NavMenu(props) {
  const { publicKey, setIndex, index, setAvatar, mainUser, setMainUser } =
    props;

  const [tokens, setTokens] = useState();

  async function login() {
    const { user } = await mirrorworld.login();
    let final = JSON.stringify(user);
    setMainUser(JSON.parse(final));
    await getTokens();
    setAvatar(getAvatarUrl(user["wallet"]["sol_address"]));
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

        {mainUser && (
          <div className="flex flex-1 flex-col justify-evenly">
            <MenuNavBar menus={menus} index={index} setIndex={setIndex} />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-end">
          {!mainUser ? (
            <>
              <div className="mb-40">
                <WalletMultiButton></WalletMultiButton>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {!publicKey && !mainUser ? (
          <>
            <button onClick={login} className="mb-10">
              ¿No tienes wallet?
            </button>
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
      <div>
        <li
          key={index}
          onClick={() => setIndex(subIndex)}
          className={classNames(
            "-mb-30 flex cursor-pointer space-x-3",
            index === subIndex
              ? "text-white"
              : "text-lightgray  transition-all hover:text-pink-500",
            "font-semibold"
          )}
        >
          <Icon className="h-6 w-6 " />
          <span>{item}</span>
        </li>
      </div>
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

/* 


{mirrorUser ? (
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

*/
