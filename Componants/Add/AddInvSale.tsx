import axios from 'axios';
import {motion,AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import PlusA from '../../public/Plus+.png' 
import NewAdd from '../../public/NewAdd.png' 
 
import { FiX } from "react-icons/fi";
import Image from 'next/image'
interface props{
    Title:string,
    setClicked:(value:boolean) => void
}


const AddInvSale:React.FC<props> = (props) => {
   const [Added,setAdded]=useState(false);
   const [productAdded, setproductAdded] = useState([0])
   const AddProduct=()=>{
      setproductAdded([...productAdded,0])
      console.log(productAdded);
      
   }
   let Type:any={};
   let  url='http://localhost:3000/api/product'

    Type={  img:"tst",
    nomP: "",
    designation:"",
    type: "",}
  const [data, setdata] = useState( Type )
     const handleChange = (event:any,attrb: number) => {
      switch (attrb) {
         case 1:
         data.nomP  = event.target.value
            break;
         case 2:
         data.designation  = event.target.value
            break;
         case 3:
         data.type  = event.target.value
          break;}
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
     setAdded(true) 
     setTimeout(() => {
      props.setClicked(false) 
     }, 400);
     
   }

    return ( 
    <motion.div  className="w-[650px] max-h-[510px] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] shadow-2xl font-semibold
    rounded-[10px] mb-10 bg-white p-6 text-[#b0b1b3] " 
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
        <div className="flex flex-col items-center w-full my-6 gap-8 ">
        <div className="relative">
           <Image src={NewAdd} className="absolute h-[20px] cursor-pointer w-[20px] translate-y-[-50%] top-[50%] left-5 " alt=""></Image>
            <input type="text" onChange={(e)=>handleChange(e,1)} placeholder="Select Customer" className=" pl-[30%] rounded-[5px] w-[300px] h-[40px] border border-solid border-[#a6a7a8] " />
         </div>
         <div className='max-h-[210px] overflow-y-scroll grid gap-4'>
         {productAdded.map(product=>{
            return    <div className='flex gap-4'>
             <div className="">
               <input type="text"  onChange={(e)=>handleChange(e,2)} placeholder="Select Product" className=" pl-[15%] rounded-[5px] w-[270px] h-[40px] border border-solid border-[#a6a7a8] " />
            </div>
            <div className="">
               <input type="text" onChange={(e)=>handleChange(e,3)} placeholder="PrixUt"   className="  pl-[15%] rounded-[5px] w-[90px] h-[40px] border border-solid border-[#a6a7a8] " />
            </div>
            <div className="">
               <input type="text"  onChange={(e)=>handleChange(e,2)} placeholder="PrixVt" className=" pl-[15%] rounded-[5px] w-[90px] h-[40px] border border-solid border-[#a6a7a8] " />
            </div>
            <div className="">
               <input type="text" onChange={(e)=>handleChange(e,3)} placeholder="Qte"   className="  pl-[15%] rounded-[5px] w-[90px] h-[40px] border border-solid border-[#a6a7a8] " />
            </div>
         </div> 
           
         })}
         </div>
   
        <div  className="w-[120px] h-[38px] bg-[#F1F4FB] rounded-[5px] cursor-pointer text-[#017AFF] text-[13px] flex justify-center 
            gap-2 items-center self-start  " onClick={()=>AddProduct()} > 
            <Image src={PlusA} alt=""></Image> Add product  </div>
        </div>
        </form>
        <div className="flex w-full justify-end px-3 gap-4">
            <button  className="text-black p-2 px-7 rounded-[5px] border border-solid border-[#a6a7a8] hover:bg-[#f7f2f2]
             hover:border-[#818181] duration-[.5s] "  onClick={()=>props.setClicked(false)} >Clear</button>
            <button type='submit' className="bg-[#666cde] text-white p-2 duration-[.5s] px-7 rounded-[5px] hover:bg-[#6167d3] " 
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
    {props.Title}   Added
  </motion.div>
        }
        </AnimatePresence>
      
    </motion.div> );
}
 
export default AddInvSale;