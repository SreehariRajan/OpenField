import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { ContractAddress } from "../config";
import OpenField from "../hardhat-openfield/artifacts/contracts/OpenField.sol/OpenField.json"
import { useRouter } from "next/router";

export const Context = createContext();

let eth;

if (typeof window !== "undefined") {
    eth = window.ethereum;
};
export const ContextProvider = ({ children }) => {

    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState();
    const [notification, setNotification] = useState("");
    const [loadingC, setLoadingC] = useState(false);
    const connectWallet = async (metamask = eth) => {
        try {
            if (!metamask) return alert("Please install metamask");
            const accounts = await metamask.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            console.log(accounts)
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object.');
        }

    };

    if (currentAccount) {

        const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
        // const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
        const openField = new ethers.Contract(ContractAddress, OpenField.abi, provider)
        // openField.on("NewFarmer", (o) => {
        //     console.log("new case", o)
        //     setNotification("new-case");
        // })
    }

    useEffect(() => {
        if (!currentAccount)
            router.push("/")
    }, [currentAccount])

    return (
        <Context.Provider
            value={{
                currentAccount,
                connectWallet,
                notification,
                setNotification,
                loadingC,
                setLoadingC

            }}
        >
            {children}
        </Context.Provider>
    )
}