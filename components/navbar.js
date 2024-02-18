import { Context } from '@/context/Context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function Navbar(props) {
    const { connectWallet, currentAccount } = useContext(Context);
    const router = useRouter()
    const handleLogin = async (item) => {
        await connectWallet();
        router.push(item[1])
    }
    return (


        <div className="navbar bg-green-600 text-black max-w-screen text-white font-bold  fixed top-0 left-0 w-full z-[30]">
            <div className="flex-1">
                <Link href={"/openfield"} className="btn btn-ghost text-xl">OpenField</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={"/openfield/crops"}>Crops</Link></li>
                    <li>
                        <details>
                            <summary>
                                Login as
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none text-black">
                                {
                                    [
                                        ["Farmer", "/openfield/farmer_profile/5"],
                                        ["Distributor", "/openfield/distributor_profile"],
                                        ["Regulatory board", "/openfield/regulatory_board_profile"],
                                        ["Producer", "/openfield/producer_profile/1"]
                                    ].map((item, ind) => {
                                        return (
                                            <li key={ind}>

                                                <button key={ind} onClick={() => handleLogin(item)}>{item[0]}</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default Navbar;