"use client"
import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';


const About = () => {
    return (
        <div className='max-w-[1100px] m-auto px-4 py-8 md:flex md:justify-between gap-6'>
            {/* Left box  */}
            <div className='md:w-[75%] md:block flex flex-col gap-3'>
                {/* heading  */}
                <div className='mb-4'>
                    <p className='text-sm text-[var(--accent)]'>01 - ABOUT</p>
                </div>

                {/* main title  */}
                <div>
                    <h2 className='md:text-4xl tex-3xl font-bold'>Frontend Developer | Aspiring Full-Stack Developer</h2>
                </div>

                {/* mobile image  */}
                <div className='md:hidden'>
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
                                    width={300}
                                    height={300}
                                    alt="Fassam"
                                    className="block aspect-square h-[300px] w-[300px] rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* description  */}
                <div className='mt-6 md:text-lg text-sm mb-4 '>
                    <p>I’m a Frontend Developer passionate about creating modern, responsive, and user-friendly web applications. I specialize in React.js, Next.js, JavaScript, Tailwind CSS, and modern UI technologies, while also building my knowledge of backend development with APIs, Firebase, and MongoDB. I’m always learning, building, and improving my skills to grow as a Full-Stack Developer.</p>
                </div>
            </div>

            {/* rigtht box  */}

            <div>
                <div className='border border-[var(--muted)] px-4 py-2 mt-4  md:px-6 md:py-4 rounded flex flex-col gap-4 bg-[#00000041]'>
                    <div>
                        <p className='text-sm text-[var(--accent)] font-semibold'>Education</p>

                    </div>

                    <div>
                        <p className='text-sm text-[var(--muted)] font-semibold'>Inter Computer Science</p>
                        <p>Govt PECHS Education Foundation Science College </p>
                        <p className='text-sm text-[var(--muted)]  '> 2024-2026</p>

                    </div>

                    <div>
                        <p className='text-sm text-[var(--muted)] font-semibold'>I completed my Intermediate in Computer Science with 60% marks.</p>


                    </div>


                </div>

            </div>

        </div>
    )
}

export default About
