import LeftArrow from '../../public/LeftArrow.svg'
import RightArrow from '../../public/RightArrow.svg'
import Image from 'next/image'
interface props{
    Array: any[];
    HandelPagination: (id?: number, Dir?: string) => void;
    currentPage: number;
    DisplayPage: (id: number) => boolean;
}
const Pagination:React.FC<props> = (props) => {
    return ( <div className="flex w-[650px] mt-10 justify-items-center justify-between ">
    <Image src={LeftArrow} alt="" className='cursor-pointer' onClick={()=>props.HandelPagination(0,'-')} ></Image>
        {props.Array.map(Page=>{
        return <p key={Page} className={`cursor-pointer ${props.DisplayPage(Page) && 'hidden'} grid items-center justify-center rounded-[7px]
            ${Page==props.currentPage && 'border-2 border-[#3A78F1] text-[#3A78F1] border-solid '} w-[30px] h-[30px]  `} 
            onClick={()=>props.HandelPagination(Page)} > {Page} </p>
         })}
    <Image src={RightArrow} className='cursor-pointer' alt="" onClick={()=>props.HandelPagination(0,'+')} ></Image>
  </div> );
}
 
export default Pagination ;