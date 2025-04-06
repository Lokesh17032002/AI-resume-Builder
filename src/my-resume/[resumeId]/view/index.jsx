import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi.js';
import { RWebShare } from 'react-web-share'

const ViewResume = () => {
    const [resumeInfo, setResumeInfo] = useState();
    const {resumeId} = useParams()

    useEffect(()=>{
        GetResumeInfo()
    })

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data)
            setResumeInfo(resp.data.data)
        })
    }

    const HandleDownload = () => {
        window.print();
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div>
            <div id="no-print">
                <Header/>

                <div className='my-10 mx:10 md:mx-20 lg:mx-30'>
                    <h2 className='text-center text-2xl font-medium'>Congratulations! Your resume is ready.</h2>
                    <p className='text-center text-gray-400'>You can download or share link for your resume.</p>

                    <div className='flex justify-between px-40 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        {/* Used React-Web-Share to share the link of the resume with everyone */}
                        <RWebShare
                            data={
                                {
                                    text: "Please open the linnk to see the resume.",
                                    url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                                    title: resumeInfo?.firsName + " " + resumeInfo?.lastName + " resume",
                                }} 
                            onClick={() => console.log("shared successfully!")}>
                            <Button>Share 🔗</Button>
                        </RWebShare>
                    </div>
                </div>

            </div>
             
            <div id="print-area">
                <ResumePreview/>
            </div>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
