import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

const RenderCode = () => {
  const fullCode=useSelector((state:RootState)=> state.compilerSlice.fullCode)
  const combinedCode=`
    <html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>
  `;
//   <html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className='bg-white border-2 h-[calc(100dvh-60px)]'>
      <iframe className=' h-full w-full' src={iframeCode}/>

    </div>
  )
}

export default RenderCode
