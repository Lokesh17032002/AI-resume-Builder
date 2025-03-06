import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
// import component-name  
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'

function App() {
  const [count, setCount] = useState(0)
  // this useUser hook will give us the user information (fetching data from useUser hook)
  const {user, isLoaded,isSignedIn} = useUser();

  //if not signed in then navigate to sign in page (isloaded is also added because if not added then even after signing in
  // it will redirect us to /auth/sign-in because it takes time to load)  
  if(!isSignedIn && isLoaded){
    return <Navigate to = {'/auth/sign-in'}/>
  }

  return (
    <>
      <Header/>
      {/* whatever the children u are rendering inside this app layout , it will render through this outlet method/component  */}
      <Outlet/>
      <Toaster/>
    </>
  )
}

export default App
