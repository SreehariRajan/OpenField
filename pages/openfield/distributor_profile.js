import Navbar from "@/components/navbar";
import React, { useContext, useEffect, useState } from "react";
import DetailsCard from "./components/DetailsCard";
import SoilTestResultsCard from "./components/SoilTestResultsCard";
import { pesticidesData, farmers, DistributorInfo } from "../_data.js";
import FarmerModal from "./components/FarmerModal";
import { ContractAddress } from "../../config";
import OpenField from "../../hardhat-openfield/artifacts/contracts/OpenField.sol/OpenField.json"
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { Context } from "@/context/Context";
import "@ethersproject/shims"


function distributor_profile(props) {
  let [modalVisible, setModalVisible] = useState(false);
  let [currentPesticide, setCurrentPesticide] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true)

  const handleSellButtonClick = (pesticide) => {
    setCurrentPesticide(pesticide);
    setModalVisible(true);
  };

  const [pesticidesData, setPesticidesData] = useState([])
  const { connectWallet, currentAccount } = useContext(Context);
  console.log(currentAccount)
  const router = useRouter()



  useEffect(() => {
    (async () => {
      if (currentAccount) {

        const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
        // const provider = new ethers.providers.JsonRpcProvider()
        const Contract = new ethers.Contract(ContractAddress, OpenField.abi, provider)

        const data_pest = await Contract.getPesticides();
        const farmers = await Contract.getAllFarmers();
        const data_prod = await Contract.getProducers();
        setPesticidesData(data_pest)
        setFarmers(farmers);


        // setLogs(data);
        // setLoading(false)
        setLoading(false);
        console.log(data_pest, "datas", data_prod)
      } else {
        router.push("/");
      }
    })()
  }, [currentAccount]);

  return (
    <div>
      <Navbar />
      <div className="text-black mt-28">
        <h1 className="text-3xl font-bold text-blue-500 mt-4 ml-16">Hi {DistributorInfo.DistributorName}</h1>
        <h1 className="text-xl font-bold mt-4 ml-16 opacity-[0.5]">Location: Hyderabad, India</h1>
        {/* <h1 className="text-xl font-bold mt-4 ml-16">Hi {DistributorInfo.DistributorName}</h1> */}
        <div className="flex ml-16">
          {/* <div className="w-1/2 ml-16"> */}
          {/* <DetailsCard
              userType={"Distributor"}
              farmerName={""}
              farmLocation={DistributorInfo.Outlet_loc}
              cropInfo={DistributorInfo.Instock}
            /> */}
          {/* </div> */}
          <div className="w-full flex items-left my-6">
            <div className="bg-white mt-4 font-bold rounded flex items-center">
              <h2 className="text-lg">
                No. of farmers as customers :
              </h2>
              <p className="text-red-700 ml-2"> 6</p>
            </div>
          </div>
        </div>

        <table className="w-3/4 ml-10  shadow-md border-2 rounded-lg mt-4 overflow-y-scroll">
          <thead>
            <tr>
              <th className="p-3 text-left">Pesticide Id</th>
              <th className="p-3 text-left">Batch No</th>
              <th className="p-3 text-left">Pesticide Name</th>
              <th className="p-3 text-left">Company Produced</th>
              {/* <th className="p-3 text-left">Targetted Pests</th> */}
            </tr>
          </thead>
          <tbody>
            {pesticidesData.map((fertilizer, index) => (
              <tr key={index}>
                <td className="p-3">{fertilizer.id.toNumber()}</td>
                <td className="p-3">{fertilizer.batchno}</td>
                <td className="p-3">{fertilizer.name}</td>
                <td className="p-3">{fertilizer.producer_name}</td>
                {/* <td className="p-3">{fertilizer.targetedPests}</td> */}
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleSellButtonClick(fertilizer)}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FarmerModal
        isOpen={modalVisible}
        pesticide={currentPesticide}
        farmers={farmers}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      {loading &&

        <div className="absolute top-0 w-screen h-screen bg-white flex items-center justify-center z-[10]">

          <span className="loading loading-ring loading-lg"></span>
        </div>
      }
    </div>
  );
}

export default distributor_profile;
