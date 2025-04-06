// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import React, { useContext, useEffect, useState } from 'react'
// // import { useSearchParams } from 'react-router-dom';
// import GlobalApi from './../../../../service/GlobalApi';
// import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';
// import { useParams } from 'react-router-dom';
// import { AIchatSession } from '../../../../service/AIModal.js';


// const prompt = "Job Title: {jobTitle}, depends on job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and summery with Experience level for Fresher, Mid-level, Experienced"

// function Summery({enabledNext}) {
//     //for the real time changes
//     const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext) ;
//     const [summery, setSummery] = useState() ;
//     const [loading, setLoading]=useState(false);
//     const params = useParams();

//     const [aiGeneratedSummeryList, setAIGeneratedSummeryList]=useState([])

//     useEffect(()=>{
//         summery && setResumeInfo({
//             ...resumeInfo,
//             summery:summery 
//         })
//     },[summery])
 
//     const generateSummeryFromAI = async () => {
//         setLoading(true);
//         const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
//         console.log(PROMPT);
      
//         try {
//           // Send message to AI chat session
//           const result = await AIchatSession.sendMessage(PROMPT);

//           const parsedResponse = JSON.parse(await result.response.text());
//           console.log(parsedResponse);

//           if (parsedResponse["Experience Levels"] && Array.isArray(parsedResponse["Experience Levels"])){
//             const summaries = parsedResponse["Experience Levels"].map(level => ({
//                 experience_level: level["Experience Level"],
//                 summary: level.Summary,
//               }));
//             console.log(summaries);
//             setAIGeneratedSummeryList(summaries);
//           } else {
//             console.error("Experience Levels is not an array or missing:", parsedResponse);
//             setAIGeneratedSummeryList([]);
//           }

//         } catch (error) {
//           console.error("Error parsing AI response: ", error);
//           setAIGeneratedSummeryList([]);
//         }
      
//         setLoading(false);
//     };
      

//     const onSave=(e)=>{
//         e.preventDefault();
//         setLoading(true);
//         const data ={
//             data: {
//                 summery : summery
//             }
//         }

//         GlobalApi.updateResumeDetail(params?.resumeId, data).then(resp=>{
//             console.log(resp);
//             enabledNext(true);
//             setLoading(false);
//             toast("Summery Added")
//         },(error)=>{
//             console.error("Error generating summary: ", error);
//             setLoading(false);
//         })
//     }

//   return (
//     <div>
//         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//             <h2 className='font-bold text-lg'>Summery</h2>
//             <p>Add summery for your job title</p>

//             <form className='mt-7' onSubmit={onSave}>
//                 <div className='flex justify-between items-end'>
//                     <label>Add Summery</label>
//                     <Button variant="outline" onClick={()=>generateSummeryFromAI()} type="button" size="sm" className= "  border-primary text-primary flex gap-2"> 
//                         <Brain className='h-4 w-4'/> Generate from AI
//                     </Button>
//                 </div>

//                 <Textarea  required className="mt-5" value={summery} onChange={(e)=>setSummery(e.target.value)}/>

//                 <div className='mt-3 flex justify-end'> 
//                     <Button type="submit" disabled={loading}> {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}</Button>
//                 </div>
//             </form>
//         </div>

//         {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && 
//             <div className='my-5'>
//                 <h2 className='font-bold text-lg'>Suggessions</h2>
//                 {aiGeneratedSummeryList.map((item,index)=>(
//                     <div key={index} onClick={()=>setSummery(item?.summary)} className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
//                         <h2 className='font-bold my-1'>Level: {item?.experience_level || "Unknown"}</h2>
//                         <p>{item?.summary || "No summary available"}</p>
//                     </div>
//                 ))}
//             </div>
//         }
        
//     </div>
//   )
// }

// export default Summery


//===========================PROMT CHANGED TO ARRAY OF OBJECTS (prev was objects , array of objcts inside it);========


import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { AIchatSession } from '../../../../service/AIModal.js';

const prompt = "Job Title: {jobTitle}, provide a summary for my resume in JSON format as an array of objects. Each object should contain the fields 'experienceLevel' and 'summary' for the following experience levels: Fresher, Mid-level, and Experienced. Ensure the output is well-structured and concise.";

function Summery({enabledNext}) {
    //for the real time changes
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext) ;
    const [summery, setSummery] = useState() ;
    const [loading, setLoading]=useState(false);
    const params = useParams();

    const [aiGeneratedSummeryList, setAIGeneratedSummeryList]=useState([])

    //Whatever i have saved earlier will be shown on screen in teh left side whenever i open it again after sometimes
    useEffect(()=>{
                resumeInfo && setSummery(resumeInfo?.summery)
    },[])

    useEffect(()=>{
        summery && setResumeInfo({
            ...resumeInfo,
            summery:summery 
        })
    },[summery])
 
    const generateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
      
        try {
          // Send message to AI chat session
          const result = await AIchatSession.sendMessage(PROMPT);
      
          const parsedResponse = JSON.parse(await result.response.text());
          console.log(parsedResponse);
      
          // Ensure the response is an array of objects
          if (Array.isArray(parsedResponse)) {
            const summaries = parsedResponse.map(item => ({
              experience_level: item.experienceLevel,
              summary: item.summary,
            }));

            console.log(summaries); // Debug the summaries
            setAIGeneratedSummeryList(summaries); // Set the summaries list
          } else {
            console.error("Response is not an array:", parsedResponse);
            setAIGeneratedSummeryList([]);
          }
        } catch (error) {
          console.error("Error parsing AI response: ", error);
          setAIGeneratedSummeryList([]);
        }
      
        setLoading(false);
      };
      
      

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

                <Textarea  required className="mt-5" value={summery} onChange={(e)=>setSummery(e.target.value)}/>

                <div className='mt-3 flex justify-end'> 
                    <Button type="submit" disabled={loading}> {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}</Button>
                </div>
            </form>
        </div>

        {aiGeneratedSummeryList && aiGeneratedSummeryList.length > 0 && (
            <div className="my-5">
                <h2 className="font-bold text-lg">Suggestions</h2>
                {aiGeneratedSummeryList.map((item, index) => (
                <div
                    key={index}
                    onClick={() => setSummery(item?.summary)}
                    className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
                >
                    <h2 className="font-bold my-1">Level: {item?.experience_level || "Unknown"}</h2>
                    <p>{item?.summary || "No summary available"}</p>
                </div>
                ))}
            </div>
        )}

        
    </div>
  )
}

export default Summery
