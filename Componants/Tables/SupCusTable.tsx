import { useEffect, useState} from 'react';
import Plus from '../../public/Plus.svg'
import LeftArrow from '../../public/LeftArrow.svg'
import RightArrow from '../../public/RightArrow.svg'
import { MdDelete,MdOutlineKeyboardArrowDown,MdModeEdit } from "react-icons/md";
import Image, { StaticImageData } from 'next/image'
import FilterElmnt from '../Filter';
import { AnimatePresence, motion } from 'framer';
import Add from '../Add/Add';
import axios from 'axios';
import SectionTitle from '../SectionTitle';
interface props{
  title:string,
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
    const [AddClick, setAddClick] = useState(false)
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
      <SectionTitle  title={props.title}  ></SectionTitle>
          <div className="grid py-[30px] justify-center ">  
          {props.choices && <div className="flex justify-start gap-2 " >
         {props.choices.map(Filterage=>{
            return <span key={Filterage.id} onClick={()=>{Clickhandler(Filterage.id)}} >
                   <FilterElmnt Filter={Filter[Filterage.id]} {...Filterage}></FilterElmnt>
            </span>
         })}
         </div>}
         <AnimatePresence>
        {AddClick &&  <motion.div className='w-[calc(100vw-230px)] z-10 h-[calc(100vh-122px)] fixed bg-[#3b373713]  top-[122px] '   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, }} 
        transition={{duration:.5, }}
        >
         <Add Title={props.title}  setClicked={setAddClick} ></Add>
         </motion.div> }
         </AnimatePresence>
          <div className="bg-white grid  justify-items-center justify-center grid-rows-[90px,200px] py-1 pb-4 w-[900px] ">
          <div className="w-full h-[90px] flex justify-between items-center " >
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
           <table className=" w-[750px] text-left ">
            <thead>
            <tr className="text-[#A0AEC0] ">
              <th className='w-[4%] ' ></th>
    <th className='w-[10%] '>Id</th>
    <th className='w-[15%] '  >Name</th>
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
           <MdModeEdit  className='cursor-pointer  text-2xl' ></MdModeEdit>
          </td>
           <td>
           <MdDelete 
            id={Data.codeF}
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
          <div className="flex w-[650px] mt-10 justify-items-center justify-between ">
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

export default SupCus;