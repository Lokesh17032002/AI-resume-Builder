import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState, useContext } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from '../../../../service/GlobalApi.js';
import { useParams } from 'react-router-dom';

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);

  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext); 
  const [loading, setLoading] = useState(false);
  const params=useParams();

  useEffect(()=>{
    resumeInfo?.Experience.length > 0 && setExperienceList(resumeInfo?.Experience)
    
  },[])

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, { 
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      workSummery: '',
     }]);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;

    setExperienceList(newEntries);
  };

  useEffect(() => {
    console.log(experienceList)
    setResumeInfo({
        ...resumeInfo,
        Experience: experienceList
    })
  }, [experienceList]);

  
  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        Experience:experienceList.map(({ id, ...rest }) => rest)
      }
    }

    console.log(experienceList)

    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
        console.log(res);
        setLoading(false);
        toast('Details updated !')
    },(error)=>{
        setLoading(false);
    })

}

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Experience</h2>
        <p>Add experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position</label>
                  <Input name="title" value={item.title}
                    onChange={(event) => handleChange(index, event)}
                  />
                  {/*IN THE  GITHUB REPO
                   <Input name="title" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.title}
                  /> */}
                </div>

                <div>
                  <label className="text-xs">Company Name</label>
                  <Input name="companyName" value={item.companyName}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">City</label>
                  <Input name="city" value={item.city}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">State</label>
                  <Input name="state" value={item.state}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">Start Date</label>
                  <Input type="date" name="startDate" value={item.startDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className="text-xs">End Date</label>
                  <Input type="date" name="endDate" value={item.endDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div className="col-span-2">
                  {/* Work Summery */}
                  <RichTextEditor index={index} value={item.workSummery} 
                    onRichtextEditorChange={(event) =>
                      handleRichTextEditor(event, 'workSummery', index)
                    } 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={addNewExperience} className="text-primary">
              + Add More Experience
            </Button>

            <Button variant="outline" onClick={removeExperience} className="text-primary">
              - Remove
            </Button>
          </div>

          <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
