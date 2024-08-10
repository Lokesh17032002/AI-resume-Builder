import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    //flex justify between is used to put the button on right top corner
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img src="/logo.svg" width={100} height={100} />

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
  );
}

export default Header;
