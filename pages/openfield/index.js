import Navbar from "@/components/navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import SoilTestResultsCard from "./components/SoilTestResultsCard";
import { ContractAddress } from "@/config";
import OpenField from "../../hardhat-openfield/artifacts/contracts/OpenField.sol/OpenField.json"
import { ethers } from "ethers"
import "@ethersproject/shims"

// import { Map } from '@esri/react-arcgis';
// import CustomMap from "@/components/CustomMap";
// import { Spinner } from "@material-tailwind/react";

function openfield(props) {
  const farmerss = [
    {
      name: "Sreehari",
      rating: "3.5",
      latitude: "19.582563",
      longitude: "79.958195",
    },
    {
      name: "Ashwin",
      rating: "4.5",
      latitude: "19.685004",
      longitude: "77.693475",
    },
    {
      name: "Nooha",
      rating: "4.5",
      latitude: "13.870080",
      longitude: "77.228188",
    },
    {
      name: "Asher",
      rating: "4.9",
      latitude: "16.372851",
      longitude: "79.976603",
    },
  ];
  const producerss = [
    {
      name: "Sreehari",
      rating: "3.5",
      latitude: "23.172684",
      longitude: "71.850477",
    },
    {
      name: "Ashwin",
      rating: "4.5",
      latitude: "26.427293",
      longitude: "82.385190",
    },

  ];

  const [farmers, setFarmers] = useState([])
  const [producers, setproducers] = useState([])
  const [markers, setMarkers] = useState([])

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {


      const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
      // const provider = new ethers.providers.JsonRpcProvider()
      const Contract = new ethers.Contract(ContractAddress, OpenField.abi, provider)

      const data_farmers = await Contract.getAllFarmers();
      const data_prod = await Contract.getProducers();
      const data_pest = await Contract.getFarmersPesticidesById(1);

      console.log(data_pest)
      // setPesticidesData(data_pest)
      setFarmers(data_farmers);
      setproducers(data_prod)

      data_prod.map((prod, ind) => {
        data_pest.map((pest, in2) => {
          console.log(pest.producer_id, prod.id)
          if (pest.producer_id.toNumber() === prod.id.toNumber()) {
            console.log("uuu")
            setMarkers(state => [...state, [[Number(prod.latitude), Number(prod.longitude)], [Number("71.850477"), Number("23.172684")]]])
          }
        })
      })

      setLoading(false);



      // setLogs(data);
      // setLoading(false)
      console.log(data_farmers, "datas", data_prod)

    })()
  }, []);

  console.log(markers)
  return (
    <div>
      <Navbar />
      {/* <span className="loading loading-dots loading-md"></span> */}
      <div className="flex flex-col">
        <div className="w-full rounded-lg h-screen  relative  ">
          <iframe
            style={{ pointerEvents: "none" }}
            className="absolute z-0"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            id="gmap_canvas"
            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20Bengaluru+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed&z=6"
          ></iframe>
          {/* <Map  class="full-screen-map" /> */}
          {/* <Map class="full-screen-map"> */}

          {/* <CustomMap markers={markers} producers={producerss} farmers={farmerss} />
        </Map> */}
          <a href="https://www.krankenversicherungsvergleich.at/">
            Zusatzversicherung Vergleich
          </a>
          <script
            type="text/javascript"
            src="https://embedmaps.com/google-maps-authorization/script.js?id=9ab34e5f13f68669c6803a130144e0e2aa069edb"
          ></script>
          <div className="w-full h-full relative">
            {farmers.map((item, ind) => {
              return (
                <Link
                  style={{ top: item.latitude, left: item.longitude }}
                  href={"/openfield/farmer_profile/" + item.id}
                  className={`absolute`}
                >
                  <div className="h-64 absolute group ">
                    <FaLocationDot className="absolute left-0 text-red-600 text-3xl z-[1]" />
                    <div className="hidden group-hover:block absolute z-[2] right-0 text-black shadow-2xl backdrop-blur-md flex flex-col items-start p-4 rounded-md min-w-64">
                      <p className=" font-bold border-b">Farmer</p>
                      <p className="">Name: {item.name}</p>
                      <p className="">Place: {item.location}</p>
                      {/* <p className=" font-bold text-xl">{item.rating}/5</p> */}
                    </div>
                  </div>
                </Link>
              );
            })}
            {producers.map((item, ind) => {
              return (
                <Link
                  style={{ top: item.latitude, left: item.longitude }}
                  href={"/openfield/producer_profile/" + item.id}
                  className={`absolute`}
                >
                  <div className="h-64 absolute group">
                    <FaLocationDot className="absolute left-0 text-blue-600 text-3xl z-[1]" />
                    <div className="hidden group-hover:block absolute z-[2] right-0 text-black shadow-2xl backdrop-blur-md flex flex-col items-start p-4 rounded-md min-w-64">
                      <p className=" font-bold border-b">Producer</p>
                      <p className="">Name: {item.name}</p>
                      <p className="">Place: {item.location}</p>
                      {/* <p className=" font-bold text-xl">{item.rating}/5</p> */}
                    </div>
                  </div>
                </Link>
              );
            })}
            {/* <svg className="absolute" width="500" height="500"><line x1="50%" y1="50" x2="350" y2="350" stroke="black" /></svg> */}
          </div>
        </div>
        {/* <div>
          <div className="flex flex-row">
            <div className="w-fit h-fit ">
              <SoilTestResultsCard />
            </div>
            <div className="ml-5 w-fit h-fit ">
              <SoilTestResultsCard />
            </div>
          </div>
          <div className="flex flex-col items-center mt-10 justify-center font-extrabold">
            <button className="px-2 w-64 mb-8 rounded-lg py-1 bg-red-500 text-white">
              Producers
            </button>
            <button className="px-2 w-64 mb-8 rounded-lg py-1 bg-yellow-300 text-white">
              Distributors
            </button>
            <button className="px-2 w-64 mb-8 rounded-lg py-1 bg-green-400 text-white">
              Consumers
            </button>
            <button className="px-2 w-64 mb-8 rounded-lg py-1 bg-blue-500 text-white">
              Joint
            </button>
          </div>
        </div> */}
      </div>
      {loading &&

        <div className="absolute top-0 w-screen h-screen bg-white flex items-center justify-center z-[10]">

          <span className="loading loading-ring loading-lg"></span>
        </div>
      }

    </div >
  );
}

export default openfield;
