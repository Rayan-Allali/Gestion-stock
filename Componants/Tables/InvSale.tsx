import {useEffect, useState} from 'react';
import InvoiceA from '../../public/invoice+.svg'
import SaleA from '../../public/Sales+.png'
import open from '../../public/open.svg'
import dollar from '../../public/dollar.svg'
import Plus from '../../public/Plus.svg'
import LeftArrow from '../../public/LeftArrow.svg'
import RightArrow from '../../public/RightArrow.svg'
import { MdDelete,MdOutlineKeyboardArrowDown } from "react-icons/md";
import Image, { StaticImageData } from 'next/image'
import FilterElmnt from '../Filter';
import { AnimatePresence, motion } from 'framer';
import AddInvSale from '../Add/AddInvSale';
import axios from 'axios';

interface props{
  title:string,
  choices?: { id:number, Nbr: number,Title: string}[],
  Data:{
    id: number;
    ClientName: string;
    Total: number;
    Rest: number;
}[]
}

const InvSale:React.FC<props> = (props) => {
    const [Filter, setFilter] =useState([true,false,false])
    const [select, setselect] = useState(false)
    const [AddClick, setAddClick] = useState(false)
    const handleSelect=()=>{
      setselect(prev=>prev=!prev)
    }
  

    let arr=[...Filter] 
    const Clickhandler=(id:number)=>{
      arr=[false,false,false]
      arr[id]=true
      setFilter(arr);
      }
      let Img: StaticImageData
      const ImgSetter=()=>{
        switch (props.title) {
            case 'Invoice':
             Img=InvoiceA
                break;
            case 'Sale':
            Img=SaleA
                break;
        }
     return Img
       }
       Img=ImgSetter()

       const [blogPosts, setBlogPosts] = useState([]);
       const [currentPage, setCurrentPage] = useState(1);
       const RowsPerPage = 5;
      
       const indexOfLastPost = currentPage * RowsPerPage;

       const LastPage= Math.ceil(props.Data.length/5)
       const [ArrayPage, setArrayPage] = useState([]);

       const DisplayPage=(id:number)=>{
        if(LastPage>3){
          if(currentPage==1){
          if(id!=currentPage+1 && id!=currentPage+2 && id!=currentPage ){
              return true
          }
          else return false  
          }else if(currentPage==LastPage){
            if(id!=currentPage-1 && id!=currentPage-2 && id!=currentPage ){
              return true
          }
          else return false  
          }
         else{
          if(id!=currentPage+1 && id!=currentPage-1 && id!=currentPage ){
            return true
             }
           else return false    
         }
        }
       }

       useEffect(() => {
        setBlogPosts(props.Data)
        for(let i=1;i<=LastPage;i++){
            ArrayPage.push(i)
         }
       }, [])
       const Array=ArrayPage.slice(0, LastPage); // this bcs there's a bug the page render twice which make the useeffect execute twice
       const indexOfFirstPost = indexOfLastPost - RowsPerPage;
       const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
       const HandelPagination=(id?:number,Dir?:string)=>{
        id!=0 && setCurrentPage(id) 
         if(Dir!=null){
        if(Dir=='+' && currentPage<LastPage) setCurrentPage(prev=>prev=prev+1)
        else if(Dir=='-' && currentPage!=1) setCurrentPage(prev=>prev=prev-1)
        }
       }
       const DeleteElement = (ID: number) => {
        axios
          .delete(`http://localhost:3000/api/product/${ID}`)
          .then(() => {
            console.log("No probleme");
            location.reload();
          })
          .catch((err) => console.log(err));
      };

    return ( 
        <div  className=" bg-[#EFF2F6] w-full">
          <div  className='flex h-[50px] bg-white px-5 items-center ' >
      <div className={`flex gap-3 font-[700] text-[14px] py-3 items-center text-[#34393D]`}> 
       <Image alt="" src={Img} ></Image > {props.title}s
      </div>
      </div> 
          <div className="grid  py-[30px] justify-center ">  
          <div className="flex justify-start gap-2 mt-5 " >
         
         {props.choices.map(Filterage=>{
            return <span key={Filterage.id} onClick={()=>{Clickhandler(Filterage.id)}} >
                   <FilterElmnt Filter={Filter[Filterage.id]} {...Filterage}></FilterElmnt>
            </span>
         })}
         </div>
         <AnimatePresence>
        {AddClick &&  <motion.div className='w-[calc(100vw-230px)] z-10 h-[calc(100vh-122px)] fixed bg-[#3b373713]  top-[122px] '   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.5, }}
        >
         <AddInvSale Title={props.title}  setClicked={setAddClick} ></AddInvSale>
         </motion.div> }
         </AnimatePresence>
          <div className="bg-white grid justify-center grid-rows-[90px,300px] py-2 pb-4 w-[874px] ">
          <div className="w-full h-[90px]  flex justify-between items-center " >
            <div  className="w-[120px] h-[38px] bg-[#3A78F1] rounded-[5px] cursor-pointer text-white text-[13px] flex justify-center 
            gap-2 font-bold items-center  "  onClick={()=>setAddClick(true)} > 
            <Image src={Plus} alt=""></Image> Add {props.title}   </div>
            <div className=' flex gap-3' >
              <input type="text" placeholder="Search" className="w-[250px] rounded-[5px] p-2 px-4 bg-[#FAFAFA] h-[36px] " />
              <div className="bg-[#f4f5f7] text-[#8f969c] p-2 text-xl rounded-[5px] cursor-pointer  "  onClick={handleSelect} >
              <MdDelete ></MdDelete>
              </div>
                <div  className="w-[90px] h-[35px] text-[#3A78F1] bg-[#ecf2fe] rounded-[5px] cursor-pointer text-[14px] 
                flex justify-center gap-2 font-bold items-center  "  >  Filter 
                 <MdOutlineKeyboardArrowDown  className='text-xl' ></MdOutlineKeyboardArrowDown> </div>
            </div>
           </div>
           <table className=" w-[650px] text-left border-spacing-x-1 ">
            <thead>
            <tr className="text-[#A0AEC0] ">
    <th  className='w-[10%] ' >Id</th>
    <th  className='w-[12%] '>Total</th>
    <th   className='w-[12%] ' >Rest</th>
    <th  className='w-[20%] ' >state </th>
    <th  className='w-[14%] ' ></th>
    <th  className='w-[14%] ' ></th>
            </tr>
            </thead>
          
           <tbody>
            {currentPosts.map(Data=>{
             return <tr key={Data.id}  >
             <td> {Data.id} </td>
            <td>{Data.Total}Dz</td>
            <td>{Data.Rest}Dz</td>
           <td>
            <span className={ `w-[64px] h-[27px] rounded-[5px] p-1 px-3 uppercase font-bold
                        ${Data.Rest==0 ? ' text-[#326E56] bg-[#ECF8F1]  ' : 'bg-[#FFE6EF] text-[#7F193B]'} `} >
            {Data.Rest==0 && 'Paid' }   
             {Data.Rest>0 && 'UnPaid' }
            </span>
            </td>
           <td className='cursor-pointer font-bold' >
            <span className='w-[99px] flex justify-center items-center gap-2 border border-[#E2E8F0] border-solid h-[38px] rounded-[10px] '>
            <Image  src={open} alt='' ></Image> Open
            </span>
         
      </td>
           <td className='cursor-pointer font-bold' >
            <span className='w-[99px] flex justify-center items-center gap-2 border bg-[#3A78F1] border-[#E2E8F0] border-solid 
            h-[38px] rounded-[10px]  text-white'>
            <Image  src={dollar} alt=''></Image> Pay
            </span>
           
           </td>
         </tr>
             })}
           </tbody>
          </table>
          <div className=" flex w-[650px] mt-10 justify-items-center justify-between ">
            <Image src={LeftArrow} alt="" className='cursor-pointer' onClick={()=>HandelPagination(0,'-')} ></Image>
                {Array.map(Page=>{
                return <p key={Page} className={`cursor-pointer ${DisplayPage(Page) && 'hidden'} grid items-center justify-center rounded-[7px]
                    ${Page==currentPage && 'border-2 border-[#3A78F1] text-[#3A78F1] border-solid '} w-[30px] h-[30px]  `} 
                    onClick={()=>HandelPagination(Page)} > {Page} </p>
                 })}
            <Image src={RightArrow} className='cursor-pointer' alt="" onClick={()=>HandelPagination(0,'+')} ></Image>
            </div>
          </div>
          </div>
         
        </div>     
     );
}

export default InvSale;