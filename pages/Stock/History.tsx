import { useEffect, useState} from 'react';
import LeftArrow from '../../public/LeftArrow.svg'
import RightArrow from '../../public/RightArrow.svg'
import { MdDelete,MdOutlineKeyboardArrowDown,MdModeEdit } from "react-icons/md";
import Image, { StaticImageData } from 'next/image'
import FilterElmnt from '../../Componants/Filter';
import axios from 'axios';
import SectionTitle from '../../Componants/SectionTitle';


const History = () => {

    const [Filter, setFilter] =useState([true,false])
    let arr=[...Filter] 
    const Clickhandler=(id:number)=>{
      arr=[false,false]
      arr[id]=true
      setFilter(arr);
      }
      
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
     if(Filter[0]){
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

        const [Data, setData] = useState([])
         const [blogPosts, setBlogPosts] = useState([]);
         const [currentPage, setCurrentPage] = useState(1);
         const RowsPerPage = 4;
         const indexOfLastPost = currentPage * RowsPerPage;
         const LastPage= Math.ceil(Data.length/4)
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
          let  url= Filter[0] ? 'http://localhost:3000/api/sortieStock' : 'http://localhost:3000/api/sortieStock'
          setBlogPosts(Data)
          for(let i=1;i<=LastPage;i++){
              ArrayPage.push(i)
           }
           axios.get(url)
           .then(res => {
            setData(res.data.data)
            console.log(Data);
           })
         }, [Filter])
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
  
    return(
    <div  className=" bg-[#EFF2F6] h-[calc(100vh-75px)] w-full">
    <SectionTitle  title='History'  ></SectionTitle>
        <div className="grid py-[30px] justify-center ">  
     <div className="flex justify-start gap-2 " >
       <span onClick={()=>{Clickhandler(0)}} >
        <FilterElmnt Filter={Filter[0]} Title="EntrerStock" Nbr={10} ></FilterElmnt>
          </span>
          <span onClick={()=>{Clickhandler(1)}} >
        <FilterElmnt Filter={Filter[1]} Title="SotieStock" Nbr={10}></FilterElmnt>
          </span>
       </div>
   
        <div className="bg-white grid  justify-items-center justify-center grid-rows-[90px,200px] py-2 pb-4 w-[900px] ">
         <table className=" w-[750px] text-left ">
          <thead>
          <tr className="text-[#A0AEC0] ">
            <th className='w-[4%] ' ></th>
  <th className='w-[10%] '>Date</th>
  <th className='w-[15%] '   >Img</th>
  <th className='w-[15%] '  >Product</th>
  <th className='w-[15%] '   >Qte</th>
  <th  className='w-[24%] ' > {Filter[0] ? 'PrixVt' : 'motif' } </th>
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
 
export default History;