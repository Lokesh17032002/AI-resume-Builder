import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header2() {
  const { user, isSignedIn } = useUser();
  const navigation = useNavigate();

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <div>
        <img src="/logo.svg" width={100} height={100} />
      </div>

      

      <div className="flex items-center gap-20 pr-5">

        <div className="flex gap-20 text-lg font-medium mt-3 pr-5">
            <div className="italic" onClick={()=>{
              <Link to={''}/>
            }}>About</div>
            <div className="italic">Use Cases</div>
            <div className="italic">Pricing</div>
        </div>

        {isSignedIn ?
          // if isSignedIn is true then whatever inside div will be executed  
          <div className="flex gap-2 items-center">
              <Link to={'/dashboard'}>
                  <Button variant ="outline">Dashboard</Button>
              </Link>
            
            <UserButton />
          </div>
        : 
          //otherwise this link will be executed    
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        }
      </div>

      
    </div>
  );
}

export default Header2;
