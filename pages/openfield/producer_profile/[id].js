import Navbar from '@/components/navbar';
import React, { useContext, useEffect, useState } from 'react';
import DetailsCard from '../components/DetailsCard';
import { Context } from '@/context/Context';
import { ContractAddress } from "../../../config";
import OpenField from "../../../hardhat-openfield/artifacts/contracts/OpenField.sol/OpenField.json"
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import "@ethersproject/shims"


function producer_profile(props) {
    const { connectWallet, currentAccount } = useContext(Context);
    console.log(currentAccount)
    const router = useRouter()
    const query = router.query;
    console.log(query.id_);
    const [pesticidesData, setPesticidesData] = useState([]);
    const [producer, setProducer] = useState(null)
    const [loading, setLoading] = useState(true)

    const producerInfo = {
        producerName: 'Producer ABC',
        prodLocation: 'Farmville, USA',
        Certification_Status: 'Valid until 23/04/2027',
        id: "1"
    };

    useEffect(() => {
        (async () => {
            // if (currentAccount) {

            const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
            // const provider = new ethers.providers.JsonRpcProvider()
            const Contract = new ethers.Contract(ContractAddress, OpenField.abi, provider)
            const data_producer = await Contract.getProducerById(query.id);
            const data = await Contract.getProcudersPesticides(query.id);
            setProducer(data_producer)
            setPesticidesData(data)
            setLoading(false);

            // setLogs(data);
            // setLoading(false)
            console.log(data, "datas")
            // } else {
            //   router.push("/");
            // }
        })()
    }, [currentAccount]);




    return (
        <div>
            <Navbar />
            <div className='text-black mt-28 px-10'>
                <h5 className="mb-1 text-lg font-medium leading-tight text-black px-10 opacity-[0.5]">
                    Factory Details
                </h5>
                {/* <h1 className="text-3xl font-bold text-blue-500 mt-4 ml-16">Hi</h1> */}
                <div className="w-1/2">
                    {
                        producer != null &&
                        <DetailsCard
                            userType={'Producer'}
                            farmerName={producer.name}
                            farmLocation={producer.location}
                            cropInfo={producerInfo.Certification_Status}
                        />
                    }
                </div>
                <table className="min-w-full bg-white border border-gray-300 px-10 rounded">
                    <thead>
                        <tr>
                            <th className="py-2 text-center px-4 border-b">Pesticide ID</th>
                            <th className="py-2 text-center px-4 border-b">Batch No</th>
                            <th className="py-2 text-center px-4 border-b">Ingredient Info</th>
                            <th className="py-2 text-center px-4 border-b">Manufacturing Date</th>
                            <th className="py-2 text-center px-4 border-b">Expiring Date</th>
                            {/* <th className="py-2 px-4 border-b">Distributor Status</th>
              <th className="py-2 px-4 border-b">Distributor Company</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {pesticidesData.map((pesticide, ind) => (
                            <tr key={ind}>
                                <td className="py-2 text-center px-4 border-b">{pesticide.id.toNumber()}</td>
                                <td className="py-2 text-center px-4 border-b">{pesticide.batchno}</td>
                                <td className="py-2 text-center px-4 border-b">{pesticide.ingredient}</td>
                                <td className="py-2 text-center px-4 border-b">{pesticide.manufacture_date}</td>
                                <td className="py-2 text-center px-4 border-b">{pesticide.expiry_date}</td>
                                {/* <td className="py-2 px-4 border-b">{pesticide.distributer_info.status}</td>
                <td className="py-2 px-4 border-b">{pesticide.distributer_info.company_name}</td> */}
                            </tr>
                        ))}
                        {pesticidesData.length == 0 && <p className='w-full text-center py-5'>No records</p>}

                    </tbody>
                </table>
            </div>
            {loading &&

                <div className="absolute top-0 w-screen h-screen bg-white flex items-center justify-center z-[10]">

                    <span className="loading loading-ring loading-lg"></span>
                </div>
            }
        </div>
    );
}

export default producer_profile;
