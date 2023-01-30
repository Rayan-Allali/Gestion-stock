import axios from 'axios';
import {motion,AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";

interface props{
    setClicked:(value:boolean) => void,
    ID:number,
    Title:string,
}

const Addpay:React.FC<props> = (props) => {
    console.log(props.ID);
    
    const [Added,setAdded]=useState(false);
    let Type:any={};
   props.Title=="Sale" ? Type={ idAchat:props.ID,paiment:0,} :  Type={ numF:props.ID,montant:0,}
   const [data, setdata] = useState( Type )
      const handleChange = (event:any) => {
        // numF,
          data.montant  = parseInt(event.target.value)
          data.paiment  = parseInt(event.target.value)
          }
     
    const handleSubmit = () => {  
       
       {  if(props.Title!="Sale") 
         axios.post(`http://localhost:3000/api/regelementSupplier`,data)
         .then(res => {
           console.log(res.data);
           console.log('Successful');
         })
         else    axios.post(`http://localhost:3000/api/reglementCustomer`,data)
         .then(res => {
           console.log(res.data);
           console.log('Successful');
         })

        }
        }
     
 
    async function SaveClicked() {
      await handleSubmit() 
      setAdded(true) 
      setTimeout(() => {
       props.setClicked(false) 
      }, 400);
      
    }
 
     return ( 
     <motion.div  className="w-[350px] ml-[100px] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] h-[180px] shadow-2xl
     rounded-[10px] mb-10 bg-white p-7 text-[#b0b1b3] " 
     initial={{ y: '-200%',x: '50%',opacity: 0 }}
     animate={{ y: '-55%',x: '50%', opacity: 1 }} 
     exit={{ y: '-200%',x: '50%',opacity: 0 , }}
     transition={{ type: "spring", stiffness: 60,delay:.5 }}
      >
     <div  className='flex justify-between' >
     <h1  className="text-xl w-full text-center text-black font-semibold ">Amount To Pay</h1>  
     </div>
         <form >
         <div className=" grid justify-items-center items-center w-full my-4 text-sm gap-2 ">
             <input type="text" onChange={(e)=>handleChange(e)} className=" pl-[5%] rounded-[5px] text-black w-[250px] h-[30px] border border-solid border-[#a6a7a8] " />
         </div>
         </form>
         <div className="flex w-full justify-center text-sm gap-5">
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
 
export default Addpay;