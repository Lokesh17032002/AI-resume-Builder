import React, { useContext } from 'react'
import { Editor, EditorProvider } from 'react-simple-wysiwyg'
import { useState } from 'react'
import { Toolbar, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, Separator, BtnNumberedList, BtnBulletList, BtnLink } from 'react-simple-wysiwyg'
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIchatSession } from '../../../service/AIModal.js';

const PROMPT = "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags"

function RichTextEditor({onRichtextEditorChange, index}) {

    const [value, setvalue] = useState();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)

    const generateSummeryFromAI = async() => {

      if(!resumeInfo?.Experience[index]?.title){
        toast('Please add Position title!');
        setLoading(false);
        return ;
      }

      setLoading(true)

      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title)
      const result = await AIchatSession.sendMessage(prompt) ; 
      console.log(result.response.text());

      const responseText = await result.response.text();
      const resp = JSON.parse(responseText);

      const experienceSummaries = resp[resumeInfo.Experience[index].title];

      if (experienceSummaries && Array.isArray(experienceSummaries)) {
        setvalue(experienceSummaries.join("\n"));
      } else {
        console.error("Invalid response format:", resp);
        toast("Invalid response format from AI.");
      }

      setLoading(false)
    }

  return (
    <div>
        <div className='flex justify-between my-2'>
          <label className='text-xs'>Summery</label>
          <Button variant="outline" size="sm" onClick={generateSummeryFromAI} disabled={loading} className='flex gap-2 border-primary text-primary'>
            {
              loading ? <LoaderCircle className='animate-spin'/> : <><Brain className='h-4 w-4' /> Generate from AI</>
            }
          </Button>
        </div>

        <EditorProvider>
            <Editor value={value} onChange={(e)=>{
                setvalue(e.target.value) ;
                onRichtextEditorChange(e)
            }}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor

