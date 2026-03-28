import React, { useState } from 'react'
import Navbar from './Navbar'

const Header = ({dark, setDark}) => {

  return (
    <>
      <header className=' p-3 w-full flex justify-between items-center border-b bg-linear-to-b from-slate-50 to-slate-200 dark:bg-linear-to-b dark:from-slate-800 dark:to-slate-900 text-slate-900 dark:text-slate-100'>

        <h1 className=' text-2xl font-bold'>
          Notes App
        </h1>

        <Navbar dark={dark} setDark={setDark}/>
      </header>
    </>
  )
}

export default Header