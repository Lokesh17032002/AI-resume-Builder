import React, { useContext, useEffect } from 'react'
import { Editor, EditorProvider } from 'react-simple-wysiwyg'
import { useState } from 'react'
import { Toolbar, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, Separator, BtnNumberedList, BtnBulletList, BtnLink } from 'react-simple-wysiwyg'
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIchatSession } from '../../../service/AIModal.js';

const PROMPT = "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level) , give me result in array of string"

function RichTextEditor({onRichtextEditorChange, index, defaultValue}) {

    const [value, setvalue] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    // const [editorContent, setEditorContent] = useState(resumeInfo?.experience[index]?.summary || '');
    const [editorContent, setEditorContent] = useState(defaultValue || ''); 
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      if (editorContent) {
        setResumeInfo((prev) => ({
            ...prev,
            experience: prev.experience.map((exp, idx) =>
                idx === index ? { ...exp, summary: editorContent } : exp
            ),
        }));
      }
    }, [editorContent]);

    const generateSummeryFromAI = async() => {

      if(!resumeInfo?.experience[index]?.title){
        toast('Please add Position title!');
        setLoading(false);
        return ;
      }

      setLoading(true)

      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title)

      const result = await AIchatSession.sendMessage(prompt) ; 

      const AIresponse = JSON.parse(await result.response.text());
      console.log('AI Response:', AIresponse);

      if(Array.isArray(AIresponse)) {
        setvalue(AIresponse);
      } else {
        console.error("Invalid response format:", AIresponse);
        toast("Invalid response format from AI.");
        setvalue([]);
      }

      setLoading(false)
    }

    const handleSuggestionClick = (suggestion) => {
      const updatedContent = editorContent ? `${editorContent}\n${suggestion}` : suggestion;
      setEditorContent(updatedContent); // Update the editor content
      onRichtextEditorChange({ target: { value: updatedContent } }); // Trigger parent update
    };

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
            <Editor value={editorContent} onChange={(e)=>{
                setEditorContent(e.target.value);
                onRichtextEditorChange(e);
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

        {value && value.length > 0 && 
            <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggessions</h2>
                {value.map((item,index)=>(
                    <div key={index} onClick={() => handleSuggestionClick(item) }  className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <p>{item || "No summary available"}</p>
                    </div>
                ))}
            </div>
        }
    </div>
    // setEditorContent(prev => `${prev}\n${item}`
  )
}

export default RichTextEditor

