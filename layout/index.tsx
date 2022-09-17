import React from 'react';
import dynamic from 'next/dynamic'
const Header = dynamic(() => import("../components/Header"), { ssr: false }) //<- set SSr to false
// import Header from '../components/Header';
type Props = {
children?:React.ReactNode;
}

const LayOut = ({children}:Props) =>{
  return (
    <>
    <header>
        <Header/>
    </header>
    <main>
    {children}
    </main>
    </>
  )
}

export default LayOut