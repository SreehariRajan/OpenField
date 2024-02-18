import React, { useContext, useEffect, useState } from "react";
// import { farmers } from "../../_data";
import { handleSell } from "../utils";
import { Search } from "@mui/icons-material";
import { Context } from "@/context/Context";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { ContractAddress } from "@/config";
import OpenField from "../../../hardhat-openfield/artifacts/contracts/OpenField.sol/OpenField.json"
import Web3Modal from "web3modal";


const FarmerModal = ({ isOpen, onClose, farmers, pesticide, children }) => {
  const [search, setSearch] = useState("")
  const { connectWallet, currentAccount } = useContext(Context);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([])
  const [otp, setOtp] = useState("");
  console.log(farmers);
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  if (!isOpen) return null;

  const filtering = farmers.filter(item => {
    return search !== "" ? item.name.toLowerCase().includes(search.toLowerCase()) : item;
  })

  const handleSelect = (farmer, pesticide) => {
    // send OTP
    setShow(true);
    setSelected([pesticide.id, farmer.id])

  }

  const handleSubmit = async () => {
    if (currentAccount) {
      setLoading(true);
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()


      let contract = new ethers.Contract(ContractAddress, OpenField.abi, signer)
      let transaction = await contract.addPesticideFarmer(selected[0], selected[1], 10)
      await transaction.wait();
      console.log("succ")
      setLoading(false);
      setShow(false);
      setOtp("")
      // onClose()
      my_modal_2.showModal()
      // window.alert("Transaction successfull")
      // print()
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 25,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="flex flex-col justify-between z-10"
        style={{
          background: "white",
          height: 600,
          width: 900,
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
      >
        <div>

          <p className="font-bold mb-2">Select farmer</p>
          <input className="border w-full mb-5 px-2 py-1 rounded shadow" placeholder="Search here" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="z-[10] w-full h-64 overflow-scroll no-scrollbar overflow-x-hidden">
            {filtering.map((farmer, index) => {
              return (
                <div
                  className="rounded-lg shadow flex flex-row  mb-5 p-2 w-3/4"
                  onClick={() => {
                    handleSelect(farmer, pesticide);
                  }}
                >
                  <button className="flex flex-col  relative w-3/4">
                    <h3 className="text-bold text-sm opacity-[0.5] absolute top-2 left-2">Id : {farmer.id.toNumber()}</h3>
                    <h3 className="w-[30rem] font-bold">{farmer.name}   </h3>
                  </button>
                  <button className="ml-44 bg-blue-500 px-2 py-1 rounded-lg font-bold text-sm px-4">Select</button>
                </div>
              );
            })}
          </div>
        </div>
        {
          show &&
          <div className="w-full flex flex-col items-start">
            <p className="my-2">An OTP is sent to the farmer's phone number.</p>
            <input className="w-full mb-5 px-2 py-1 rounded shadow" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          </div>
        }
        {
          show &&
          <button className="with-fit rouned-lg bg-green-300 px-2 w-32 font-bold text-sm rounded py-2" onClick={() => handleSubmit()}>Confim</button>
        }
        <button
          className="with-fit rouned-lg bg-red-300 px-2 w-32 font-bold text-sm rounded py-2"
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
      {loading &&

        <div className="absolute top-0 w-screen h-screen bg-white flex items-center justify-center z-[10]">

          <span className="loading loading-ring loading-lg"></span>
        </div>
      }
      <dialog id="my_modal_2" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Successfull!</h3>
          <p class="py-4">Transaction successfull.</p>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};


export default FarmerModal;
