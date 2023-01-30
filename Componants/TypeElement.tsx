import Plus from '../public/Plus+.png'
import coffee from '../public/coffee.avif'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer';
import { useState } from 'react';
import AddProductStock from './Add/AddProductStock';

interface props{
    name:string;
    designation:string;
    Nbr:number;
}

const Element:React.FC<props> = (props) => {
    const [AddClick, setAddClick] = useState(false)
    return ( 
        <>
        <div  className=" w-[210px] relative h-[285px] bg-white "  >
            <Image src={coffee} alt="" className='h-[130px] w-full  ' ></Image>
            <div  className='flex justify-between justify-items-center  p-3 ' >
            <h1> {props.name} </h1>
            <p> {props.Nbr} </p>
            </div>
            
            <p   className='text-xs px-3 ' > {props.designation} </p>
            <button   onClick={()=>setAddClick(true)}
            className=" left-3 absolute bottom-5 text-sm rounded-full text-[#7899D6] border border-solid border-[#7899D6] items-center 
            justify-center flex gap-1 w-[90px] h-[32px] " >
            <Image src={Plus} alt=""></Image> Product</button>
        </div>
        <AnimatePresence>
        {AddClick &&  <motion.div className='w-[calc(100vw-230px)] z-10 h-[calc(100vh-122px)] fixed bg-[#3b373713] left-[230px]  top-[122px] '   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.5, }}>
         <AddProductStock Title='product' Type={props.name} setClicked={setAddClick} ></AddProductStock>
         </motion.div> }
    </AnimatePresence>
        </>
        
     );
}
 
export default Element;