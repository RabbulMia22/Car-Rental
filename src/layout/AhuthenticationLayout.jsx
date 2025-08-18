import React from 'react'
import Logo from '../components/logo/Logo';
import { Outlet } from 'react-router-dom';

function AhuthenticationLayout() {
    return (
        <div>
            <div className=" bg-gray-100 ">
                <div className='max-w-7xl mx-auto pt-6'>
                    <Logo />
                </div>
                <div className="">
                    <div className=''>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AhuthenticationLayout;