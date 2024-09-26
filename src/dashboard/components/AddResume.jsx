import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
// imported dialog from shadcn.com 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid'
import GlobalApi from './../../../service/GlobalApi.js'
import { useUser } from '@clerk/clerk-react'
  

function AddResume() {
    const [openDialog,setOpenDialog]=useState(false)
    const [resumeTitle, setResumeTitle]=useState()
    const {user}=useUser() 
    const [loading,setLoading]=useState(false)

    const onCreate =async()=>{
        setLoading(true)
        // unique id 
        const uuid =uuidv4();;
        // console.log(resumeTitle,uuid)
        const data ={
            data:{
                Title: resumeTitle,
                resumeId: uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        };
        console.log(data); // Add this before the API call to see the data object in the console
        GlobalApi.CreateNewResume(data).then(resp=>{
            console.log(resp)
            if(resp){
                setLoading(false)
            }
        },(error)=>{
            console.error('Error creating resume:', error); // Log the error
            setLoading(false)
        })
    };

  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
      hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' 
      onClick={()=>setOpenDialog(true)}> 
        {/* when we installed shadcn this luicide react library also gets installed with it  */}
        <PlusSquare/>
      </div>

      <Dialog open={openDialog}> 
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                <p>Add title for your new resume.</p>
                <Input className="my-2" placeholder="Ex. Full Stack Resume" onChange={(e)=>setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className='flex justify-end gap-5'>
            {/* variant="ghost" removes the bg color for the button  */}
                <Button variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                <Button disabled={!resumeTitle || loading} onClick={()=>onCreate()}>
                    {loading?
                        <Loader2 className='animate-spin'/> : 'Create'
                    }
                    Create</Button>
            </div>
            </DialogHeader>
        </DialogContent>
     </Dialog>
    </div>

    
  )
}

export default AddResume
