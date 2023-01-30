import axios from 'axios';
import {motion,AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { FiX } from "react-icons/fi";


interface props{
    setClicked:(value:boolean) => void
}

const AddType:React.FC<props> = (props) => {
    const [Added,setAdded]=useState(false);
    let Type:any={};

     Type={   name: "",designation:"",}
   const [data, setdata] = useState( Type )
      const handleChange = (event:any,attrb: number) => {
       switch (attrb) {
          case 1:
          data.name  = event.target.value
             break;
          case 2:
          data.designation  = event.target.value}
       console.log(data);
       }
     
    const handleSubmit = () => {  
         axios.post(`http://localhost:3000/api/productType`,data)
         .then(res => {
           console.log(res.data);
           console.log('Successful');
         })}
     
 
    async function SaveClicked() {
      await handleSubmit() 
      setAdded(true) 
      setTimeout(() => {
       props.setClicked(false) 
      }, 400);
      
    }
 
     return ( 
     <motion.div  className="w-[450px] ml-[100px] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] h-[270px] shadow-2xl
     rounded-[10px] mb-10 bg-white p-7 text-[#b0b1b3] " 
     initial={{ y: '-200%',x: '50%',opacity: 0 }}
     animate={{ y: '-55%',x: '50%', opacity: 1 }} 
     exit={{ y: '-200%',x: '50%',opacity: 0 , }}
     transition={{ type: "spring", stiffness: 60,delay:.5 }}
      >
     <div  className='flex justify-between' >
     <h1  className="text-xl text-black font-semibold ">New Type</h1>  
     <div className='rounded-full bg-[#ff0000b7] hover:bg-[red] duration-[.5s] text-white text-xl w-[30px] h-[30px] grid justify-center cursor-pointer items-center' 
     onClick={()=>props.setClicked(false)}> 
     <FiX></FiX></div>
     </div>
         <form >
         <div className=" grid justify-items-center items-center grid-rows-2 w-full my-4 text-sm gap-2 ">
         <div className="">
             <h1 className="mb-2 ">Nom Type</h1>
             <input type="text" onChange={(e)=>handleChange(e,1)} className="rounded-[5px] w-[250px] h-[30px] border border-solid border-[#a6a7a8] " />
        </div>
          <div className="">
             <h1 className="mb-2 "> Designation</h1>
             <input type="text"  onChange={(e)=>handleChange(e,2)} className="rounded-[5px] w-[250px] h-[30px] border border-solid border-[#a6a7a8] " />
          </div>
         </div>
         </form>
         <div className="flex w-full justify-end px-3 text-sm gap-4">
             <button  className="text-black px-4 rounded-[5px] border border-solid border-[#a6a7a8] hover:bg-[#f7f2f2]
              hover:border-[#818181] duration-[.5s] p-[6px] "  onClick={()=>props.setClicked(false)} >Clear</button>
             <button type='submit' className="bg-[#666cde] text-white p-[6px] duration-[.5s] px-4 rounded-[5px] hover:bg-[#6167d3] " 
             onClick={()=>{SaveClicked()}}   >Save</button>
         </div>
         <AnimatePresence>
         { Added &&
   <motion.div className="absolute bottom-[-13%] right-[50%] translate-x-[50%] bg-white rounded-[5px] gap-3 border-l-[3px]
    border-l-solid border-l-[#666cde] w-[180px] items-center justify-center flex h-[45px] text-black "
    initial={{ opacity: 0, y:40 }}
         animate={{ opacity: 1,y:0 }}
         exit={{ opacity: 0, }} 
         transition={{duration:.3, }}
    >
     <div className="rounded-full bg-[#666cde] text-white h-[20px] w-[20px] grid justify-center items-center  ">
     <AiOutlineCheck></AiOutlineCheck> 
     </div>
     Type  Added
   </motion.div>
         }
         </AnimatePresence>
       
     </motion.div> );
}
 
export default AddType;