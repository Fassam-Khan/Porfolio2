import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='border rounded-full sticky top-2 flex gap-6 justify-center w-fit pr-6 border-[var(--muted)]'>

            {/* Image div  */}
            <div className='w-[55px] h-[55px] rounded-full border-2 border-[var(--accent)] flex justify-center items-center'>
                <Image src={'/my2.png'} alt='Fassam Khan' width={55} height={55} className='object-cover rounded-full' />
            </div>

            <nav className="flex">
                <ul className="flex items-center gap-8 ">
                    <li className="font-medium text-[var(--muted)] hover:text-white transition-colors cursor-pointer">
                        About
                    </li>

                    <li className="font-medium text-[var(--muted)] hover:text-white transition-colors cursor-pointer">
                        Experience
                    </li>

                    <li className="font-medium text-[var(--muted)] hover:text-white transition-colors cursor-pointer">
                        Work
                    </li>

                    <li className="font-medium text-[var(--muted)] hover:text-white transition-colors cursor-pointer">
                        Skills
                    </li>

                    <li className="font-medium text-[var(--muted)] hover:text-white transition-colors cursor-pointer">
                        Contact
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default Header
