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
require("@solana/wallet-adapter-react-ui/styles.css"); //Default Style to Wallet Connection button

export default function NavMenu(props) {
  const { publicKey, setIndex, index } = props;
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
          <WalletMultiButton></WalletMultiButton>
        </div>
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
