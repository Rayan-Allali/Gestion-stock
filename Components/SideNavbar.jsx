import {useState} from 'react';
import { BiCube } from "react-icons/bi";
import { FcStatistics } from "react-icons/fc";
import Image from 'next/image'
import overview from '../public/overviewIcone.svg'
import product from '../public/product.svg'
import Supplier from '../public/Supplier.svg'
import sale from '../public/sale.svg'
const SideNavbar = () => {

    const [SideNav, setSideNav] = useState([true,false,false,false,false,false,false])
    // the SideNav variable controle the 

    let arr=[...SideNav]
   const Clickhandler=(id)=>{
   arr=[false,false,false,false,false,false,false]
   arr[id]=true
   setSideNav(arr);
   }
    return ( 
        <div  className="bg-[rgba(39,47,60,1)] h-[100vh] py-[35px] items-center text-[24px] font-['Lato'] font-[400] flex flex-col 
      gap-[33px] w-[240px] fixed left-0 top-0 " >
        <h1 className="text-white">OurAppName</h1>
        <ul  className="flex flex-col text-[15px] w-full gap-[10px] " >
        <li className={`flex gap-3 cursor-pointer  ${!SideNav[0] && "text-[#A0AEC0]"}
        ${SideNav[0] && "border-l-[4px] border-l-[#00B0FF] border-l-solid bg-[#2E3746] text-white"} py-3 justify-center w-full `}
        onClick={()=>{Clickhandler(0)}}  > 
         <Image src={overview} alt="overview" className="w-[20px]"/>  Overview</li>
        <li className={`flex gap-3  cursor-pointer text-[#A0AEC0] 
        ${SideNav[1] && "border-l-[4px] border-l-[#00B0FF] border-l-solid bg-[#2E3746] text-white "}  py-3 justify-center w-full `}
         onClick={()=>{Clickhandler(1)}}>
            <BiCube className="text-2xl " ></BiCube>  Product</li>
        <li className={`flex gap-3  cursor-pointer text-[#A0AEC0] 
        ${SideNav[2] && "border-l-[4px] border-l-[#00B0FF] border-l-solid bg-[#2E3746] text-white "}  py-3 justify-center w-full `}
         onClick={()=>{Clickhandler(2)}}>
             <FcStatistics  className="text-2xl " ></FcStatistics>  Statistics</li>
        <li className={`flex gap-3  cursor-pointer text-[#A0AEC0] 
        ${SideNav[3] && "border-l-[4px] border-l-[#00B0FF] border-l-solid bg-[#2E3746] text-white "}  py-3 justify-center w-full `}
         onClick={()=>{Clickhandler(3)}}>
            <BiCube  className="text-2xl " ></BiCube>   Customers</li>
        <li className={`flex gap-3  cursor-pointer text-[#A0AEC0] 
        ${SideNav[4] && "border-l-[4px] border-l-[#00B0FF] border-l-solid bg-[#2E3746] text-white "}  py-3 justify-center w-full `}
         onClick={()=>{Clickhandler(4)}}>
             <Image src={Supplier} alt="overview" className="w-[20px]"/> Suppliers</li>
        <li className={`flex gap-3  cursor-pointer text-[#A0AEC0] 
        ${SideNav[5] && "border-l-[4px] border-l-[#00B0FF] border-l-solid bg-[#2E3746] text-white "}  py-3 justify-center w-full `}
         onClick={()=>{Clickhandler(5)}}> 
           <Image src={sale} alt="overview" className="w-[20px]"/>  transaction</li>
        <li className={`flex gap-3  cursor-pointer text-[#A0AEC0] 
        ${SideNav[6] && "border-l-[4px] border-l-[#00B0FF] border-l-solid bg-[#2E3746] text-white "}  py-3 justify-center w-full `}
         onClick={()=>{Clickhandler(6)}}>
             <BiCube  className="text-2xl " ></BiCube>   Invoices</li>
        </ul>
     </div>
     );
}
 
export default SideNavbar;