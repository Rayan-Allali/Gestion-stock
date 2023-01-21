import axios from 'axios';
import {motion,AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { FiX } from "react-icons/fi";
interface props{
    Title:string,
    setClicked:(value:boolean) => void
}


const Add:React.FC<props> = (props) => {
   let Type:any={};
   let url=''
if(props.Title=='Supplier'){
   Type={  img:"tst",
   nomF: "",
   prenomF:"",
   adressF: "",
   teleF:""}
   url='http://localhost:3000/api/supplier'
}
else if(props.Title=='Customer') {
   Type={  img:"tst",
   nomC: "",
   prenomC:"",
   adressC: "",
   teleC:""}
   url='http://localhost:3000/api/customer'
}
// else if(props.Title=='Product') {
//    Type={  img:"tst",
//    nomP: "",
//    designation:"",
//    type: "",}
//    url='http://localhost:3000/api/product'
// }

// "nomP":"dragon fruit","designation":"nature",
// "type":"fruits"

  const [data, setdata] = useState( Type )
     const handleChange = (event:any,attrb: number) => {
      switch (attrb) {
         case 1:
            if(props.Title=='Supplier')   data.nomF  = event.target.value
            else data.nomC  = event.target.value
            break;
         case 2:
            if(props.Title=='Supplier') data.prenomF  = event.target.value
            else data.prenomC  = event.target.value
            break;
         case 3:
           if(props.Title=='Supplier') data.adressF  = event.target.value
           else data.adressC  = event.target.value
          break;
         case 4:
           if(props.Title=='Supplier') data.teleF  = event.target.value
           else data.teleC  = event.target.value
          break;
      }
      console.log(data);
      }
    
   const handleSubmit = () => {
       
        axios.post(url,data)
        .then(res => {
          console.log(res);
          console.log(res.data);
          console.log('Successful');
          location.reload();
        })}
    

   async function SaveClicked() {
     await handleSubmit() 
     props.setClicked(false)
   }

    return ( 
    <motion.div  className="w-[800px] ml-[100px] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] h-[420px] shadow-2xl
    rounded-[10px] mb-10 bg-white p-7 text-[#b0b1b3] " 
    initial={{ y: '-200%',x: '50%',opacity: 0 }}
    animate={{ y: '-55%',x: '50%', opacity: 1 }} 
    exit={{ y: '-200%',x: '50%',opacity: 0 , }}
    transition={{ type: "spring", stiffness: 60,delay:.5 }}
     >
    <div  className='flex justify-between' >
    <h1  className="text-xl text-black font-semibold ">New {props.Title}</h1>  
    <div className='rounded-full bg-[#ff0000b7] hover:bg-[red] duration-[.5s] text-white text-xl w-[30px] h-[30px] grid justify-center cursor-pointer items-center' 
    onClick={()=>props.setClicked(false)}> 
    <FiX></FiX></div>
    </div>
        <form >
        <div className=" grid justify-items-center items-center grid-cols-2 w-full my-6 gap-3 ">
         <div className="">
            <h1 className="mb-2 text-lg ">Fisrt Name</h1>
            <input type="text" onChange={(e)=>handleChange(e,1)} className="rounded-[5px] w-[350px] h-[35px] border border-solid border-[#a6a7a8] " />
         </div>
         <div className="">
            <h1 className="mb-2 text-lg "> Last Name </h1>
            <input type="text"  onChange={(e)=>handleChange(e,2)} className="rounded-[5px] w-[350px] h-[35px] border border-solid border-[#a6a7a8] " />
         </div>
         <div className="">
            <h1 className="mb-2 text-lg ">Adress</h1>
            <input type="text" onChange={(e)=>handleChange(e,3)}   className="rounded-[5px] w-[350px] h-[35px] border border-solid border-[#a6a7a8] " />
         </div>
         <div className="">
            <h1 className="mb-2 text-lg ">Phone </h1>
            <input type="text" onChange={(e)=>handleChange(e,4)}  className="rounded-[5px] w-[350px] h-[35px] border border-solid border-[#a6a7a8] " />
         </div>
         <div className="">
            <h1 className="mb-2 text-lg ">Emails</h1>
            <input type="text"   className="rounded-[5px] w-[350px] h-[35px] border border-solid border-[#a6a7a8] "  />
         </div>
      {props.Title!='Product' &&  <div className="">
            <h1 className="mb-2 text-lg ">Points</h1>
            <input type="text"  className="rounded-[5px] w-[350px] h-[35px] border border-solid border-[#a6a7a8] "  />
         </div>}
        </div>
        </form>
        <div className="flex w-full justify-end px-3 gap-4">
            <button  className="text-black p-2 px-7 rounded-[5px] border border-solid border-[#a6a7a8] hover:bg-[#f7f2f2]
             hover:border-[#818181] duration-[.5s] "  onClick={()=>props.setClicked(false)} >Clear</button>
            <button type='submit' className="bg-[#666cde] text-white p-2 duration-[.5s] px-7 rounded-[5px] hover:bg-[#6167d3] " 
            onClick={()=>{SaveClicked()}}   >Save</button>
        </div>
        {/* <AnimatePresence></AnimatePresence>
        {

        }
        <div className="absolute bottom-[-13%] right-[50%] translate-x-[50%] bg-white rounded-[5px] gap-3 border-l-[3px] border-l-solid 
        border-l-[#6ac259] w-[180px] items-center justify-center flex h-[45px] text-black ">
          <div className="rounded-full bg-[#6ac259] text-white h-[20px] w-[20px] grid justify-center items-center  ">
          <AiOutlineCheck></AiOutlineCheck> 
          </div>
          {props.Title}   Added
        </div> */}
    </motion.div> );
}
 
export default Add;