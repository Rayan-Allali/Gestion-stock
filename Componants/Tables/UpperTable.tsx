import Plus from '../../public/Plus.svg'
import Image from 'next/image'
import { MdDelete,MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SetStateAction } from 'react';

interface props{
    title:string;
    setAddClick:(value: SetStateAction<boolean>) => void;
    handleSelect:() => void
}

const Upper:React.FC<props> = (props) => {
  
    return ( 
        <div className="w-full h-[90px] flex justify-between items-center " >
        <div  className="w-[120px] h-[38px] bg-[#3A78F1] rounded-[5px] cursor-pointer text-white text-[13px] flex justify-center 
        gap-2 font-bold items-center  "  onClick={()=>props.setAddClick(true)} > 
        <Image src={Plus} alt=""></Image> Add {props.title}   </div>
        <div className=' flex gap-3' >
          <input type="text" placeholder="Search" className="w-[250px] rounded-[5px] p-2 px-4 bg-[#FAFAFA] h-[36px] " />
          <div className="bg-[#f4f5f7] text-[#8f969c] p-2 text-xl rounded-[5px] cursor-pointer  "  onClick={props.handleSelect} >
          <MdDelete ></MdDelete>
          </div>
            <div  className="w-[90px] h-[35px] text-[#3A78F1] bg-[#ecf2fe] rounded-[5px] cursor-pointer text-[14px] 
            flex justify-center gap-2 font-bold items-center relative "  >  Filter 
             <MdOutlineKeyboardArrowDown  className='text-xl' ></MdOutlineKeyboardArrowDown> </div>
        </div>
       </div>
     );
}
 
export default Upper;