import React, { useState } from "react"

function Dropzone() {
   const [post, setpost] = useState({
    title:"",
    desc:"",
    photos:[]
   });
   const [highlight, setHighlight] = useState(false)
   const {title,desc,photos}=post
   const handlechange=(e)=>{
    setpost({
      ...post,
      [e.target.name]:e.target.name
       })
   }
   const handlefilechange=(e)=>{
    let files=e.target.files;
    handfiles(files)
   }

    const handfiles=files=>{
        let photosArr=[];
        for(let file of files){
            let reader = new FileReader()
            reader.readAsDataURL(file);
            reader.addEventListener('load',()=>{
             let fileobj={
                name:file.name,
                type:file.type,
                src:reader.result
             }
             photosArr.push(fileobj)
             setpost({
                ...post,
                photos:[...photos,...photosArr]
             })
            })
        }
    }

   const handlehighlight=e=>{
    e.preventDefault()
    e.stopPropagation()
    setHighlight(true)
   }
   const handleunhighlight=e=>{
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
   }
   const handelDrop=e=>{
    e.preventDefault()
    e.stopPropagation()

    let dt=e.dataTransfer;
    let files=dt.files;
    setHighlight(false)
    handfiles(files)
   }
  return (
    <div className={` relative h-[250px] w-[250px] col-start-[1] col-end-[2]`} >
        <img src='' className="h-12 w-12 " alt="" />
    <h2>Image Drag </h2>
    <form className=" w-[250px]" >
          <div className={`flex items-center justify-center absolute top-0 left-0 w-full h-full `}
          onDragEnter={handlehighlight} 
          onDragOver={handlehighlight} 
          onDragLeave={handleunhighlight}
          onDrop={handelDrop} 
        >
    <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed 
    rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600
     dark:hover:border-gray-500 dark:hover:bg-gray-600 ${highlight && "bg-[#f3f4f6]"}   `}  
     onDragEnter={handlehighlight} 
     onDragOver={handlehighlight} 
     onDragLeave={handleunhighlight}
     onDrop={handelDrop} 
     > 
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file filephotos" name="photos" type="file" multiple className="hidden" onChange={handlefilechange}  />
    </label>
</div> 
            <div className="custom-file-preview">
                {photos.length>0 &&   <div className="prev-img">
                    {/* <span>&times;</span> */}
                    <img src={photos[0].src} alt="asd"/>
                </div> }
               
        </div>
        <button type="submit" className="btn-submit">Submit</button>
    </form>
</div>

  )
}

export default Dropzone