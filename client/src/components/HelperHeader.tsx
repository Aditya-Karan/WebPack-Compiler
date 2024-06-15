import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Code, Copy, Loader2, Save, Share2Icon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { CompilerSliceStateType, updateCurrentlanguage } from '@/redux/slices/compilerSlice'
import { RootState } from '@/redux/store'
import { handleError } from '@/utils/handleError'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { toast } from 'sonner'


const HelperHeader = () => {
  const dispatch=useDispatch();
  const currentLanguage=useSelector((state:RootState)=>state.compilerSlice.currentLanguage);
  const navigate=useNavigate();
  const [saveLoading,setSaveLoading]=useState<boolean>(false)
  const fullCode=useSelector((state:RootState)=>state.compilerSlice.fullCode)

  const [shareBtn,setShareBtn]=useState<boolean>(false);
  const {urlId}=useParams()
  useEffect(()=>{
    if(urlId){
      setShareBtn(true);
    }
    else{
      setShareBtn(false);
    }
  },[urlId]);

  const handleSaveCode=async()=>{
    setSaveLoading(true)
    try{
      const response=await axios.post("http://localhost:4000/compiler/save",{
        fullCode:fullCode
      });
      console.log(response.data);
      navigate(`/compiler/${response.data.url}`,{replace:true})
    }
    catch(error){
      handleError(error);
    }
    finally{

      setSaveLoading(false)
    }
  }

  return (
    <div className='__helper_header h-[50px] bg-black text-white p-2 flex  justify-between items-center' >
      <div className='__btn_container flex gap-2'>
        <Button className="flex justify-center items-center gap-1" variant="success" onClick={handleSaveCode} disabled={saveLoading}>
        {saveLoading ? (
          <>
            <Loader2 className='animate-spin'/>Saving
          </>
        ):(
          <>
            <Save size={16}/>Save
          </>
        )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium transition-colors 
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
            disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 
            flex justify-center items-center gap-1"><Share2Icon size={16}/>Share</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='flex gap-1 justify-center items-center'><Code/>Share your Code!</DialogTitle>
                <DialogDescription className='flex flex-col gap-2'>
                  <div className="__url flex gap-1">
                    <input type='text' disabled className=' w-full px-2 py-2 bg-slate-800 text-white' value={window.location.href}/>
                    <Button variant='outline' onClick={()=>{
                        window.navigator.clipboard.writeText(window.location.href);
                        toast("URL copied to your clipboard! ")
                    }}>
                    <Copy size={14}/></Button>
                  </div>
                  <p className='text-center'>
                    Share this URL with your friends.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

      </div>
      <div className='__tab_switcher flex justify-center items-center gap-2'>
        <small>Current Language:</small>

        <Select defaultValue={currentLanguage} onValueChange={(value)=>dispatch(updateCurrentlanguage(value as CompilerSliceStateType["currentLanguage"]))}>
        <SelectTrigger className="w-[120px] bg-grey-800 outline-none focus:ring-0">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default HelperHeader
