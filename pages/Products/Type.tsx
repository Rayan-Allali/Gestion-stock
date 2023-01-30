import axios from "axios";
import { AnimatePresence, motion } from "framer";
import { useEffect, useState } from "react";
import AddType from "../../Componants/Add/AddType";
import Navbar from "../../Componants/Navbar";
import SideNavbar from "../../Componants/SideNvar/SideNav";
import Element from  "../../Componants/TypeElement"
import Plus from '../../public/Plus.svg'
import Image from 'next/image'
import SectionTitle from "../../Componants/SectionTitle";

const Type = () => {
  const [Data, setData] = useState<any>()
  let State=[false,true,false,false,false,false,false,false]
  const [AddClick, setAddClick] = useState(false)
  useEffect(() => { 
   axios.get(`http://localhost:3000/api/productType`)
   .then(res => {
    setData(res.data.data)
    console.log(Data);
   })
 }, [])
 
  return(
   <div className='grid grid-cols-[230px,1fr] relative w-full  '>
    <SideNavbar State={State} className={` col-span-1 ` }  />
    <div   className=" col-start-[2] col-end-[3] h-[100vh] ">
<Navbar/>
<SectionTitle type='Product'  title='Product Types'  ></SectionTitle>
<main  className=" p-10  bg-[#EFF2F6] max-h-[calc(100vh-122px)] w-full overflow-y-scroll " >
<div  className="w-[100px] h-[38px] bg-[#3A78F1] rounded-[5px] cursor-pointer text-white text-[13px] flex justify-center 
        gap-2 font-bold items-center  "  onClick={()=>setAddClick(true)} > 
        <Image src={Plus} alt=""></Image> Add Type   </div>
{Data &&  
    <div className="grid grid-cols-4 gap-2 justify-center p-10 " >
      {  Data.map(data=>{
        return <Element  Nbr={52} {...data} ></Element>
      }) }
    </div> }
</main>

   </div>
   <AnimatePresence>
        {AddClick &&  <motion.div className='w-[calc(100vw-230px)] z-10 h-[calc(100vh-122px)] top-[122px] fixed bg-[#3b373713] left-[230px]  '   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.5, }}>
          <AddType  setClicked={setAddClick} ></AddType>
         </motion.div> }
    </AnimatePresence>
    </div>
   
  );     
  
}
 
export default Type;