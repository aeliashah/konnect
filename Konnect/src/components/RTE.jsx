import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
function RTE({name,control,label,defaultValue=""}) {
  return (
   <div>
   {label && <label>{label}</label>}
   <Controller
   name={name || "content"}
   control={control}
   render={({field:{onChange}})=>(
    <Editor
    apiKey='phshj0qqucp26x5cioy541v1cf513lcwztzxgg7auidri2f5'
    initialValue={defaultValue}
    init={{
      height: 500,
      menubar: true,
      plugins: [
        "advlist", "autolink" ,"lists", "link", "image", "charmap" ,"print", "preview", "anchor",
        "searchreplace" ,"visualblocks" ,"code" ,"fullscreen",
        "insertdatetime", "media", "table", "paste", "code", "help", "wordcount"
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }} onEditorChange={onChange}/>

   )}/>
   </div>

  )
}

export default RTE
