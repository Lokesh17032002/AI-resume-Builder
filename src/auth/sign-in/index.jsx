import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    // my-20 is margin y = 20 
    <div className='flex justify-center my-20 items-center'>
        {/* with this the whole sign in page content will appear which we had imported from clerk.com  */}
      <SignIn/>
    </div>
  )
}

export default SignInPage
