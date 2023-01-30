import { useRef, useState } from 'react';
import AddProductStock from '../Componants/Add/AddProductStock'

const Test = () => {

        // drag state
        const [dragActive, setDragActive] = useState(false);
        const inputRef = useRef(null);
        // handle drag events
        const handleDrag = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
          } else if (e.type === "dragleave") {
            setDragActive(false);
          }
        };
        const handleDrop = function(e) {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              // at least one file has been dropped so do something
              // handleFiles(e.dataTransfer.files);
           console.log(e.dataTransfer.files);
           let reader = new FileReader()
           reader.readAsDataURL(e.dataTransfer.files);
           reader.addEventListener('load',()=>{
             let fileobj={
                name:e.dataTransfer.files.name,
                type:e.dataTransfer.files.type,
                src:reader.result
             }
             console.log(fileobj);
             
             // photosArr.push(fileobj)
             // setpost({
             //    ...post,
             //    photos:[...photos,...photosArr]
             // })
             // setfirst(post.photos[photos.length-1])
            })
            }
          };

          const handleChange = function(e) {
            e.preventDefault();
            if (e.target.files && e.target.files[0]) {
              // at least one file has been selected so do something
              console.log(e.target.files);
              let reader = new FileReader()
              reader.readAsDataURL(e.target.files);
              reader.addEventListener('load',()=>{
                let fileobj={
                   name:e.target.files.name,
                   type:e.target.files.type,
                   src:reader.result
                }
                console.log(fileobj);
                
                // photosArr.push(fileobj)
                // setpost({
                //    ...post,
                //    photos:[...photos,...photosArr]
                // })
                // setfirst(post.photos[photos.length-1])
               })
          };}
          const onButtonClick = () => {
            inputRef.current.click();

          };
   return (
    <form id="form-file-upload "  className=' h-[16rem] w-[28rem] max-w-[100%] text-center relative ' onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} >
    <input ref={inputRef} type="file" id="input-file-upload"    className=' hidden'  onChange={handleChange}  />
    <label id="label-file-upload" htmlFor="input-file-upload"
     className={`h-full flex items-center justify-center border-[2px] border-dashed border-[#cbd5e1]  rounded-[1rem] 
     max-w-[100%] text-center relative ${dragActive ? "bg-[#545151]" : "bg-[#f8fafc]" } `} >
       <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "bg-[#545151]" : "" }></label>   
      <div>
    <p>Drag and drop your file here or</p>
        <button className="upload-button cursor-pointer p-[0.25rem] text-[1rem] bg-transparent "   onClick={onButtonClick} >Upload a file</button>
      </div> 
    </label>
    { dragActive && <div id="drag-file-element"  className='absolute w-full h-full rounded-[1rem] top-0 right-0 bottom-0 left-0 '
    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
  </form>
   )

}
export default Test;