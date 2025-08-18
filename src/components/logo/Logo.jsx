import React from 'react'
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <div className="flex items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-pointer">
               <Link to="/">
                 MyLogo
               </Link>
            </h1>
        </div>
    )
}

export default Logo;