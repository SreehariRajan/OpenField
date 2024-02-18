import Navbar from '@/components/navbar';
import React, { useContext, useEffect, useState } from 'react';
import DetailsCard from '../components/DetailsCard';
import SoilTestResultsCard from '../components/SoilTestResultsCard';
import SoilTestResultsCard2 from '../components/SoilTestResultsCard2';
import { Context } from '@/context/Context';
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import "@ethersproject/shims"
import { ContractAddress } from "../../../config";
import OpenField from "../../../hardhat-openfield/artifacts/contracts/OpenField.sol/OpenField.json"

function farmer_profile(props) {

    const { connectWallet, currentAccount } = useContext(Context);
    console.log(currentAccount)
    const router = useRouter()
    const query = router.query;

    const [pesticidesData, setPesticidesData] = useState([]);
    const [farmer, setFarmer] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            // if (currentAccount) {

            const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/A0WsVMwzZrhZNtpslk8RDsbxZvHGvyfL")
            // const provider = new ethers.providers.JsonRpcProvider()
            const Contract = new ethers.Contract(ContractAddress, OpenField.abi, provider)

            const data_farmer = await Contract.getFamerById(query.id)

            const data_pest = await Contract.getFarmersPesticidesById(query.id);

            setPesticidesData(data_pest)
            setFarmer(data_farmer)
            setLoading(false);


            // setLogs(data);
            // setLoading(false)
            console.log(data_pest, "datas")
            // } else {
            //     router.push("/");
            // }
        })()
    }, [currentAccount]);

    // const pesticidesData = [
    //     { pesticideId: 1, batchNo: 'ABC123', pesticideName: 'Pesticide A', ingredients: 'Ingredient X', quantity: 15, applicationMethod: 'Spray', companyProduced: 'Company X', targetedPests: 'Pests A' },
    //     { pesticideId: 2, batchNo: 'DEF456', pesticideName: 'Pesticide B', ingredients: 'Ingredient Y', quantity: 20, applicationMethod: 'Dust', companyProduced: 'Company Y', targetedPests: 'Pests B' },
    //     { pesticideId: 3, batchNo: 'GHI789', pesticideName: 'Pesticide C', ingredients: 'Ingredient Z', quantity: 25, applicationMethod: 'Liquid', companyProduced: 'Company Z', targetedPests: 'Pests C' },
    //     { pesticideId: 4, batchNo: 'JKL012', pesticideName: 'Pesticide D', ingredients: 'Ingredient W', quantity: 30, applicationMethod: 'Granules', companyProduced: 'Company W', targetedPests: 'Pests D' },
    //     { pesticideId: 5, batchNo: 'MNO345', pesticideName: 'Pesticide E', ingredients: 'Ingredient P', quantity: 12, applicationMethod: 'Mist', companyProduced: 'Company P', targetedPests: 'Pests E' },
    //     { pesticideId: 6, batchNo: 'PQR678', pesticideName: 'Pesticide F', ingredients: 'Ingredient Q', quantity: 18, applicationMethod: 'Foam', companyProduced: 'Company Q', targetedPests: 'Pests F' },
    //     { pesticideId: 7, batchNo: 'STU901', pesticideName: 'Pesticide G', ingredients: 'Ingredient R', quantity: 22, applicationMethod: 'Bait', companyProduced: 'Company R', targetedPests: 'Pests G' },
    //     { pesticideId: 8, batchNo: 'VWX234', pesticideName: 'Pesticide H', ingredients: 'Ingredient S', quantity: 14, applicationMethod: 'Drench', companyProduced: 'Company S', targetedPests: 'Pests H' },
    //     { pesticideId: 9, batchNo: 'YZA567', pesticideName: 'Pesticide I', ingredients: 'Ingredient T', quantity: 28, applicationMethod: 'Smoke', companyProduced: 'Company T', targetedPests: 'Pests I' },
    //     { pesticideId: 10, batchNo: 'BCD890', pesticideName: 'Pesticide J', ingredients: 'Ingredient U', quantity: 35, applicationMethod: 'Injection', companyProduced: 'Company U', targetedPests: 'Pests J' },
    // ];
    const farmerInfo = {
        farmerName: 'Ashwin Binu',
        farmLocation: 'Kollam, Kerala',
        cropInformation: 'Corn',
        cropRotationHistory: '',
        harvestRecords: 'No records available',
        organicFarmingCertification: 'Certified',
    };


    return (
        <div className='overflow-x-hidden'>
            <Navbar />
            <div className='text-black mt-28 flex flex-row w-screen'>
                {/* <h1 className="text-3xl font-bold text-blue-500 mt-4 ml-16">Hi {farmerInfo.farmerName}</h1> */}
                <div className='w-3/4'>
                    <h5 className="mb-1 text-lg font-medium leading-tight text-black px-10 opacity-[0.5]">
                        Farmer Details
                    </h5>
                    <div className="flex justify-between w-full px-10">
                        <div className="w-1/2 min-h-64">
                            {
                                farmer != null &&
                                <DetailsCard
                                    userType={'Farmer'}
                                    farmerName={farmer.name}
                                    farmLocation={farmer.location}
                                    cropInfo={farmerInfo.cropInformation}
                                />
                            }
                        </div>
                        <div className='w-1/2 flex pr-5 justify-between'>

                            <div className="w-1/2">
                                <SoilTestResultsCard soilTestResults />
                            </div>
                            <div className="w-1/2 ml-3">
                                <SoilTestResultsCard2 soilTestResults />
                            </div>
                        </div>

                    </div>

                    <div className='w-full flex flex-row justify-between  px-10 items-between'>
                        <table className='w-full border-2 overflow-x-hidden rounded  shadow-lg rounded-lg mt-4'>
                            <thead>
                                <tr >
                                    <th className='p-3 text-center text-left'>Pesticide Id</th>
                                    <th className='p-3 text-center text-left'>Batch No</th>
                                    <th className='p-3 text-center text-left'>Pesticide Name</th>
                                    <th className='p-3 text-center text-left'>ingredients</th>
                                    <th className='p-3 text-center text-left'>Quantity</th>
                                    <th className='p-3 text-center text-left'>Manufactured date</th>
                                    <th className='p-3 text-center text-left'>Expiry date</th>
                                    {/* <th className='p-3 text-center text-left'>Targetted Pests</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {pesticidesData.map((fertilizer, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 text-center border-b">{fertilizer.id.toNumber()}</td>
                                        <td className="py-2 px-4 text-center border-b">{fertilizer.batchno}</td>
                                        <td className="py-2 px-4 text-center border-b">{fertilizer.name}</td>
                                        <td className="py-2 px-4 text-center border-b">{fertilizer.ingredient}</td>
                                        <td className="py-2 px-4 text-center border-b">{fertilizer.quantity.toNumber()}</td>
                                        <td className="py-2 px-4 text-center border-b">{fertilizer.manufacture_date}</td>
                                        <td className="py-2 px-4 text-center border-b">{fertilizer.expiry_date}</td>
                                    </tr>
                                ))}
                                {pesticidesData.length == 0 && <p className='w-full text-center py-5'>No records</p>}
                            </tbody>
                        </table>
                        {/* <div className="w-1/2 mt-5 mr-20 ml-20">
                        <SoilTestResultsCard soilTestResults />
                    </div> */}
                    </div>
                </div>
                <div className='w-1/4 pr-10'>
                    <div className="w-full h-[85vh]">
                        <div className="bg-white p-4 rounded border-2 shadow">
                            <h2 className="text-lg font-semibold mb-2">Organic Certification</h2>
                            <p className="text-red-700">Status: Not approved</p>
                        </div>
                        <div className='bg-white border-2 h-3/4 flex flex-col items-center shadow'>

                            <h1 className='text-center text-lg font-semibold border-b-2 mt-3'>Notifications</h1>
                            <div className='overflow-y-auto no-scrollbar scroll-auto animate-pulse '>
                                <h1>New Stocks Available</h1>
                                <h1>Price drop for RTX234</h1>
                                <h1>5% Off in Ventura pvt.ltd</h1>
                                <h1>5% Off in Ventura pvt.ltd</h1>
                                <h1>Audit report alert!!</h1>
                                <h1>New Stocks Available</h1>
                                <h1>Price drop for RTX234</h1>
                                <h1>5% Off in Ventura pvt.ltd</h1>
                                <h1>5% Off in Ventura pvt.ltd</h1>
                                <h1>Audit report alert!!</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading &&

                <div className="absolute top-0 w-screen h-screen bg-white flex items-center justify-center z-[10]">

                    <span className="loading loading-ring loading-lg"></span>
                </div>
            }
        </div>
    );
}

export default farmer_profile;
