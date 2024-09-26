import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import SignIn from './auth/sign-in/index.jsx' 
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
// import { Home } from 'lucide-react' 
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
// this is test
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// Step-1 create const router
const router = createBrowserRouter([
  {
    // Here We are crearing the After app page from the diagram in copy 
    element: <App/>,
    // Adding Subroutes 
    children: [
      
      {
        path: '/dashboard',
        element: <Dashboard/> 
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      }
    ]
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path: 'auth/sign-in',
    element: <SignInPage/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Step-2  change <app/> */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router = {router} />
    </ClerkProvider>
  </StrictMode>,
)
