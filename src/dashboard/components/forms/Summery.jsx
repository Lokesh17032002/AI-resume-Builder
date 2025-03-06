import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { AIchatSession } from '../../../../service/AIModal';


function Summery({enabledNext}) {
    //for the real time changes
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext) ;
    const [summery, setSummery] = useState() ;
    const [loading, setLoading]=useState(false);
    const params = useParams();

    const [aiGeneratedSummeryList, setAIGeneratedSummeryList]=useState([])

    const prompt = "Job Title: {jobTitle}, depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and summery with Experience level for Fresher, Mid-level, Experienced"

    useEffect(()=>{
        summery && setResumeInfo({
            ...resumeInfo,
            summery:summery 
        })
    },[summery])
 
    const generateSummeryFromAI=async()=>{
        setLoading(true) ;
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle) ;
        console.log(PROMPT);

        // Send message to AI chat session
        const result = await AIchatSession.sendMessage(PROMPT) ;

        console.log(JSON.parse(result.response.text()));
        setAIGeneratedSummeryList(JSON.parse([result.response.text()])) ;
        setLoading(false)
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);
        const data ={
            data: {
                summery : summery
            }
        }

        GlobalApi.updateResumeDetail(params?.resumeId, data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Summery Added")
        },(error)=>{
            console.error("Error generating summary: ", error);
            setLoading(false);
        })
    }

  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summery</h2>
            <p>Add summery for your job title</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summery</label>
                    <Button variant="outline" onClick={()=>generateSummeryFromAI()} type="button" size="sm" className= "  border-primary text-primary flex gap-2"> 
                        <Brain className='h-4 w-4'/> Generate from AI
                    </Button>
                </div>

                <Textarea  required className="mt-5" onChange={(e)=>setSummery(e.target.value)}/>

                <div className='mt-3 flex justify-end'> 
                    <Button type="submit" diabled={loading}> {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}</Button>
                </div>
            </form>
        </div>

        {aiGeneratedSummeryList.length > 0 && 
            <div>
                <h2 className='font-bold text-lg'>Suggessions</h2>
                {aiGeneratedSummeryList.map((item,index)=>(
                    <div key={index} >
                        <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2>
                        <p>{item?.summery}</p>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default Summery
