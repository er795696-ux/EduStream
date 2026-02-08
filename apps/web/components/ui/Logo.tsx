import React from 'react'
import { GraduationCap } from "lucide-react"
const Logo = () => {
    return (
        <div className='flex items-center gap-3'>
            <div className="w-fit bg-main p-2 rounded-md ">
                <GraduationCap width={35} height={35} />
            </div>
            <p className='text-2xl font-bold'>EduStream</p>
        </div>
    )
}

export default Logo