import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import open from '../../public/open.svg'
import dollar from '../../public/dollar.svg'
import Image from 'next/image'
import FilterElmnt from '../Filter';
import axios from 'axios';
import SectionTitle from '../SectionTitle';
import Link from 'next/link';
import Upper from './UpperTable';
import Pagination from './Pagination';
import Plus from '../../public/Plus.svg'
import { MdDelete,MdOutlineKeyboardArrowDown } from "react-icons/md";

interface props{
  title:string,
  setAddClick: (value: SetStateAction<boolean>) => void,
  choices?: { id:number, Nbr: number,Title: string}[],
  Data:{
    idBon: number;
    DateB:Date;
    supplier:{
        codeF:number,
        nomF:String,
        sold:number
    };
}[]
}

const Bc:React.FC<props> = (props) => {
    const [Filter, setFilter] =useState([true,false,false])
    const [select, setselect] = useState(false)
    const [AddClick, setAddClick] = useState(false)
    const handleSelect=()=>{
      setselect(prev=>prev=!prev)
    }
  

    let arr=[...Filter] 
    const Clickhandler=(id:number)=>{
      arr=[false,false,false,false,false]
      arr[id]=true
      setFilter(arr);
      }
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
      //  const DeleteElement = (ID: number) => {
      //   axios
      //     .delete(`http://localhost:3000/api/product/${ID}`)
      //     .then(() => {
      //       console.log("No probleme");
      //       location.reload();
      //     })
      //     .catch((err) => console.log(err));
      // };

    return ( 
        <div  className=" bg-[#EFF2F6] text-sm w-full">
      <SectionTitle type={props.title}  title={props.title}  ></SectionTitle>
          <div className="grid py-[30px] justify-center ">  
          <div className="flex justify-start gap-2 mt-5 " >
         
         {props.choices.map(Filterage=>{
            return <span key={Filterage.id} onClick={()=>{Clickhandler(Filterage.id)}} >
                   <FilterElmnt Filter={Filter[Filterage.id]} {...Filterage}></FilterElmnt>
            </span>
         })}
         </div>

          <div className="bg-white grid justify-center grid-rows-[90px,200px] py-1 pb-4 w-[874px] ">
            <Upper  handleSelect={handleSelect} setAddClick={props.setAddClick} title={props.title} ></Upper>
          
           <table className=" w-[750px] text-left border-spacing-x-1 ">
            <thead>
            <tr className="text-[#A0AEC0] ">
    <th  className='w-[5%] ' >idBon</th>
    <th  className='w-[24%] ' >DateB</th>
    <th  className='w-[12%] '>Vendor id</th>
    <th   className='w-[12%] ' >Vendor</th>
    <th  className='w-[18%] ' >state </th>
    <th  className='w-[14%] ' ></th>
    <th  className='w-[14%] ' ></th>
            </tr>
            </thead>
          
           <tbody>
            {currentPosts.map(Data=>{ 
             return <tr key={Math.random()}  > 
             <td> {Data.idBon} </td>
             <td> {new Date(Data.DateB).getFullYear()+'/'+(new Date(Data.DateB).getMonth()+1)+'/'+new Date(Data.DateB).getDate() } </td>
            <td>{Data.supplier.codeF}</td>
            <td>{Data.supplier.nomF}</td>
           <td>
            <span className={ `w-[64px] h-[27px] rounded-[5px] p-1 px-3 uppercase font-bold
                        ${Data.sold==0 ? ' text-[#326E56] bg-[#ECF8F1]  ' : 'bg-[#FFE6EF] text-[#7F193B]'} `} >
            {Data.sold==0 && 'Received' } 
             {Data.sold>0 && 'Not Received' }
            </span>
            </td>
           <td className='cursor-pointer font-bold' >
           
            <Link href={`http://localhost:3000/PurchaseOrder/${Data.idBon}`}
            className='w-[99px] flex justify-center items-center gap-2 border border-[#E2E8F0] border-solid h-[38px] rounded-[10px] '>
            <Image  src={open} alt='' ></Image> Open
            </Link>
         
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
          <Pagination Array={Array}  DisplayPage={DisplayPage} HandelPagination={HandelPagination} currentPage={currentPage}  ></Pagination>
          </div>
          </div>
         
        </div>     
     );
}

export default Bc;