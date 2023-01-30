import { Dispatch, SetStateAction, useEffect, useState} from 'react';
import { MdDelete } from "react-icons/md";
import {IoMdEye } from "react-icons/io";
import Image from 'next/image'
import FilterElmnt from '../Filter';
import { AnimatePresence, motion } from 'framer';
import Add from '../Add/Add';
import axios from 'axios';
import SectionTitle from '../SectionTitle';
import Upper from './UpperTable';
import Pagination from './Pagination';
import Edit from '../Edit/EditCS';
import Link from 'next/link';

interface props{
  title:string,
  setAddClick: Dispatch<SetStateAction<boolean>>,
  choices?: { id:number, Nbr: number,Title: string}[],
  Data:{
    codeF?: number;   codeC?:number;
    nomF?: string;    nomC?:string;
    prenomF?: string;    prenomC?:string;
    sold?: number;    teleC?:string;
    teleF?: string;   credit?:number;
    pointF?: number;    pointC:number;
}[]
}
const SupCus:React.FC<props> = (props) => {
  // const [EditClick, setEditClick] = useState(false)
  // const [EditId, setEditId] = useState()




    const [select, setselect] = useState(false)
    const [selectData, setselectData] = useState<number[]>([]);
    const handleSelect = () => {
      if(select==true){
     for(let i=0;i<=selectData.length;i++) DeleteElement(selectData[i]);
      }
      setselect((prev) => (prev = !prev));
    };
   const AddSelected=(id:number)=>{
    if(selectData.includes(id)){
      const index = selectData.indexOf(id);
      selectData.splice(index, 1);
    }
   else selectData.push(id);
    console.log(selectData)
   }    
    const DeleteElement = (ID: number) => {
   if(props.title==='Supplier'){
    axios
    .delete(`http://localhost:3000/api/supplier/${ID}`)
    .then(() => {
      console.log("No probleme");
      location.reload();
    })
    .catch((err) => console.log(err));
   }
   else {
    axios
    .delete(`http://localhost:3000/api/customer/${ID}`)
    .then(() => {
      console.log("No probleme");
      location.reload();
    })
    .catch((err) => console.log(err));
   }
    };
    const [Filter, setFilter] =useState([true,false,false])
    let arr=[...Filter] 
    const Clickhandler=(id:number)=>{
      arr=[false,false,false]
      arr[id]=true
      setFilter(arr);
      }
 
       const [blogPosts, setBlogPosts] = useState([]);
       const [currentPage, setCurrentPage] = useState(1);
       const RowsPerPage = 4;
       const indexOfLastPost = currentPage * RowsPerPage;
       const LastPage= Math.ceil(props.Data.length/4)
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


    return ( 
        <div  className=" bg-[#EFF2F6] h-[calc(100vh-75px)] w-full">
      <SectionTitle type={props.title}  title={props.title}  ></SectionTitle>
          <div className="grid py-[30px] justify-center ">  
          {props.choices && <div className="flex justify-start gap-2 " >
         {props.choices.map(Filterage=>{
            return <span key={Filterage.id} onClick={()=>{Clickhandler(Filterage.id)}} >
                   <FilterElmnt Filter={Filter[Filterage.id]} {...Filterage}></FilterElmnt>
            </span>
         })}
         </div>}
          <div className="bg-white grid  justify-items-center justify-center grid-rows-[90px,200px] py-1 pb-4 w-[900px] ">
          <Upper  handleSelect={handleSelect} setAddClick={props.setAddClick} title={props.title} ></Upper>
           <table className=" w-[750px] text-left ">
            <thead>
            <tr className="text-[#A0AEC0] ">
              <th className='w-[4%] ' ></th>
    <th className='w-[5%] '>Id</th>
    <th className='w-[25%] '  >Name</th>
    <th className='w-[15%] '   >{props.title=='Customer' && 'Credit' }    {props.title=='Supplier' && 'Sold' }</th>
    <th  className='w-[24%] ' >Phone Number</th>
    <th className='w-[20%] '>Points </th>
    <th className='w-[8%] ' ></th>
    <th className='w-[8%] ' ></th>
            </tr>
            </thead>
          
           <tbody>
            {currentPosts.map(Data=>{
             return <tr key={Math.random()}  > 
             <td   className={` ${!select && 'invisible'} `}>  
            <input type="checkbox" name=""  onClick={()=>{   AddSelected(Data.codeF || Data.codeC) }} /></td>
             <td>  {Data.codeF} {Data.codeC} </td>
             <td> {Data.nomF}  {Data.prenomF} {Data.nomC}  {Data.prenomC} </td>
            <td>{Data.sold} {Data.credit} Dz</td>
            <td>{Data.teleF}  {Data.teleC} </td>
           <td>{Data.pointF} {Data.pointC} </td>
           <td>
           <Link href={  Data.codeC ? `http://localhost:3000/Customers/${Data.codeC}` :`http://localhost:3000/Suppliers/${Data.codeF}` } 
           className='cursor-pointer  text-2xl'  >
           <IoMdEye ></IoMdEye>
           </Link>
           {/* <MdModeEdit  className='cursor-pointer  text-2xl' 
           onClick={() => {
            let id= Data.codeF || Data.codeC
            setEditId(id);
            setEditClick(true)
          }}
           
           ></MdModeEdit> */}
          </td>
           <td>
           <MdDelete 
            onClick={() => {
              let id= Data.codeF || Data.codeC
              console.log(id);
              DeleteElement(id);
            }}  className='cursor-pointer  text-2xl' ></MdDelete>
           </td>
         </tr>
             })}
           </tbody>

          </table>

          <Pagination Array={Array}  DisplayPage={DisplayPage} HandelPagination={HandelPagination} currentPage={currentPage}  ></Pagination>
          </div>
          </div>
       {/* <AnimatePresence>
        {EditClick &&  <motion.div className='w-[calc(100vw-230px)] z-10 h-[calc(100vh-122px)] fixed bg-[#3b373713] left-[230px]  top-[122px] '   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.5, }}>
          <Edit Title={props.title}  setClicked={setEditClick} ID={EditId} ></Edit>
         </motion.div> }
           </AnimatePresence> */}
        </div>     
     );
}

export default SupCus;