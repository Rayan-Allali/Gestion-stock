
import {useState} from 'react';
const Customers = () => {
    const [Filter, setFilter] =useState([true,false,false])
    let arr=[...Filter]
    const Clickhandler=(id)=>{
      arr=[false,false,false]
      arr[id]=true
      setFilter(arr);
      }
    return ( 
        <div  className="flex bg-[#EFF2F6] justify-end">
        <div  className="py-[30px] px-[63px]  w-[calc(100%-240px)] ">
          <h1 className="text-[32px] text-[rgba(48,63,159,1)] ">Customers</h1>
          <div className="flex justify-start gap-2 mt-5 " >
           <div className= {`flex items-center gap-2 cursor-pointer px-2 py-2 rounded-t-lg font-semibold rounded-tr-lg
            ${!Filter[0] && "text-[#959B9F]"}  ${Filter[0] && "bg-white text-black"} text-[16px]`}    onClick={()=>{Clickhandler(0)}}  >All Customers 
           <div className={`rounded-full grid justify-center items-center text-[white]  
           ${!Filter[0] && "bg-[#9EC2F6]"}  bg-[rgba(58,120,241,1)] h-[24px] w-[34px] text-[12px]`}>20</div> 
           </div>


           <div  className= {`flex items-center gap-2 cursor-pointer px-2 py-2 rounded-t-lg font-semibold rounded-tr-lg 
           ${Filter[1] && "bg-white text-black"} ${!Filter[1] && "text-[#959B9F]"} text-[16px]`}     onClick={()=>{Clickhandler(1)}}  >Active Customers 
           <div  className={`rounded-full grid justify-center items-center text-[white]  
           ${!Filter[1] && "bg-[#9EC2F6]"}  bg-[rgba(58,120,241,1)] h-[24px] w-[34px] text-[12px]`} >5</div> 
           </div>
           <div className= {`flex items-center gap-2 cursor-pointer px-2 py-2 rounded-t-lg font-semibold rounded-tr-lg 
           ${Filter[2] && "bg-white text-black"} ${!Filter[2] && "text-[#959B9F]"} text-[16px]`} onClick={()=>{Clickhandler(2)}}  >Inctive Customers
           <div  className={`rounded-full grid justify-center items-center text-[white]  
           ${!Filter[2] && "bg-[#9EC2F6]"}  bg-[rgba(58,120,241,1)] h-[24px] w-[34px] text-[12px]`} >15</div> 
           </div>
          </div>
          <div className="bg-white  h-[569px] w-[874px] ">

          </div>
        </div>
        </div>
       
     );
}
 
export default Customers;

