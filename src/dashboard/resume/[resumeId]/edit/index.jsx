import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';


function EditResume() {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState()

    useEffect(()=>{
        //console.log(params)
        //console.log(params.resumeId)
        setResumeInfo(dummy)
    },[])

  return (
    <ResumeInfoContext.Provider value ={{resumeInfo, setResumeInfo}}>
      <div className='grid grid-cols-1: md grid-cols-2 p-10 gap-10'>
        {/* FORM SECTION */}
        <FormSection/>

        {/* PREVIEW SECTION  */}
        <ResumePreview/>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
