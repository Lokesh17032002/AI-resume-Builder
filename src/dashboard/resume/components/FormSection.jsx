import { Button } from '@/components/ui/button'
import Education from '@/dashboard/components/forms/Education'
import Experience from '@/dashboard/components/forms/Experience'
import PersonalDetails from '@/dashboard/components/forms/PersonalDetails'
import Summery from '@/dashboard/components/forms/Summery'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'

function FormSection() {

  const [activeFormIndex, setActiveFormIndex] = useState(1) 
  const [enableNext, setEnableNext] = useState(false)

  return (
    <div>
      <h1>
          <div>
            <div className='flex justify-between items-center'>
              <Button variant="outline" size="sm" className="flex gap-2"> <LayoutGrid/> Theme</Button>

              <div className='flex gap-2'>

                {activeFormIndex > 1 && <Button size="sm" 
                onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button>}

                <Button disabled={!enableNext} className="flex gap-2" size="sm" 
                onClick={()=>setActiveFormIndex(activeFormIndex+1)}>Next <ArrowRight/> </Button>

              </div>
            </div>
          </div>

          {/* Personal Details  */}
            { activeFormIndex == 1 ? <PersonalDetails enabledNext={(v)=>setEnableNext(v)}/> : 
              activeFormIndex ==2 ? <Summery enabledNext={(v)=>setEnableNext(v)}/>:
              activeFormIndex == 3 ? <Experience enabledNext={(v)=>setEnableNext(v)}/>:
              activeFormIndex == 4 ? <Education enabledNext={(v)=>setEnableNext(v)}/> :null 
            }

          {/* Education  */}

          {/* Skills  */}
      </h1>
    </div>
  )
}

export default FormSection
