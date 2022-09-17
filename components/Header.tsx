import React, { useState, useEffect } from "react";
import { navLink } from "../static/data";
// import AuthButton from "./AuthButton";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const AuthButton = dynamic(() => import("../components/AuthButton"), {
  ssr: false,
}); //<- set SSr to false
import { GiHamburgerMenu } from "react-icons/gi";
import {ImCancelCircle} from "react-icons/im"

function Header() {
  const { connect, error } = useConnect({ connector: new InjectedConnector() });
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const [show, setShow] = useState<boolean>(false);

  const showNavBar = () => {
    setShow(!show);
  };

  const Button = () => {
    return (
      <button
        onClick={() => connect()}
        className="text-white border-2 p-2 bg-transparent pl-4 pr-4"
      >
        Connect Wallet
      </button>
    );
  };

  let Connected;

  if (!isConnected) {
    Connected = <Button />;
  } else {
    Connected = <AuthButton />;
  }

  useEffect(() => {
    if (error?.name === "ConnectorNotFoundERror") {
      toast.error("Metamask extension require to you to connect!");
    }

    if (isConnected && chain?.id !== 5) {
      toast.error("Please connect to goerli network");
    }
  }, [error, chain, isConnected, address]);

  return (
    <div className="bg-purple-500 flex justify-between md:flex items-center md:justify-between lg:flex items-center lg:justify-between p-4">
      <div onClick={showNavBar} className="md:hidden lg:hidden">
        <GiHamburgerMenu  color="#fff" size={25} />{" "}
      </div>
      {show && (
        <div className="relative md:hidden lg:hidden">
        <div className="absolute overlay">
          <div>
            <div onClick={showNavBar} className="p-4"><ImCancelCircle size={25} color="#fff" /></div>
            <div className="flex justify-center p-12">
        <ul className="block md:flex md:space-x-12 md:items-center lg:flex lg:space-x-12 lg:items-center">
          {navLink.map((nav, idx) => {
            return (
              <li className="my-5 text-center text-white capitalize" key={idx}>
                <a href={nav.link}>{nav.value}</a>
              </li>
            );
          })}
        </ul>
        </div>
        </div>
        </div>
        </div>
      )}

      <ul className="hidden md:flex md:space-x-12 md:items-center lg:flex lg:space-x-12 lg:items-center">
        {navLink.map((nav, idx) => {
          return (
            <li className="text-white capitalize" key={idx}>
              <a href={nav.link}>{nav.value}</a>
            </li>
          );
        })}
      </ul>
      {Connected}
    </div>
  );
}

export default Header;
