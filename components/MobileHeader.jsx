import React from 'react'
import Image from 'next/image'
import Button from './Button'


const MobileHeader = () => {
    return (
        <div className='flex justify-between items-center mt-2  px-3'>
            <div className='flex gap-2'>
                {/* Image div  */}
                <div className='w-[45px] h-[45px] rounded-full border-2 border-[var(--accent)] flex justify-center items-center'>
                    <Image src={'/my2.png'} alt='Fassam Khan' width={45} height={45} className='object-cover rounded-full' />
                </div>
                <div>
                    <p className='font-medium'>M. Fassam Khan</p>
                    <p className='text-[var(--accent)] tracking-wide text-[12px] font-semibold'>Full  Stack  Doveloper</p>
                </div>
            </div>

            <div>
                <Button messgae={"Hire me"} />
            </div>

        </div>
    )
}

export default MobileHeader
