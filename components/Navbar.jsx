import { useSession } from 'next-auth/react'
import React from 'react'
import {AiOutlineArrowLeft} from "react-icons/ai"
import {FcLock} from 'react-icons/fc'

const Navbar = () => {
    const {data:session} = useSession()
  return (
    <nav  className="px-4 cursor-pointer gap-5 flex h-[4rem] items-center z-[999] font-bold top-0 sticky bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <AiOutlineArrowLeft className='cursor-pointer'/>
        <h1 className='text-[1.3rem] flex items-center gap-2'>{session?.user.name} <FcLock/></h1>
    </nav>
  )
}

export default Navbar