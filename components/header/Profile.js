import { truncate } from "../../utils/string";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile(props) {
  const { avatar, userAddress, mainUser, setMainUser } = props;

  const notify = () => toast("Wallet copied to clipboard");

  return (
    <>
      <div
        onClick={() => {
          if (userAddress != "default")
            navigator.clipboard.writeText(userAddress);
          if (mainUser)
            navigator.clipboard.writeText(mainUser["wallet"]["sol_address"]);

          if (userAddress != "default" || mainUser) notify();
        }}
        className="flex cursor-pointer flex-col items-center space-y-3"
      >
        <div className="h-16 w-16 rounded-full border-2 border-white">
          <img
            className="h-full w-full rounded-full object-cover"
            src={avatar}
          />
        </div>
        <div className="flex flex-col items-center space-y-1">
          {mainUser ? (
            <>
              <p className="font-semibold text-white">
                {truncate(mainUser["wallet"]["sol_address"]) /*userAddress*/}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">
                {truncate(userAddress) /*userAddress*/}
              </p>
            </>
          )}
        </div>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="dark"
          pauseOnHover={false}
        />
      </div>
    </>
  );
}
