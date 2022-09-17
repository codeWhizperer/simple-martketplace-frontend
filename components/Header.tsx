import React, { useState, useEffect } from "react";
import { navLink } from "../static/data";
// import AuthButton from "./AuthButton";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { toast } from "react-toastify";
import dynamic from 'next/dynamic'
const AuthButton = dynamic(() => import("../components/AuthButton"), { ssr: false }) //<- set SSr to false

function Header() {
  const { connect, error } = useConnect({ connector: new InjectedConnector() });
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

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
    <div className="bg-purple-500 flex items-center justify-between p-4">
      <ul className="flex space-x-12 items-center">
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
