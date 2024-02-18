import Navbar from '@/components/navbar';
import Link from 'next/link'
import React from 'react';

function distributor_login(props) {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-28 text-center">
                <div className="flex justify-center space-x-4">
                    <Link href="/openfield/distributor_profile">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Dashboard
                        </button>
                    </Link>

                    <Link href="/openfield/product_display">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                           Product page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default distributor_login;