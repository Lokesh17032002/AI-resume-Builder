import PersonalDetailPreview from '@/dashboard/components/preview/PersonalDetailPreview'
import React, { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import SummeryPreview from '@/dashboard/components/preview/SummeryPreview'
import ExperiencePreview from '@/dashboard/components/preview/ExperiencePreview'
import EducationalPreview from '@/dashboard/components/preview/EducationalPreview'
import SkillsPreview from '@/dashboard/components/preview/SkillsPreview'


function ResumePreview() {

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{borderColor: resumeInfo?.themeColor}}>   
        {/* PERSONAL DETAILS  */}
            <PersonalDetailPreview resumeInfo = {resumeInfo}/>
        {/* SUMMERY  */}
            <SummeryPreview resumeInfo = {resumeInfo}/>
        {/* PROFESSIONAL EXPERIENCE  */}
            <ExperiencePreview resumeInfo = {resumeInfo}/>
        {/* EDUCATION  */}
            <EducationalPreview resumeInfo={resumeInfo}/>
        {/* SKILLS  */}
            <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
