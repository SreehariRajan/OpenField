import Image from "next/image";
import homeimg from '../assets/images/homeimg.png'
import logo from '../assets/images/logo3.jpg'
import Link from "next/link";
export default function Home() {
    return (
        <div className="w-full h-screen ">
            <div className="h-20 w-full flex flex-row">
                <Image src={logo} className="h-20 w-20" />
                <div className='flex flex-col'>
                    <h2 className='font-bold'>Government of India</h2><h2 className='font-semibold'>
                        Ministry of Agriculture and Farmers Welfare
                    </h2>
                    <h2 className='font-semibold'>Department of Agriculture and Farmers Welfare</h2>

                </div>

            </div>
            <div className="text-white h-10 px-10 flex flex-row items-center justify-between bg-green-600">
                <div className="flex flex-row text-lg ">
                    <h1 className="pr-3">Home |</h1>
                    <h1 className="pr-3">About |</h1>
                    <h1 className="pr-3">Online Services |</h1>
                    <h1 className="pr-3">Markets |</h1>
                    <h1 className="pr-3">Contact Us |</h1>
                </div>
                <h1>Login</h1>
            </div>
            <div>
                <Image src={homeimg} alt="" />

            </div>


            <div className="mt-8 flex flex-row text-white mx-3">
                <div className="w-[90rem] mx-1 rounded-lg shadow-md h-44 bg-red-400 flex flex-col  items-center  ">
                    <h1 className="text-2xl border-b-2 w-full text-center mb-6">Services</h1>
                    {/* <hr className="bg-white" > */}
                    <h2>Agmarket</h2>
                    <Link href="/openfield">OpenField</Link>
                    <h2>Soil Health Card</h2>
                    <h2>Weather</h2>

                </div>
                <div className="w-[90rem] mx-1 rounded-lg shadow-md  flex flex-col  items-center h-44 bg-blue-400 ">
                    <h1 className="text-2xl border-b-2 w-full text-center mb-8">Farmers Registered</h1>
                    {/* <hr className="bg-white" > */}
                    <h2>Individual

                        :	41,76,144</h2>
                    <h2>Group

                        :	39,614</h2>
                    <h2>Institution

                        :	590
                    </h2>

                </div>
                <div className="w-[90rem] mx-1 rounded-lg shadow-md h-44 bg-yellow-400 flex flex-col  items-center ">
                    <h1 className="text-2xl border-b-2 w-full text-center mb-8">Service Applications
                    </h1>
                    {/* <hr className="bg-white" > */}
                    <h2>
                        Service Applications
                        Received(No)

                        :	50,97,104</h2>
                    <h2>Approved(No)

                        :	46,32,718</h2>
                    <h2>Rejected/Returned(No)

                        :	4,10,279</h2>

                </div>
                <div className="w-[90rem] mx-1 rounded-lg shadow-md h-44 bg-orange-400 flex flex-col  items-center ">
                    <h1 className="text-2xl border-b-2 w-full text-center ">DBT</h1>
                    {/* <hr className="bg-white" > */}
                    <div className="flex flex-col justify-center h-full">
                        <h2>No of beneficiaries

                            :	4,24,737</h2>
                        <h2>Benefit Transfered(Lakhs)

                            :	24771.68</h2>
                    </div>
                </div>

            </div>

        </div>
    );
}
