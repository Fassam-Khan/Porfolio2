import React from 'react'

const Button = ({ messgae }) => {
  return (
    <>
      <button className='md:px-4 px-3 bg-[var(--accent)] cursor-pointer rounded-full  text-black text-sm font-medium md:py-2 flex justify-center items-center gap-1 py-1'>{messgae}</button>

    </>
  )
}

export default Button
