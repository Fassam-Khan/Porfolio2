"use client";


import { motion } from "framer-motion";
import React from 'react'
import Image from 'next/image'
import Button from "./Button";

const Hero = () => {
    return (
        <div className=" relative md:min-h-[550px] pt-6 overflow-hidden
        bg-[#0f0715]
        bg-[radial-gradient(circle_at_50%_0%,rgba(188,252,88,0.08),transparent_35%)]
        before:absolute before:inset-0
        before:bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
        before:bg-[size:45px_45px]
        before:pointer-events-none">
            <div className=' relative z-10
                    md:max-w-[1100px] m-auto mt-4
                    flex md:flex-row md:justify-between items-center  
                      flex-col justify-center   gap-2 px-4 
                    
                     '>

                {/* left div  */}
                <div className='md:w-[74%] '>

                    {/* top text  */}
                    <div className='word-rise inline-block md:text-[78px] text-4xl  text-gray-300 font-bold'>
                        <h2>
                            Building fast,
                            <span className=" bg-gradient-to-r from-[#BCFC58] to-[#7AEDB0] bg-clip-text text-transparent">
                                <br /> scalable web
                            </span>
                            <br />  products.
                        </h2>
                    </div>

                    {/* into text  */}
                    <div className='md:w-[70%] mt-6 text-sm  md:text-lg  text-sm   text-[var(--muted)]'>
                        <p>I'm <span className='text-white font-medium'>Muhammad Fassam Khan</span> — a Full Stack Developer & Team Lead building MERN and Next.js applications across e-commerce, business platforms, and modern web experiences.</p>
                    </div>

                    {/* work info  */}
                    <div className="flex gap-4 items-center mt-6 flex-wrap text-center">
                        <Button messgae={"View my work"} />
                        <button className='bg-[var(--mute)] rounded-full md:px-4 px-3 cursor-pointer border border-[var(--muted)] bg-[#0000008a] text-sm font-medium py-1 md:py-2'>Get in touch</button>
                        <button className='bg-[var(--mute)] rounded-full md:px-4 px-3 cursor-pointer bg-[#0000008a] text-sm font-medium py-1 md:py-2'>Download CV</button>



                    </div>
                </div>


                {/* right div */} 
                <div className="md:flex relative w-fit  hidden">



                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative w-fit"
                    >
                        {/* Soft gradient glow */}
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#BCFC58] to-[#7AEDB0] opacity-40 blur-2xl"></div>

                        {/* Gradient border */}
                        <div className="relative rounded-full bg-gradient-to-r from-[#BCFC58] to-[#7AEDB0] p-[3px]">
                            <div className="overflow-hidden rounded-full bg-[#0f0715]">
                                <Image
                                    src="/my2.png"
                                    width={350}
                                    height={350}
                                    alt="Fassam"
                                    className="block aspect-square h-[350px] w-[350px] rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

        </div>

    )
}

export default Hero
