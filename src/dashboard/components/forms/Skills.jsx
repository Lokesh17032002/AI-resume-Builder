import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Rating } from '@smastrom/react-rating'
import GlobalApi from '../../../../service/GlobalApi.js';
import '@smastrom/react-rating/style.css'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Skills = () => {
    const [skillList, setSkillList] = useState([{
        name:'',
        rating: 0
    }])

    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();

    useEffect(()=>{
            resumeInfo && setSkillList(resumeInfo?.skills)
    },[])

    const handleChange = (index, name, value) => {
        const newEntries = skillList.slice();

        newEntries[index][name] = value;
        console.log(newEntries);
        setSkillList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillList([...skillList,{
            name:'',
            rating:0
        }])
    }

    const RemoveSkills = () => {
        setSkillList(skillList => skillList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                skills : skillList.map(({ id, ...rest }) => rest)
            }
        }

        console.log(skillList)

        GlobalApi.updateResumeDetail(params?.resumeId, data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Skills added !')
        },(error)=>{
            console.log(error);
            setLoading(false);
        }
    )
    }

    useEffect(()=>{
        setResumeInfo({...resumeInfo, 
            skills: skillList
        })
    },[skillList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add skills</p>

        <div>
            {skillList.map((item, index) =>(
                <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input defaultValue={item.name} onChange={(e)=> handleChange(index, 'name', e.target.value)}></Input>
                </div>
                
                <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v)=> handleChange(index, 'rating', v)} />

                </div>
            ))}
        </div>

        <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary">
                        + Add More Skills
                    </Button>
            
                    <Button variant="outline" onClick={RemoveSkills} className="text-primary">
                      - Remove
                    </Button>
                </div>
            
                <Button disabled={loading} onClick={()=>onSave()} >
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
    </div>
  )
}

export default Skills
