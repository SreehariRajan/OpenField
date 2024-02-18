import Navbar from '@/components/navbar';
import React, { useContext, useEffect, useState } from 'react';
import DetailsCard from './components/DetailsCard';
import { Context } from '@/context/Context';
import { ContractAddress } from "../../config";
import OpenField from "../../hardhat-openfield/artifacts/contracts/OpenField.sol/OpenField.json"
import { useRouter } from 'next/router';
// import { ethers } from "ethers";
import "@ethersproject/shims"


function crops(props) {
    // const { connectWallet, currentAccount } = useContext(Context);
    // console.log(currentAccount)
    const router = useRouter()
    // const query = router.query;
    // console.log(query.id_);
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

        setLoading(false)
    }, [])

    // useEffect(() => {
    //     (async () => {
    //         // if (currentAccount) {

    //         const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
    //         // const provider = new ethers.providers.JsonRpcProvider()
    //         const Contract = new ethers.Contract(ContractAddress, OpenField.abi, provider)
    //         const data_producer = await Contract.getProducerById(query.id);
    //         const data = await Contract.getProcudersPesticides(query.id);
    //         setProducer(data_producer)
    //         setPesticidesData(data)
    //         setLoading(false);

    //         // setLogs(data);
    //         // setLoading(false)
    //         console.log(data, "datas")
    //         // } else {
    //         //   router.push("/");
    //         // }
    //     })()
    // }, [currentAccount]);

    const crops_details = [
        {
            name: "Corn",
            table: [
                {
                    farmer: "Ashwin",
                    b_no: "B009",
                    farmer_id: "5",
                    pest_id: "4",
                    fertilizer: "Rock phospahate",
                    qtd: "20",

                },
                {
                    farmer: "Nooha",
                    b_no: "B008",
                    farmer_id: "2",
                    pest_id: "2",
                    fertilizer: "Ammonium phospahate",
                    qtd: "60",

                },
            ],
        },
        {
            name: "Rice",
            table: [
                {
                    farmer: "Asher",
                    b_no: "B002",
                    farmer_id: "3",
                    pest_id: "1",
                    fertilizer: "Rock phospahate",
                    qtd: "20",

                },
                {
                    farmer: "Niha",
                    b_no: "B010",
                    farmer_id: "6",
                    pest_id: "5",
                    fertilizer: "Ammonium phospahate",
                    qtd: "8",

                },
            ],
        },
    ]




    return (
        <div>
            <Navbar />
            <div className='text-black mt-28 px-10'>
                <h5 className="mb-1 text-lg font-medium leading-tight text-black px-10 opacity-[0.5]">
                    Crop Details
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
                {crops_details.map((item, ind) => {
                    return (

                        <>
                            <p className='font-bold p-2'>{item.name}</p>
                            <table table className="min-w-full mb-10 bg-white border border-gray-300 px-10 rounded">
                                <thead>
                                    <tr>
                                        <th className="py-2 text-center px-4 border-b">Farmer ID</th>
                                        <th className="py-2 text-center px-4 border-b">Farmer name</th>
                                        <th className="py-2 text-center px-4 border-b">Pesticide ID</th>
                                        <th className="py-2 text-center px-4 border-b">Pesticide name</th>
                                        <th className="py-2 text-center px-4 border-b">Batch No</th>
                                        <th className="py-2 text-center px-4 border-b">Quantity</th>
                                        {/* <th className="py-2 text-center px-4 border-b">Ingredient Info</th>
                                        <th className="py-2 text-center px-4 border-b">Manufacturing Date</th>
                                        <th className="py-2 text-center px-4 border-b">Expiring Date</th> */}
                                        {/* <th className="py-2 px-4 border-b">Distributor Status</th>
              <th className="py-2 px-4 border-b">Distributor Company</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.table.map((pesticide, ind) => (
                                        <tr key={ind}>
                                            <td className="py-2 text-center px-4 border-b">{pesticide.farmer_id}</td>
                                            <td className="py-2 text-center px-4 border-b">{pesticide.farmer}</td>
                                            <td className="py-2 text-center px-4 border-b">{pesticide.pest_id}</td>
                                            <td className="py-2 text-center px-4 border-b">{pesticide.fertilizer}</td>
                                            <td className="py-2 text-center px-4 border-b">{pesticide.b_no}</td>
                                            <td className="py-2 text-center px-4 border-b">{pesticide.qtd}</td>
                                            {/* <td className="py-2 px-4 border-b">{pesticide.distributer_info.status}</td>
                <td className="py-2 px-4 border-b">{pesticide.distributer_info.company_name}</td> */}
                                        </tr>
                                    ))}
                                    {/* {pesticidesData.length == 0 && <p className='w-full text-center py-5'>No records</p>} */}

                                </tbody>
                            </table>
                        </>
                    )
                }
                )}
            </div>
            {
                loading &&

                <div className="absolute top-0 w-screen h-screen bg-white flex items-center justify-center z-[10]">

                    <span className="loading loading-ring loading-lg"></span>
                </div>
            }
        </div >
    );
}

export default crops;
