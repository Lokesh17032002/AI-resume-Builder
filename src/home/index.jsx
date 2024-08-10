import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'

function Home() {
  return (
    <div>
        <Header/>
        Landing Screen 
        {/* User profile icon will appear after adding this  */}
        {/* <UserButton/> */}
    </div>
  )
}

export default Home
